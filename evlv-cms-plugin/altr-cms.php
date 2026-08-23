<?php
/**
 * Plugin Name: ALTR CMS
 * Description: Headless CMS for the ALTR storefront — products, lab results (COAs), every page's copy/images, and front-end popups/offers. Exposes a REST API for the Next.js frontend to consume.
 * Version: 0.1.0
 * Author: ALTR
 * Text Domain: altr-cms
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ALTR_CMS_VERSION', '0.1.0');
define('ALTR_CMS_PATH', plugin_dir_path(__FILE__));
define('ALTR_CMS_URL', plugin_dir_url(__FILE__));

require_once ALTR_CMS_PATH . 'includes/post-types.php';
require_once ALTR_CMS_PATH . 'includes/content-schema.php';
require_once ALTR_CMS_PATH . 'includes/meta-boxes-product.php';
require_once ALTR_CMS_PATH . 'includes/meta-boxes-coa.php';
require_once ALTR_CMS_PATH . 'includes/meta-boxes-content.php';
require_once ALTR_CMS_PATH . 'includes/meta-boxes-popup.php';
require_once ALTR_CMS_PATH . 'includes/rest-api.php';
require_once ALTR_CMS_PATH . 'includes/importer-data.php';
require_once ALTR_CMS_PATH . 'includes/importer.php';
require_once ALTR_CMS_PATH . 'includes/admin-menu.php';

/**
 * On activation: register post types (so rewrite rules pick them up), seed
 * default site-content entries so every page has its editable fields
 * pre-populated with the current live copy — nothing missing on day one —
 * and flag first-run so the admin lands on the setup screen.
 */
function altr_cms_activate() {
    altr_cms_register_post_types();
    altr_cms_seed_default_content();
    flush_rewrite_rules();
    set_transient('altr_cms_activation_redirect', true, 30);
}
register_activation_hook(__FILE__, 'altr_cms_activate');

function altr_cms_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'altr_cms_deactivate');

add_action('admin_init', function () {
    if (get_transient('altr_cms_activation_redirect')) {
        delete_transient('altr_cms_activation_redirect');
        if (!isset($_GET['activate-multi'])) {
            wp_safe_redirect(admin_url('admin.php?page=altr-cms-setup'));
            exit;
        }
    }
});

add_action('admin_enqueue_scripts', function ($hook) {
    if (strpos($hook, 'altr-cms') === false && get_post_type() !== 'altr_product' && get_post_type() !== 'altr_coa' && get_post_type() !== 'altr_content' && get_post_type() !== 'altr_popup') {
        return;
    }
    wp_enqueue_media();
    wp_enqueue_style('altr-cms-admin', ALTR_CMS_URL . 'assets/css/admin.css', [], ALTR_CMS_VERSION);
    wp_enqueue_script('altr-cms-admin', ALTR_CMS_URL . 'assets/js/admin.js', ['jquery'], ALTR_CMS_VERSION, true);
});
