<?php
if (!defined('ABSPATH')) {
    exit;
}

function tlim_setup_theme() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'tlim_setup_theme');

function tlim_enqueue_common_assets() {
    wp_enqueue_style('tlim-theme-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_script('tlim-nav-toggle', home_url('/js/nav-toggle.js'), array(), null, true);
    wp_enqueue_script('tlim-gsap', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', array(), null, true);
    wp_enqueue_script('tlim-gsap-scrolltrigger', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', array('tlim-gsap'), null, true);
}
add_action('wp_enqueue_scripts', 'tlim_enqueue_common_assets');

function tlim_page_or_file_url($slug, $fallback_file = '') {
    $page = get_page_by_path($slug);
    if ($page instanceof WP_Post) {
        return get_permalink($page);
    }
    if ($fallback_file !== '') {
        return home_url('/' . ltrim($fallback_file, '/'));
    }
    return home_url('/');
}

function tlim_root_file_path($file) {
    return trailingslashit(ABSPATH) . ltrim($file, '/');
}

function tlim_apply_link_map($html) {
    $map = array(
        'href="index.html"' => 'href="' . esc_url(home_url('/')) . '"',
        'href="#about"' => 'href="' . esc_url(tlim_page_or_file_url('about', 'about.html')) . '"',
        'href="#service"' => 'href="' . esc_url(tlim_page_or_file_url('service-list', 'service-list.html')) . '"',
        'href="#expertise"' => 'href="' . esc_url(tlim_page_or_file_url('professional-list', 'professional-list.html')) . '"',
        'href="#case"' => 'href="' . esc_url(tlim_page_or_file_url('case-list', 'case-list.html')) . '"',
        'href="#news"' => 'href="' . esc_url(tlim_page_or_file_url('news-list', 'news-list.html')) . '"',
        'href="index.html#about"' => 'href="' . esc_url(tlim_page_or_file_url('about', 'about.html')) . '"',
        'href="index.html#service"' => 'href="' . esc_url(tlim_page_or_file_url('service-list', 'service-list.html')) . '"',
        'href="index.html#expertise"' => 'href="' . esc_url(tlim_page_or_file_url('professional-list', 'professional-list.html')) . '"',
        'href="index.html#case"' => 'href="' . esc_url(tlim_page_or_file_url('case-list', 'case-list.html')) . '"',
        'href="index.html#news"' => 'href="' . esc_url(tlim_page_or_file_url('news-list', 'news-list.html')) . '"',
        'href="service-list.html"' => 'href="' . esc_url(tlim_page_or_file_url('service-list', 'service-list.html')) . '"',
        'href="professional-list.html"' => 'href="' . esc_url(tlim_page_or_file_url('professional-list', 'professional-list.html')) . '"',
        'href="news-list.html"' => 'href="' . esc_url(tlim_page_or_file_url('news-list', 'news-list.html')) . '"',
        'href="about.html"' => 'href="' . esc_url(tlim_page_or_file_url('about', 'about.html')) . '"',
        'href="case-list.html"' => 'href="' . esc_url(tlim_page_or_file_url('case-list', 'case-list.html')) . '"',
        'href="case.html"' => 'href="' . esc_url(tlim_page_or_file_url('case-list', 'case-list.html')) . '"',
        'href="creative-detail.html"' => 'href="' . esc_url(tlim_page_or_file_url('creative-detail', 'creative-detail.html')) . '"',
        'href="marketing-detail.html"' => 'href="' . esc_url(tlim_page_or_file_url('marketing-detail', 'marketing-detail.html')) . '"',
        'href="snsmanagement-detail.html"' => 'href="' . esc_url(tlim_page_or_file_url('snsmanagement-detail', 'snsmanagement-detail.html')) . '"',
        'href="food-detail.html"' => 'href="' . esc_url(tlim_page_or_file_url('food-detail', 'food-detail.html')) . '"',
        'href="beauty-detail.html"' => 'href="' . esc_url(tlim_page_or_file_url('beauty-detail', 'beauty-detail.html')) . '"',
        'href="apparel-detail.html"' => 'href="' . esc_url(tlim_page_or_file_url('apparel-detail', 'apparel-detail.html')) . '"',
        'href="medical-detail.html"' => 'href="' . esc_url(tlim_page_or_file_url('medical-detail', 'medical-detail.html')) . '"',
        'href="case-detail-sasaya.html"' => 'href="' . esc_url(tlim_page_or_file_url('case-detail-sasaya', 'case-detail-sasaya.html')) . '"',
        'href="case-detail-spiceworks.html"' => 'href="' . esc_url(tlim_page_or_file_url('case-detail-spiceworks', 'case-detail-spiceworks.html')) . '"',
        'href="company.html"' => 'href="' . esc_url(tlim_page_or_file_url('company', 'company.html')) . '"',
        'href="recruit.html"' => 'href="' . esc_url(tlim_page_or_file_url('recruit', 'recruit.html')) . '"',
        'href="contact.html"' => 'href="' . esc_url(tlim_page_or_file_url('contact', 'contact.html')) . '"',
        'href="entry-form.html"' => 'href="' . esc_url(tlim_page_or_file_url('entry-form', 'entry-form.html')) . '"',
        'href="recruitsupport.html"' => 'href="' . esc_url(tlim_page_or_file_url('recruitsupport', 'recruitsupport.html')) . '"',
        'href="detail-sasaya.html"' => 'href="' . esc_url(tlim_page_or_file_url('detail-sasaya', 'detail-sasaya.html')) . '"',
        'href="works_detail.html"' => 'href="' . esc_url(tlim_page_or_file_url('works-detail', 'works_detail.html')) . '"',
        'href="recruitsupport-detail.html"' => 'href="' . esc_url(tlim_page_or_file_url('recruitsupport-detail', 'recruitsupport-detail.html')) . '"',
    );

    return strtr($html, $map);
}

function tlim_extract_main($file) {
    $path = tlim_root_file_path($file);
    if (!file_exists($path)) {
        return '';
    }

    $content = file_get_contents($path);
    if ($content === false) {
        return '';
    }

    if (!preg_match('/<main\\b[\\s\\S]*?<\\/main>/i', $content, $m)) {
        return '';
    }

    return tlim_apply_link_map($m[0]);
}

function tlim_extract_front_sections() {
    $path = tlim_root_file_path('index.html');
    if (!file_exists($path)) {
        return '';
    }

    $content = file_get_contents($path);
    if ($content === false) {
        return '';
    }

    $start = strpos($content, '<section class="relative h-screen');
    $end = strpos($content, '<footer class="bg-black text-white py-16 px-6">');

    if ($start === false || $end === false || $end <= $start) {
        return '';
    }

    return tlim_apply_link_map(substr($content, $start, $end - $start));
}

function tlim_page_file_map() {
    return array(
        'creative-detail' => 'creative-detail.html',
        'marketing-detail' => 'marketing-detail.html',
        'snsmanagement-detail' => 'snsmanagement-detail.html',
        'food-detail' => 'food-detail.html',
        'beauty-detail' => 'beauty-detail.html',
        'apparel-detail' => 'apparel-detail.html',
        'medical-detail' => 'medical-detail.html',
        'case-detail-sasaya' => 'case-detail-sasaya.html',
        'case-detail-spiceworks' => 'case-detail-spiceworks.html',
        'company' => 'company.html',
        'contact' => 'contact.html',
        'entry-form' => 'entry-form.html',
        'recruit' => 'recruit.html',
        'recruitsupport' => 'recruitsupport.html',
        'recruitsupport-detail' => 'recruitsupport-detail.html',
        'detail-sasaya' => 'detail-sasaya.html',
        'works-detail' => 'works_detail.html',
        'works_detail' => 'works_detail.html',
        'service-list' => 'service-list.html',
        'professional-list' => 'professional-list.html',
        'case-list' => 'case-list.html',
        'news-list' => 'news-list.html',
        'about' => 'about.html',
    );
}

function tlim_extract_meta_from_html($file, $fallback = array()) {
    $path = tlim_root_file_path($file);
    $meta = wp_parse_args(
        $fallback,
        array(
            'title' => get_bloginfo('name'),
            'description' => get_bloginfo('description'),
            'canonical' => home_url('/'),
            'og_image' => home_url('/img/ogp.png'),
        )
    );

    if (!file_exists($path)) {
        return $meta;
    }

    $content = file_get_contents($path);
    if ($content === false) {
        return $meta;
    }

    if (preg_match('/<title>(.*?)<\/title>/is', $content, $m)) {
        $meta['title'] = trim(wp_strip_all_tags($m[1]));
    }
    if (preg_match('/<meta\s+name="description"\s+content="([^"]*)"/i', $content, $m)) {
        $meta['description'] = trim($m[1]);
    }
    if (preg_match('/<link\s+rel="canonical"\s+href="([^"]*)"/i', $content, $m)) {
        $meta['canonical'] = trim($m[1]);
    }
    if (preg_match('/<meta\s+property="og:image"\s+content="([^"]*)"/i', $content, $m)) {
        $meta['og_image'] = trim($m[1]);
    }

    return $meta;
}

function tlim_extract_head_styles($file) {
    $path = tlim_root_file_path($file);
    if (!file_exists($path)) {
        return '';
    }
    $content = file_get_contents($path);
    if ($content === false) {
        return '';
    }

    $styles = '';
    if (preg_match_all('/<style\b[^>]*>[\s\S]*?<\/style>/i', $content, $m)) {
        $styles = implode("\n", $m[0]);
    }
    return $styles;
}

function tlim_extract_footer_scripts($file) {
    $path = tlim_root_file_path($file);
    if (!file_exists($path)) {
        return '';
    }
    $content = file_get_contents($path);
    if ($content === false) {
        return '';
    }

    $main_end = stripos($content, '</main>');
    $tail = $main_end !== false ? substr($content, $main_end + 7) : $content;
    if (!preg_match_all('/<script\b[^>]*>[\s\S]*?<\/script>/i', $tail, $matches)) {
        return '';
    }

    $keep = array();
    foreach ($matches[0] as $script_tag) {
        $skip = false;
        $skip_markers = array(
            'cdn.tailwindcss.com',
            'gsap.min.js',
            'ScrollTrigger.min.js',
            'js/nav-toggle.js',
            'JS/nav-toggle.js',
        );
        foreach ($skip_markers as $marker) {
            if (stripos($script_tag, $marker) !== false) {
                $skip = true;
                break;
            }
        }
        if (!$skip) {
            $keep[] = tlim_apply_link_map($script_tag);
        }
    }
    return implode("\n", array_unique($keep));
}
