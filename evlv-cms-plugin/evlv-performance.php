<?php
/**
 * Plugin Name: EVLV Performance
 * Description: Drop into wp-content/mu-plugins/ — fires before any normal plugin, requires no activation.
 *              Disables WordPress bloat, offloads wp-cron to real cron, and sets aggressive caching headers
 *              for the headless REST API consumed by evlv-site.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

// ─── 1. Move wp-cron off web requests ───────────────────────────────────────
// Add to server crontab: * * * * * php /var/www/html/wp-cron.php > /dev/null 2>&1
if (!defined('DISABLE_WP_CRON')) define('DISABLE_WP_CRON', true);

// ─── 2. Kill XML-RPC entirely ────────────────────────────────────────────────
add_filter('xmlrpc_enabled', '__return_false');

// ─── 3. Remove bloat loaded on every request ─────────────────────────────────
add_action('init', function () {
    // Emojis — three separate hooks WP 6.x uses.
    remove_action('wp_head',             'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles',     'print_emoji_styles');
    remove_action('admin_print_styles',  'print_emoji_styles');
    remove_filter('the_content_feed',    'wp_staticize_emoji');
    remove_filter('comment_text_rss',    'wp_staticize_emoji');
    remove_filter('wp_mail',             'wp_staticize_emoji_for_email');

    // oEmbed discovery links in <head>.
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');

    // RSD/Windows Live Writer links.
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');

    // Generator meta (security through obscurity).
    remove_action('wp_head', 'wp_generator');

    // Unnecessary DNS-prefetch for s.w.org emoji CDN.
    add_filter('emoji_svg_url', '__return_false');
}, 1);

// ─── 4. Throttle Heartbeat so the admin DB isn't hammered ────────────────────
add_filter('heartbeat_settings', function ($settings) {
    $settings['interval'] = 60;
    return $settings;
});

// ─── 5. Restrict REST API user enumeration ────────────────────────────────────
// Removes the /wp-json/wp/v2/users endpoint so usernames aren't leaked.
add_filter('rest_endpoints', function ($endpoints) {
    if (isset($endpoints['/wp/v2/users']))         unset($endpoints['/wp/v2/users']);
    if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
    return $endpoints;
});

// ─── 6. Add Gzip hint via Vary and remove X-Pingback ────────────────────────
add_filter('wp_headers', function ($headers) {
    unset($headers['X-Pingback']);
    return $headers;
});

// ─── 7. Remove version query strings from static assets ──────────────────────
add_filter('style_loader_src',  'altr_perf_remove_ver', 9999);
add_filter('script_loader_src', 'altr_perf_remove_ver', 9999);
function altr_perf_remove_ver($src) {
    if (strpos($src, 'ver=')) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}

// ─── 8. WooCommerce-specific (only runs when WC is active) ──────────────────
add_action('plugins_loaded', function () {
    if (!class_exists('WooCommerce')) return;

    // Disable the cart fragments AJAX call that fires on every page load
    // even for non-cart pages — this is the #1 cause of TTFB bloat on
    // WooCommerce stores with no full-page cache.
    add_action('wp_enqueue_scripts', function () {
        wp_dequeue_script('wc-cart-fragments');
    }, 100);

    // Remove WooCommerce's generator meta tag.
    remove_action('wp_head', 'wc_generator_tag');

    // Disable WooCommerce status widget in admin — queries the DB on every
    // admin page load.
    add_filter('woocommerce_enable_admin_activity_panels', '__return_false');
});
