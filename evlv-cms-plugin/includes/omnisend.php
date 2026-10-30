<?php
if (!defined('ABSPATH')) exit;

function altr_omnisend_api_key(): string {
    if (defined('OMNISEND_API_KEY') && OMNISEND_API_KEY) {
        return OMNISEND_API_KEY;
    }
    return (string) get_option('altr_omnisend_api_key', '');
}

function altr_omnisend_configured(): bool {
    return altr_omnisend_api_key() !== '';
}

function altr_omnisend_categories(string $cms_category, string $slug, string $override): array {
    if ($override !== '') return [$override];

    $cms_map = [
        'growth-hormone' => 'Growth',
    ];
    if (isset($cms_map[$cms_category])) return [$cms_map[$cms_category]];

    $slug_patterns = [
        'Metabolic'            => '/semaglutide|tirzepatide|5-amino-1mq|mots-c|aod-9604/i',
        'Recovery'             => '/bpc-157|tb-500|kpv|wolverine|glow-blend/i',
        'Growth'               => '/cjc|ipamorelin|tesamorelin|ghrp|sermorelin|growth-hormone/i',
        'Longevity'            => '/nad|epithalon|ghk-cu|ss-31|longevity/i',
        'Hormonal & Cognitive' => '/pt-141|semax|selank|testosterone/i',
    ];
    foreach ($slug_patterns as $category => $pattern) {
        if (preg_match($pattern, $slug)) return [$category];
    }
    return [];
}

function altr_omnisend_sync_product(int $post_id): void {
    if (!altr_omnisend_configured()) return;

    $data = altr_cms_get_product_data($post_id);
    $slug = $data['slug'] ?? '';
    if (empty($slug)) return;

    $store_url  = rtrim((string) get_option('altr_store_url', 'https://evlvpeptides.com'), '/');
    $price      = (float) ($data['price'] ?? 0);
    $in_stock   = (string) ($data['in_stock'] ?? '0');
    $image      = $data['image'] ?? '';
    $title      = $data['name'] ?? get_the_title($post_id);
    $cms_cat    = $data['category'] ?? '';
    $override   = $data['omnisend_category'] ?? '';

    $categories = altr_omnisend_categories($cms_cat, $slug, $override);
    $status     = $in_stock === '1' ? 'inStock' : 'outOfStock';

    $body = [
        'productID'  => $slug,
        'title'      => $title,
        'productUrl' => $store_url . '/shop/' . $slug,
        'status'     => $status,
        'currency'   => 'USD',
        'variants'   => [[
            'variantID' => $slug,
            'title'     => $title,
            'sku'       => $slug,
            'status'    => $status,
            'price'     => (int) round($price * 100),
        ]],
    ];
    if ($image)      $body['imageUrl'] = $image;
    if ($categories) $body['tags']     = $categories;

    $api_key = altr_omnisend_api_key();
    $headers = [
        'Content-Type'     => 'application/json',
        'X-API-KEY'        => $api_key,
        'Omnisend-Version' => '2026-03-15',
    ];
    $json = wp_json_encode($body);

    // PUT (update) first; fall back to POST (create) on 404.
    $put = wp_remote_request(
        'https://api.omnisend.com/v3/products/' . rawurlencode($slug),
        ['method' => 'PUT', 'headers' => $headers, 'body' => $json, 'timeout' => 15]
    );
    if (is_wp_error($put)) return;
    if (wp_remote_retrieve_response_code($put) === 404) {
        wp_remote_post('https://api.omnisend.com/v3/products', [
            'headers' => $headers, 'body' => $json, 'timeout' => 15,
        ]);
    }
}

add_action('save_post_altr_product', function (int $post_id) {
    if (!isset($_POST['altr_cms_product_nonce']) ||
        !wp_verify_nonce($_POST['altr_cms_product_nonce'], 'altr_cms_save_product')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    static $syncing = [];
    if (isset($syncing[$post_id])) return;
    $syncing[$post_id] = true;

    add_action('shutdown', function () use ($post_id) {
        altr_omnisend_sync_product($post_id);
    });
}, 20);
