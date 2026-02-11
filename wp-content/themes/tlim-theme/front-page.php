<?php
$GLOBALS['tlim_meta'] = array(
    'title' => 'TLiM | Branding & Creative Firm - Turn Life into Meaningful',
    'description' => '株式会社TLiMの公式サイト。「Turn Life into Meaningful」を掲げ、ブランディング、クリエイティブ制作、SNSマーケティング、採用支援を通じて、事業に意義ある成果をもたらします。',
    'canonical' => home_url('/'),
    'og_image' => home_url('/img/ogp.png'),
);
get_header();
?>
<style>
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  .fade-in.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
<?php echo tlim_extract_front_sections(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 opacity-0 pointer-events-none transition-opacity duration-300" id="fullMovieModal" hidden>
  <div class="absolute inset-0" data-fullmovie-close></div>
  <div class="relative w-full max-w-6xl aspect-video bg-black shadow-2xl" role="dialog" aria-modal="true" aria-label="Full Movie">
    <button class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300" type="button" aria-label="Close" data-fullmovie-close>×</button>
    <video class="w-full h-full" id="fullMovieVideo" controls preload="metadata"></video>
  </div>
</div>

<script src="<?php echo esc_url(home_url('/js/movie-aperture.js')); ?>"></script>
<script src="<?php echo esc_url(home_url('/js/full-movie.js')); ?>"></script>
<script src="<?php echo esc_url(home_url('/js/scroll-fade.js')); ?>"></script>
<script src="<?php echo esc_url(home_url('/js/header-scroll.js')); ?>"></script>
<?php get_footer(); ?>
