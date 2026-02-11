<?php
/*
Template Name: Professional List
*/
$GLOBALS['tlim_meta'] = array(
    'title' => 'Expertise | TLiM',
    'description' => 'TLiMの業界別専門領域。飲食、美容、アパレル、医療。各業界の商習慣とトレンドを熟知したクリエイティブを提供します。',
    'canonical' => tlim_page_or_file_url('professional-list', 'professional-list.html'),
    'og_image' => home_url('/img/food.png'),
);
get_header();
?>
<style>
  body { background-color: #050505; color: #fff; overflow-x: hidden; }
  .expertise-card .card-overlay { transition: opacity 0.6s ease; }
  .expertise-card:hover .card-overlay { opacity: 0; }
  .expertise-card:hover .card-img { transform: scale(1.05); filter: grayscale(0%); }
  .card-img { transition: transform 1.2s cubic-bezier(0.2, 1, 0.3, 1), filter 0.6s ease; filter: grayscale(100%); }
  .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
  .fade-up.is-visible { opacity: 1; transform: translateY(0); }
</style>
<div class="fixed inset-0 z-0 bg-noise opacity-30 pointer-events-none"></div>
<?php echo tlim_extract_main('professional-list.html'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
<script>
  gsap.registerPlugin(ScrollTrigger);
  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleClass: 'is-visible',
        once: true
      }
    });
  });
</script>
<?php get_footer(); ?>
