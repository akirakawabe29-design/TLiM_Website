<?php
/*
Template Name: Service List
*/
$GLOBALS['tlim_meta'] = array(
    'title' => 'Services | TLiM',
    'description' => 'TLiMの提供サービス一覧。クリエイティブ制作、SNSマーケティング、採用ブランディング、SNS運用代行。',
    'canonical' => tlim_page_or_file_url('service-list', 'service-list.html'),
    'og_image' => home_url('/img/prmarketing.png'),
);
get_header();
?>
<style>
  body { background-color: #050505; color: #fff; overflow-x: hidden; }
  .service-card:hover .card-img { transform: scale(1.1); }
  .card-img { transition: transform 0.8s cubic-bezier(0.2, 1, 0.3, 1); }
  .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
  .fade-up.is-visible { opacity: 1; transform: translateY(0); }
</style>
<div class="fixed inset-0 z-0 bg-noise opacity-30 pointer-events-none"></div>
<?php echo tlim_extract_main('service-list.html'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
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
