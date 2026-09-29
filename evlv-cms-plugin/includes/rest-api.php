<?php
if (!defined('ABSPATH')) exit;

/**
 * Headless REST API consumed by the Next.js frontend. Namespace: altr/v1.
 * Read endpoints are public (no auth) since this only ever exposes published,
 * non-sensitive storefront content — same data model as a public WooCommerce
 * store REST feed.
 *
 * Every response is cached via WP transients (5 min TTL, cleared on post
 * save/delete) so repeated Next.js revalidation hits don't rebuild from DB.
 * HTTP Cache-Control headers let a Nginx proxy or CDN cache the response
 * for the same window, so the WP process isn't touched at all on cache hits.
 */

// Invalidate all altr/v1 endpoint transients whenever any altr_* post is
// saved or deleted — keeps the cache consistent without needing per-slug logic.
add_action('save_post', function ($post_id) {
    if (in_array(get_post_type($post_id), ['altr_product', 'altr_coa', 'altr_content', 'altr_popup'], true)) {
        altr_cms_flush_rest_cache();
    }
});
add_action('before_delete_post', function ($post_id) {
    if (in_array(get_post_type($post_id), ['altr_product', 'altr_coa', 'altr_content', 'altr_popup'], true)) {
        altr_cms_flush_rest_cache();
    }
});

function altr_cms_flush_rest_cache() {
    delete_transient('altr_rest_products_all');
    delete_transient('altr_rest_coas_all');
    delete_transient('altr_rest_content_all');
    delete_transient('altr_rest_popups_active');
    // Per-slug product transients are keyed separately; clear them by
    // iterating the stored index (lightweight — just a list of slugs).
    $slugs = get_transient('altr_rest_product_slugs') ?: [];
    foreach ($slugs as $slug) {
        delete_transient('altr_rest_product_' . sanitize_key($slug));
    }
    delete_transient('altr_rest_product_slugs');
    // Per-page content transients.
    $pages = get_transient('altr_rest_content_pages') ?: [];
    foreach ($pages as $page) {
        delete_transient('altr_rest_content_' . sanitize_key($page));
    }
    delete_transient('altr_rest_content_pages');
}

/** Shared 5-minute TTL for all cached REST responses. */
define('ALTR_REST_TTL', 5 * MINUTE_IN_SECONDS);

/** Attach Cache-Control so Nginx / CDN can cache public GET responses. */
function altr_rest_cache_headers(WP_REST_Response $response, int $max_age = 300): WP_REST_Response {
    $response->header('Cache-Control', "public, s-maxage={$max_age}, stale-while-revalidate=60");
    return $response;
}

add_action('rest_api_init', function () {

    register_rest_route('altr/v1', '/products', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $cached = get_transient('altr_rest_products_all');
            if ($cached !== false) {
                return altr_rest_cache_headers(new WP_REST_Response($cached));
            }
            $posts = get_posts([
                'post_type'   => 'altr_product',
                'numberposts' => -1,
                'post_status' => 'publish',
                'update_post_meta_cache' => true,
            ]);
            $data = array_map(fn($p) => altr_cms_get_product_data($p->ID), $posts);
            set_transient('altr_rest_products_all', $data, ALTR_REST_TTL);
            return altr_rest_cache_headers(new WP_REST_Response($data));
        },
    ]);

    register_rest_route('altr/v1', '/products/(?P<slug>[a-zA-Z0-9-]+)', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function ($req) {
            $slug = sanitize_key($req['slug']);
            $tkey = 'altr_rest_product_' . $slug;
            $cached = get_transient($tkey);
            if ($cached !== false) {
                return altr_rest_cache_headers(new WP_REST_Response($cached));
            }
            $posts = get_posts([
                'post_type'   => 'altr_product',
                'post_status' => 'publish',
                'numberposts' => 1,
                'meta_key'    => '_altr_slug',
                'meta_value'  => $slug,
                'update_post_meta_cache' => true,
            ]);
            if (empty($posts)) return new WP_Error('not_found', 'Product not found', ['status' => 404]);
            $data = altr_cms_get_product_data($posts[0]->ID);
            set_transient($tkey, $data, ALTR_REST_TTL);
            // Track which per-slug transients exist so flush can clear them.
            $known = get_transient('altr_rest_product_slugs') ?: [];
            if (!in_array($slug, $known, true)) {
                $known[] = $slug;
                set_transient('altr_rest_product_slugs', $known, 0);
            }
            return altr_rest_cache_headers(new WP_REST_Response($data));
        },
    ]);

    register_rest_route('altr/v1', '/coas', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $cached = get_transient('altr_rest_coas_all');
            if ($cached !== false) {
                return altr_rest_cache_headers(new WP_REST_Response($cached));
            }
            $posts = get_posts([
                'post_type'   => 'altr_coa',
                'numberposts' => -1,
                'post_status' => 'publish',
                'update_post_meta_cache' => true,
            ]);
            $data = array_map(fn($p) => altr_cms_get_coa_data($p->ID), $posts);
            set_transient('altr_rest_coas_all', $data, ALTR_REST_TTL);
            return altr_rest_cache_headers(new WP_REST_Response($data));
        },
    ]);

    register_rest_route('altr/v1', '/content/(?P<page>[a-zA-Z0-9-]+)', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function ($req) {
            $page = sanitize_key($req['page']);
            $tkey = 'altr_rest_content_' . $page;
            $cached = get_transient($tkey);
            if ($cached !== false) {
                return altr_rest_cache_headers(new WP_REST_Response($cached));
            }
            $data = altr_cms_get_content_page($page);
            if (!$data) return new WP_Error('not_found', 'Page content not found', ['status' => 404]);
            set_transient($tkey, $data, ALTR_REST_TTL);
            $known = get_transient('altr_rest_content_pages') ?: [];
            if (!in_array($page, $known, true)) {
                $known[] = $page;
                set_transient('altr_rest_content_pages', $known, 0);
            }
            return altr_rest_cache_headers(new WP_REST_Response($data));
        },
    ]);

    register_rest_route('altr/v1', '/content', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $cached = get_transient('altr_rest_content_all');
            if ($cached !== false) {
                return altr_rest_cache_headers(new WP_REST_Response($cached));
            }
            $out = [];
            foreach (array_keys(altr_cms_content_schema()) as $key) {
                $out[$key] = altr_cms_get_content_page($key);
            }
            set_transient('altr_rest_content_all', $out, ALTR_REST_TTL);
            return altr_rest_cache_headers(new WP_REST_Response($out));
        },
    ]);

    register_rest_route('altr/v1', '/popups/active', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $cached = get_transient('altr_rest_popups_active');
            if ($cached !== false) {
                return altr_rest_cache_headers(new WP_REST_Response($cached));
            }
            $posts = get_posts([
                'post_type'   => 'altr_popup',
                'numberposts' => -1,
                'post_status' => 'publish',
                'update_post_meta_cache' => true,
            ]);
            $active = array_values(array_filter(
                array_map(fn($p) => altr_cms_get_popup_data($p->ID), $posts),
                fn($p) => $p['active'] === '1'
            ));
            set_transient('altr_rest_popups_active', $active, ALTR_REST_TTL);
            return altr_rest_cache_headers(new WP_REST_Response($active));
        },
    ]);
});
