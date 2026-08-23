<?php
if (!defined('ABSPATH')) exit;

/** Admin-configurable marketing popups/offers for the front-end (opt-in per popup, off by default). */
function altr_cms_popup_fields() {
    return [
        'active'       => 'Active (shown on front-end)',
        'trigger'      => 'Trigger (page-load / exit-intent / timed / scroll)',
        'delay_seconds'=> 'Delay in seconds (for "timed" trigger)',
        'scroll_percent'=> 'Scroll % (for "scroll" trigger)',
        'headline'     => 'Headline',
        'body'         => 'Body copy',
        'image'        => 'Image',
        'cta_label'    => 'CTA button label',
        'cta_link'     => 'CTA button link',
        'dismiss_label'=> 'Dismiss/close label',
        'pages'        => 'Show on pages (comma-separated paths, blank = all pages)',
        'start_date'   => 'Start date (optional)',
        'end_date'     => 'End date (optional)',
    ];
}

add_action('add_meta_boxes', function () {
    add_meta_box('altr_popup_fields', 'Popup / Offer Settings', 'altr_cms_render_popup_meta_box', 'altr_popup', 'normal', 'high');
});

function altr_cms_render_popup_meta_box($post) {
    wp_nonce_field('altr_cms_save_popup', 'altr_cms_popup_nonce');
    $fields = altr_cms_popup_fields();

    echo '<table class="form-table"><tbody>';
    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, '_altr_' . $key, true);
        echo '<tr><th style="width:260px;text-align:left"><label for="altr_' . esc_attr($key) . '">' . esc_html($label) . '</label></th><td>';

        if ($key === 'active') {
            echo '<input type="checkbox" id="altr_active" name="altr_active" value="1" ' . checked($value, '1', false) . ' />';
        } elseif ($key === 'trigger') {
            echo '<select id="altr_trigger" name="altr_trigger">';
            foreach (['page-load' => 'Page load', 'exit-intent' => 'Exit intent', 'timed' => 'Timed delay', 'scroll' => 'Scroll depth'] as $val => $text) {
                echo '<option value="' . esc_attr($val) . '" ' . selected($value, $val, false) . '>' . esc_html($text) . '</option>';
            }
            echo '</select>';
        } elseif ($key === 'body') {
            echo '<textarea style="width:100%" rows="3" id="altr_body" name="altr_body">' . esc_textarea($value) . '</textarea>';
        } elseif ($key === 'image') {
            echo '<input type="text" style="width:70%" id="altr_image" name="altr_image" value="' . esc_attr($value) . '" /> ';
            echo '<button type="button" class="button altr-media-picker" data-target="altr_image">Choose Image</button>';
        } elseif (in_array($key, ['start_date', 'end_date'], true)) {
            echo '<input type="date" id="altr_' . esc_attr($key) . '" name="altr_' . esc_attr($key) . '" value="' . esc_attr($value) . '" />';
        } else {
            echo '<input type="text" style="width:100%" id="altr_' . esc_attr($key) . '" name="altr_' . esc_attr($key) . '" value="' . esc_attr($value) . '" />';
        }
        echo '</td></tr>';
    }
    echo '</tbody></table>';
}

add_action('save_post_altr_popup', function ($post_id) {
    if (!isset($_POST['altr_cms_popup_nonce']) || !wp_verify_nonce($_POST['altr_cms_popup_nonce'], 'altr_cms_save_popup')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    foreach (array_keys(altr_cms_popup_fields()) as $key) {
        if ($key === 'active') {
            update_post_meta($post_id, '_altr_active', isset($_POST['altr_active']) ? '1' : '0');
            continue;
        }
        if (isset($_POST['altr_' . $key])) {
            $raw = wp_unslash($_POST['altr_' . $key]);
            $value = ($key === 'body') ? sanitize_textarea_field($raw) : sanitize_text_field($raw);
            update_post_meta($post_id, '_altr_' . $key, $value);
        }
    }
});

function altr_cms_get_popup_data($post_id) {
    $data = ['id' => (string) $post_id, 'title' => get_the_title($post_id)];
    foreach (array_keys(altr_cms_popup_fields()) as $key) {
        $data[$key] = get_post_meta($post_id, '_altr_' . $key, true);
    }
    $data['pages'] = array_filter(array_map('trim', explode(',', (string) $data['pages'])));
    return $data;
}
