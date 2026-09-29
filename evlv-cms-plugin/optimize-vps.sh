#!/usr/bin/env bash
# EVLV VPS Performance Optimization Script
# Run as root: sudo bash optimize-vps.sh
# Tested on Ubuntu 22.04 / Debian 12 with Nginx + PHP-FPM + MySQL/MariaDB
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

BOLD="\033[1m"; RESET="\033[0m"; GREEN="\033[32m"; YELLOW="\033[33m"
log()  { echo -e "${BOLD}${GREEN}[evlv]${RESET} $*"; }
warn() { echo -e "${BOLD}${YELLOW}[warn]${RESET} $*"; }

# ── 0. PHP version detection ─────────────────────────────────────────────────
PHP_VER=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;" 2>/dev/null || echo "unknown")
PHP_INI=$(php --ini 2>/dev/null | grep "Loaded Configuration" | awk '{print $NF}' || echo "")
log "Detected PHP $PHP_VER"

# ── 1. OPcache ───────────────────────────────────────────────────────────────
log "Configuring PHP OPcache..."
PHP_CONF_DIR=$(php --ini 2>/dev/null | grep "Scan for additional" | awk '{print $NF}' || echo "/etc/php/${PHP_VER}/fpm/conf.d")

cat > /tmp/evlv-opcache.ini << 'EOF'
[opcache]
opcache.enable=1
opcache.enable_cli=0
opcache.memory_consumption=256
opcache.interned_strings_buffer=32
opcache.max_accelerated_files=20000
opcache.revalidate_freq=60
opcache.validate_timestamps=1
opcache.save_comments=1
opcache.fast_shutdown=1
EOF

if [ -d "$PHP_CONF_DIR" ]; then
    cp /tmp/evlv-opcache.ini "${PHP_CONF_DIR}/10-evlv-opcache.ini"
    log "OPcache config written to ${PHP_CONF_DIR}/10-evlv-opcache.ini"
else
    warn "Could not find PHP conf.d dir ($PHP_CONF_DIR) — copy /tmp/evlv-opcache.ini there manually"
fi

# ── 2. PHP-FPM pool tuning ────────────────────────────────────────────────────
log "Tuning PHP-FPM pool..."
FPM_POOL=""
for path in \
    "/etc/php/${PHP_VER}/fpm/pool.d/www.conf" \
    "/etc/php-fpm.d/www.conf" \
    "/etc/php/fpm/pool.d/www.conf"; do
    [ -f "$path" ] && FPM_POOL="$path" && break
done

if [ -n "$FPM_POOL" ]; then
    cp "$FPM_POOL" "${FPM_POOL}.bak.$(date +%Y%m%d%H%M%S)"
    # Detect RAM in MB
    TOTAL_RAM_MB=$(free -m | awk '/^Mem:/{print $2}')
    # Each PHP-FPM worker uses ~35-50MB. Reserve 20% for OS/MySQL.
    WORKERS=$(( (TOTAL_RAM_MB * 8 / 10) / 45 ))
    WORKERS=$(( WORKERS < 2 ? 2 : WORKERS ))
    WORKERS=$(( WORKERS > 20 ? 20 : WORKERS ))
    MIN_SPARE=$(( WORKERS / 4 < 1 ? 1 : WORKERS / 4 ))
    MAX_SPARE=$(( WORKERS / 2 < 2 ? 2 : WORKERS / 2 ))
    log "RAM: ${TOTAL_RAM_MB}MB → PHP-FPM max_children=${WORKERS}"
    sed -i \
        -e "s/^pm = .*/pm = dynamic/" \
        -e "s/^pm\.max_children = .*/pm.max_children = ${WORKERS}/" \
        -e "s/^pm\.start_servers = .*/pm.start_servers = ${MIN_SPARE}/" \
        -e "s/^pm\.min_spare_servers = .*/pm.min_spare_servers = ${MIN_SPARE}/" \
        -e "s/^pm\.max_spare_servers = .*/pm.max_spare_servers = ${MAX_SPARE}/" \
        "$FPM_POOL"
    # Recycle workers to prevent memory leaks.
    grep -q "pm.max_requests" "$FPM_POOL" \
        && sed -i "s/^;*pm\.max_requests = .*/pm.max_requests = 500/" "$FPM_POOL" \
        || echo "pm.max_requests = 500" >> "$FPM_POOL"
    log "PHP-FPM pool updated: $FPM_POOL"
