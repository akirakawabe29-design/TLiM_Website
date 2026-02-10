document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('js-nav-toggle');
  const mobileNav = document.getElementById('js-mobile-nav');
  const body = document.body;
  const navLinks = document.querySelectorAll('.js-nav-link');
  const spans = toggleBtn.querySelectorAll('span');

  if (!toggleBtn || !mobileNav) return;

  // メニュー開閉のトグル
  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    const nextExpanded = !isExpanded;
    toggleBtn.setAttribute('aria-expanded', String(nextExpanded));

    // Tailwindの translate-x-full を直接制御して開閉する
    mobileNav.classList.toggle('translate-x-full', !nextExpanded);
    mobileNav.setAttribute('aria-hidden', String(!nextExpanded));
    body.style.overflow = nextExpanded ? 'hidden' : '';

    // ハンバーガーアイコンのアニメーション
    if (spans.length >= 3) {
      if (nextExpanded) {
        spans[0].classList.add('rotate-45', 'translate-y-[9px]');
        spans[1].classList.add('opacity-0');
        spans[2].classList.add('-rotate-45', '-translate-y-[9px]');
      } else {
        spans[0].classList.remove('rotate-45', 'translate-y-[9px]');
        spans[1].classList.remove('opacity-0');
        spans[2].classList.remove('-rotate-45', '-translate-y-[9px]');
      }
    }
  });

  // リンクをクリックしたらメニューを閉じる（ページ内リンク対応）
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('translate-x-full');
      mobileNav.setAttribute('aria-hidden', 'true');
      body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');

      // アイコンを元に戻す
      if (spans.length >= 3) {
        spans[0].classList.remove('rotate-45', 'translate-y-[9px]');
        spans[1].classList.remove('opacity-0');
        spans[2].classList.remove('-rotate-45', '-translate-y-[9px]');
      }
    });
  });
});
