document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScrollTop = 0;
  const delta = 5; // スクロール検知の閾値
  const headerHeight = header.offsetHeight;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // スクロール量がヘッダーの高さより小さい場合は何もしない
    if (Math.abs(lastScrollTop - scrollTop) <= delta) {
      return;
    }

    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
      // 下にスクロール
      header.classList.add('is-hidden');
    } else {
      // 上にスクロール
      if (scrollTop + window.innerHeight < document.documentElement.scrollHeight) {
        header.classList.remove('is-hidden');
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, false);
});