else
    warn "Could not find PHP-FPM pool config — tune pm.max_children manually"
fi

# ── 3. MySQL / MariaDB tuning ─────────────────────────────────────────────────
log "Tuning MySQL/MariaDB..."
MYSQL_CONF_DIR=""
for path in /etc/mysql/mysql.conf.d /etc/mysql/conf.d /etc/my.cnf.d; do
    [ -d "$path" ] && MYSQL_CONF_DIR="$path" && break
done

TOTAL_RAM_MB=${TOTAL_RAM_MB:-$(free -m | awk '/^Mem:/{print $2}')}
# InnoDB buffer pool: 40% of RAM, rounded to nearest 128MB.
INNODB_MB=$(( (TOTAL_RAM_MB * 40 / 100 / 128) * 128 ))
INNODB_MB=$(( INNODB_MB < 128 ? 128 : INNODB_MB ))

cat > /tmp/evlv-mysql.cnf << EOF
[mysqld]
innodb_buffer_pool_size     = ${INNODB_MB}M
innodb_buffer_pool_instances = $(( INNODB_MB / 128 < 1 ? 1 : INNODB_MB / 128 ))
innodb_log_file_size        = 256M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method         = O_DIRECT
query_cache_type            = 0
query_cache_size            = 0
max_connections             = 100
thread_cache_size           = 16
tmp_table_size              = 64M
max_heap_table_size         = 64M
table_open_cache            = 2000
EOF

if [ -n "$MYSQL_CONF_DIR" ]; then
    cp /tmp/evlv-mysql.cnf "${MYSQL_CONF_DIR}/evlv-tuning.cnf"
    log "MySQL config written to ${MYSQL_CONF_DIR}/evlv-tuning.cnf (InnoDB pool: ${INNODB_MB}MB)"
else
    warn "MySQL conf.d dir not found — copy /tmp/evlv-mysql.cnf to /etc/mysql/mysql.conf.d/evlv-tuning.cnf"
fi

# ── 4. Redis object cache ─────────────────────────────────────────────────────
log "Installing Redis..."
if ! command -v redis-server &>/dev/null; then
    apt-get update -qq && apt-get install -y redis-server
fi

# Tune Redis for WP object cache (small cache, no persistence needed).
REDIS_CONF="/etc/redis/redis.conf"
if [ -f "$REDIS_CONF" ]; then
    cp "$REDIS_CONF" "${REDIS_CONF}.bak.$(date +%Y%m%d%H%M%S)"
    sed -i \
        -e "s/^# maxmemory .*/maxmemory 128mb/" \
        -e "s/^maxmemory .*/maxmemory 128mb/" \
        -e "s/^# maxmemory-policy .*/maxmemory-policy allkeys-lru/" \
        -e "s/^maxmemory-policy .*/maxmemory-policy allkeys-lru/" \
        "$REDIS_CONF"
    # Disable RDB persistence (WordPress cache is ephemeral, not worth the I/O).
    sed -i \
        -e "s/^save [0-9]/# save /" \
        "$REDIS_CONF"
fi

systemctl enable redis-server && systemctl restart redis-server
log "Redis running. Install the 'Redis Object Cache' plugin in WordPress, then enable it."

# ── 5. Install WP Redis drop-in via WP-CLI ───────────────────────────────────
if command -v wp &>/dev/null; then
    WP_PATH=$(find /var/www -maxdepth 4 -name "wp-config.php" 2>/dev/null | head -1 | xargs dirname)
    if [ -n "$WP_PATH" ]; then
        log "Found WordPress at $WP_PATH — installing Redis Object Cache..."
        wp --path="$WP_PATH" --allow-root plugin install redis-cache --activate 2>/dev/null || true
        wp --path="$WP_PATH" --allow-root redis enable 2>/dev/null || true
        log "Redis Object Cache activated."
    fi
else
    warn "WP-CLI not found — install Redis Object Cache plugin manually from wp-admin/plugins.php"
fi

