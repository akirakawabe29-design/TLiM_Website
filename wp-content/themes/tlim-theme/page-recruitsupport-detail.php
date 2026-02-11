<?php
/*
Template Name: Recruit Support Detail
*/
$GLOBALS['tlim_meta'] = array(
    'title' => 'HR Support & Branding | TLiM',
    'description' => 'TLiMの採用支援・採用ブランディング事業。「この会社で働きたい」という熱狂を生むコンセプト設計から、採用サイト、ムービー、SNS運用まで。',
    'canonical' => tlim_page_or_file_url('recruitsupport-detail', 'recruitsupport-detail.html'),
    'og_image' => home_url('/img/recruiting.png'),
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
  .spotlight-bg {
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 60%);
    filter: blur(60px);
  }
  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.2, 0, 0.2, 1), opacity 0.5s ease;
    opacity: 0;
  }
  .group.active .accordion-content {
    max-height: 500px;
    opacity: 1;
  }
  .group.active .accordion-icon {
    transform: rotate(45deg);
  }
</style>
<div class="fixed top-[-20%] left-[-20%] w-[80vw] h-[80vw] spotlight-bg animate-spotlight pointer-events-none z-0"></div>
<div class="fixed bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] spotlight-bg animate-pulse-slow pointer-events-none z-0"></div>
<?php echo tlim_extract_main('recruitsupport-detail.html'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
<script>
  gsap.registerPlugin(ScrollTrigger);
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => {
    gsap.fromTo(
      el,
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }
    );
  });
</script>
<?php get_footer(); ?>
