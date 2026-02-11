<?php
$post_obj = get_queried_object();
$slug = ($post_obj instanceof WP_Post) ? $post_obj->post_name : '';
$map = function_exists('tlim_page_file_map') ? tlim_page_file_map() : array();

if ($slug !== '' && isset($map[$slug])) {
    $file = $map[$slug];
    $fallback_meta = array(
        'title' => get_the_title($post_obj),
        'description' => get_bloginfo('description'),
        'canonical' => get_permalink($post_obj),
        'og_image' => home_url('/img/ogp.png'),
    );

    $meta = tlim_extract_meta_from_html($file, $fallback_meta);
    if (empty($meta['canonical'])) {
        $meta['canonical'] = get_permalink($post_obj);
    }
    $GLOBALS['tlim_meta'] = $meta;

    get_header();
    echo tlim_extract_head_styles($file); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

    $main = tlim_extract_main($file);
    if ($main !== '') {
        echo $main; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    } else {
        echo '<main class="pt-24 px-6 pb-24 max-w-5xl mx-auto"><p class="text-gray-400">ページ本文が見つかりません。</p></main>';
    }

    echo tlim_extract_footer_scripts($file); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    get_footer();
    return;
}

$GLOBALS['tlim_meta'] = array(
    'title' => get_the_title(),
    'description' => get_bloginfo('description'),
    'canonical' => get_permalink(),
    'og_image' => home_url('/img/ogp.png'),
);
get_header();
?>
<main class="pt-24 px-6 pb-24 max-w-5xl mx-auto">
  <?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
      <article <?php post_class('mb-16'); ?>>
        <h1 class="text-3xl sm:text-4xl font-bold mb-6"><?php the_title(); ?></h1>
        <div class="text-gray-300 leading-relaxed"><?php the_content(); ?></div>
      </article>
    <?php endwhile; ?>
  <?php endif; ?>
</main>
<?php get_footer(); ?>