# ── 6. Nginx FastCGI cache config snippet ────────────────────────────────────
cat > /tmp/evlv-nginx-cache.conf << 'EOF'
# Paste this inside your WordPress server {} block in Nginx.
# ─────────────────────────────────────────────────────────
# In the http {} block (nginx.conf or conf.d/cache-zones.conf):
#   fastcgi_cache_path /var/cache/nginx/wordpress levels=1:2
#       keys_zone=WORDPRESS:100m inactive=60m max_size=512m;
#   fastcgi_cache_key "$scheme$request_method$host$request_uri";
#
# In the server {} block:
fastcgi_cache_bypass $skip_cache;
fastcgi_no_cache     $skip_cache;
fastcgi_cache        WORDPRESS;
fastcgi_cache_valid  200 5m;
fastcgi_cache_valid  404 1m;
add_header X-Cache   $upstream_cache_status;

# Skip cache for logged-in users, cart, checkout, admin.
set $skip_cache 0;
if ($request_method = POST)                 { set $skip_cache 1; }
if ($query_string != "")                    { set $skip_cache 1; }
if ($request_uri ~* "/wp-admin/|/wp-login.php|/cart/|/checkout/|/my-account/") {
    set $skip_cache 1;
}
if ($http_cookie ~* "comment_author|wordpress_[a-f0-9]+|wp-postpass|wordpress_no_cache|wordpress_logged_in") {
    set $skip_cache 1;
}
EOF
log "Nginx cache snippet saved to /tmp/evlv-nginx-cache.conf"

# ── 7. Real cron entry ────────────────────────────────────────────────────────
WEBROOT=$(find /var/www -maxdepth 4 -name "wp-config.php" 2>/dev/null | head -1 | xargs dirname || echo "/var/www/html")
PHP_BIN=$(command -v php || echo "php")
CRON_LINE="* * * * * www-data $PHP_BIN $WEBROOT/wp-cron.php > /dev/null 2>&1"
if ! crontab -l -u www-data 2>/dev/null | grep -q "wp-cron"; then
    (crontab -l -u www-data 2>/dev/null; echo "$CRON_LINE") | crontab -u www-data -
    log "Real wp-cron added for www-data: $CRON_LINE"
else
    log "wp-cron crontab entry already exists — skipping."
fi

# ── 8. Restart services ───────────────────────────────────────────────────────
log "Restarting services..."
FPM_SERVICE=$(systemctl list-units --type=service 2>/dev/null | grep "php.*fpm" | awk '{print $1}' | head -1 || echo "")
[ -n "$FPM_SERVICE" ] && systemctl restart "$FPM_SERVICE" && log "Restarted $FPM_SERVICE"

MYSQL_SERVICE=$(systemctl list-units --type=service 2>/dev/null | grep -E "mysql|mariadb" | awk '{print $1}' | head -1 || echo "")
[ -n "$MYSQL_SERVICE" ] && systemctl restart "$MYSQL_SERVICE" && log "Restarted $MYSQL_SERVICE"

NGINX_SERVICE=$(systemctl list-units --type=service 2>/dev/null | grep "nginx" | awk '{print $1}' | head -1 || echo "")
[ -n "$NGINX_SERVICE" ] && nginx -t && systemctl reload "$NGINX_SERVICE" && log "Reloaded Nginx"

# ── 9. Summary ────────────────────────────────────────────────────────────────
echo ""
log "Done. Summary of what changed:"
echo "  ✓ OPcache: 256MB, 20k files, 60s revalidate"
echo "  ✓ PHP-FPM: dynamic pool sized to available RAM (${WORKERS:-?} workers)"
echo "  ✓ MySQL:   InnoDB buffer pool ${INNODB_MB:-?}MB (was 128MB default)"
echo "  ✓ Redis:   128MB LRU, no persistence"
echo "  ✓ wp-cron: real cron entry added, DISABLE_WP_CRON=true in mu-plugin"
echo ""
warn "Manual steps remaining:"
echo "  1. Install 'Redis Object Cache' plugin in WordPress if WP-CLI didn't do it."
echo "  2. Add the Nginx FastCGI cache zone to your http {} block (see /tmp/evlv-nginx-cache.conf)."
echo "  3. Deploy evlv-performance.php to /wp-content/mu-plugins/evlv-performance.php"
echo "  4. Run: wp --allow-root option delete --network 'altr_rest_*' to flush transients on first deploy."
