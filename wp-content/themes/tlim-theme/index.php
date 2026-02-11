<?php
$GLOBALS['tlim_meta'] = array(
    'title' => get_bloginfo('name'),
    'description' => get_bloginfo('description'),
    'canonical' => home_url('/'),
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
  <?php else : ?>
    <p class="text-gray-400">コンテンツがありません。</p>
  <?php endif; ?>
</main>
<?php get_footer(); ?>
