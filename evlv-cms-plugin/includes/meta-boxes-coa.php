<?php
if (!defined('ABSPATH')) exit;

/** Certificate of Analysis entries — managed independently so batches can be added/edited/removed freely. */
function altr_cms_coa_fields() {
    return [
        'product_id'   => 'Linked product',
        'lot_code'     => 'Lot / batch code',
        'test_date'    => 'Test date',
        'purity'       => 'Purity (%)',
        'avg_mass'     => 'Average mass',
        'method'       => 'Test method (e.g. HPLC, LC-MS)',
        'lab_name'     => 'Testing lab name',
        'status'       => 'Status (PASS / PENDING)',
        'report_file'  => 'COA/report file (PDF or image)',
    ];
}

add_action('add_meta_boxes', function () {
    add_meta_box('altr_coa_fields', 'Certificate of Analysis', 'altr_cms_render_coa_meta_box', 'altr_coa', 'normal', 'high');
});

function altr_cms_render_coa_meta_box($post) {
    wp_nonce_field('altr_cms_save_coa', 'altr_cms_coa_nonce');
    $fields = altr_cms_coa_fields();
    $products = get_posts(['post_type' => 'altr_product', 'numberposts' => -1, 'orderby' => 'title', 'order' => 'ASC']);

    echo '<table class="form-table"><tbody>';
    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, '_altr_' . $key, true);
        echo '<tr><th style="width:260px;text-align:left"><label for="altr_' . esc_attr($key) . '">' . esc_html($label) . '</label></th><td>';

        if ($key === 'product_id') {
            echo '<select id="altr_product_id" name="altr_product_id"><option value="">— None —</option>';
            foreach ($products as $p) {
                echo '<option value="' . esc_attr($p->ID) . '" ' . selected($value, $p->ID, false) . '>' . esc_html($p->post_title) . '</option>';
            }
            echo '</select>';
        } elseif ($key === 'status') {
            echo '<select id="altr_status" name="altr_status">';
            foreach (['PASS', 'PENDING'] as $opt) {
                echo '<option value="' . esc_attr($opt) . '" ' . selected($value, $opt, false) . '>' . esc_html($opt) . '</option>';
            }
            echo '</select>';
        } elseif ($key === 'report_file') {
            echo '<input type="text" style="width:70%" id="altr_report_file" name="altr_report_file" value="' . esc_attr($value) . '" /> ';
            echo '<button type="button" class="button altr-media-picker" data-target="altr_report_file">Choose File</button>';
        } elseif ($key === 'test_date') {
            echo '<input type="date" id="altr_test_date" name="altr_test_date" value="' . esc_attr($value) . '" />';
        } else {
            echo '<input type="text" style="width:100%" id="altr_' . esc_attr($key) . '" name="altr_' . esc_attr($key) . '" value="' . esc_attr($value) . '" />';
        }
        echo '</td></tr>';
    }
    echo '</tbody></table>';
}

add_action('save_post_altr_coa', function ($post_id) {
    if (!isset($_POST['altr_cms_coa_nonce']) || !wp_verify_nonce($_POST['altr_cms_coa_nonce'], 'altr_cms_save_coa')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    foreach (array_keys(altr_cms_coa_fields()) as $key) {
        if (isset($_POST['altr_' . $key])) {
            update_post_meta($post_id, '_altr_' . $key, sanitize_text_field(wp_unslash($_POST['altr_' . $key])));
        }
    }
});

function altr_cms_get_coa_data($post_id) {
    $data = ['id' => (string) $post_id, 'title' => get_the_title($post_id)];
    foreach (array_keys(altr_cms_coa_fields()) as $key) {
        $data[$key] = get_post_meta($post_id, '_altr_' . $key, true);
    }
    if (!empty($data['product_id'])) {
        $data['product_slug'] = get_post_meta($data['product_id'], '_altr_slug', true);
        $data['product_name'] = get_the_title($data['product_id']);
    }
    return $data;
}
