<?php
if (!defined('ABSPATH')) exit;

add_action('admin_menu', function () {
    add_menu_page(
        'ALTR CMS',
        'ALTR CMS',
        'manage_options',
        'altr-cms-setup',
        'altr_cms_render_setup_page',
        'dashicons-admin-generic',
        3
    );

    add_submenu_page('altr-cms-setup', 'Setup & Import', 'Setup & Import', 'manage_options', 'altr-cms-setup', 'altr_cms_render_setup_page');
    add_submenu_page('altr-cms-setup', 'Products', 'Products', 'edit_posts', 'edit.php?post_type=altr_product');
    add_submenu_page('altr-cms-setup', 'Lab Results (COAs)', 'Lab Results (COAs)', 'edit_posts', 'edit.php?post_type=altr_coa');
    add_submenu_page('altr-cms-setup', 'Site Content', 'Site Content', 'edit_posts', 'edit.php?post_type=altr_content');
    add_submenu_page('altr-cms-setup', 'Popups & Offers', 'Popups & Offers', 'edit_posts', 'edit.php?post_type=altr_popup');
});

function altr_cms_render_setup_page() {
    if (!current_user_can('manage_options')) return;

    $product_count = wp_count_posts('altr_product')->publish ?? 0;
    $coa_count = wp_count_posts('altr_coa')->publish ?? 0;
    $content_count = wp_count_posts('altr_content')->publish ?? 0;
    $popup_count = wp_count_posts('altr_popup')->publish ?? 0;

    $just_imported = isset($_GET['imported']) && get_transient('altr_cms_import_result');
    $import_result = $just_imported ? get_transient('altr_cms_import_result') : null;
    if ($just_imported) delete_transient('altr_cms_import_result');

    $rest_base = rest_url('altr/v1');
    ?>
    <div class="wrap altr-cms-wrap">
        <h1>ALTR CMS</h1>
        <p>Single source of truth for every page, product, lab result, and popup on the ALTR storefront. The Next.js frontend reads this data through the REST API below.</p>

        <?php if ($import_result): ?>
            <div class="notice notice-success"><p>
                Import complete — <strong><?php echo esc_html($import_result['imported']); ?></strong> products imported,
                <strong><?php echo esc_html($import_result['skipped']); ?></strong> already existed and were skipped.
            </p></div>
        <?php endif; ?>

        <div class="altr-cms-cards">
            <div class="altr-cms-card">
                <h2>1. Import Current Catalog</h2>
                <p>One-click import of the 14 live, real-photography products into this CMS. Safe to run more than once — existing slugs are skipped.</p>
                <p><strong><?php echo esc_html($product_count); ?></strong> products currently in the CMS.</p>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <?php wp_nonce_field('altr_cms_import_products'); ?>
                    <input type="hidden" name="action" value="altr_cms_import_products" />
                    <button type="submit" class="button button-primary button-hero">Import Products Now</button>
                </form>
            </div>

            <div class="altr-cms-card">
                <h2>2. Site Content</h2>
                <p>Every headline, body copy, and image reference for every page — pre-seeded on activation.</p>
                <p><strong><?php echo esc_html($content_count); ?></strong> content pages seeded.</p>
                <a class="button" href="<?php echo esc_url(admin_url('edit.php?post_type=altr_content')); ?>">Edit Site Content</a>
            </div>

            <div class="altr-cms-card">
                <h2>3. Lab Results (COAs)</h2>
                <p>Add, edit, or remove Certificate of Analysis entries shown on the Lab Results page.</p>
                <p><strong><?php echo esc_html($coa_count); ?></strong> COA entries.</p>
                <a class="button" href="<?php echo esc_url(admin_url('post-new.php?post_type=altr_coa')); ?>">Add New COA</a>
                <a class="button" href="<?php echo esc_url(admin_url('edit.php?post_type=altr_coa')); ?>">View All</a>
            </div>

            <div class="altr-cms-card">
                <h2>4. Popups & Offers</h2>
                <p>Configure front-end marketing popups. Off by default — nothing shows until you activate one.</p>
                <p><strong><?php echo esc_html($popup_count); ?></strong> popups configured.</p>
                <a class="button" href="<?php echo esc_url(admin_url('post-new.php?post_type=altr_popup')); ?>">Add New Popup</a>
                <a class="button" href="<?php echo esc_url(admin_url('edit.php?post_type=altr_popup')); ?>">View All</a>
            </div>
        </div>

        <div class="altr-cms-card" style="margin-top:24px">
            <h2>Frontend Connection</h2>
            <p>Point the Next.js site at this REST API base:</p>
            <code style="display:block;padding:10px;background:#f0f0f1;margin:8px 0"><?php echo esc_html($rest_base); ?></code>
            <ul style="line-height:1.9">
                <li><code>GET <?php echo esc_html($rest_base); ?>/products</code> — full catalog</li>
                <li><code>GET <?php echo esc_html($rest_base); ?>/products/{slug}</code> — one product</li>
                <li><code>GET <?php echo esc_html($rest_base); ?>/coas</code> — all COAs</li>
                <li><code>GET <?php echo esc_html($rest_base); ?>/content</code> — every page's content fields</li>
                <li><code>GET <?php echo esc_html($rest_base); ?>/content/{page-key}</code> — one page's content</li>
                <li><code>GET <?php echo esc_html($rest_base); ?>/popups/active</code> — currently active popups</li>
            </ul>
        </div>
    </div>
    <?php
}
