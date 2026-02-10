// Full Movie modal (audio ON) for TLiM
// - Triggered by the overlay button on the poster/scroll section
// - Shows a modal (no forced fullscreen) and plays with sound
(() => {
  const btn = document.getElementById('fullMovieBtn');
  const modal = document.getElementById('fullMovieModal');
  const video = document.getElementById('fullMovieVideo');
  const closeEls = modal ? modal.querySelectorAll('[data-fullmovie-close]') : [];
  const scrollSection = document.querySelector('.scroll-video');

  if (!btn || !modal || !video) return;

  const PRIMARY_SRC = 'Video/TLiM_TOPVideo_short.mp4'; // 推奨配置
  const FALLBACK_SRC = 'TLiM_TOPVideo_short.mp4';      // 直下配置のフォールバック

  let lastFocused = null;

  function setSource(src) {
    return new Promise((resolve, reject) => {
      // src を差し替え
      try { video.pause(); } catch (_) {}
      video.removeAttribute('src');
      video.load();

      video.src = src;
      video.muted = false;
      video.volume = 1;

      const onCanPlay = async () => {
        cleanup();
        try {
          await video.play();
          resolve(true);
        } catch (e) {
          reject(e);
        }
      };

      const onError = () => {
        cleanup();
        reject(new Error('video load error'));
      };

      const cleanup = () => {
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('error', onError);
      };

      video.addEventListener('canplay', onCanPlay, { once: true });
      video.addEventListener('error', onError, { once: true });
      video.load();
    });
  }

  async function openModal() {
    lastFocused = document.activeElement;

    document.body.classList.add('is-fullmovie-open');
    modal.hidden = false;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    if (scrollSection) scrollSection.classList.add('is-full-opened');

    // まずは推奨パス → ダメならフォールバック
    try {
      await setSource(PRIMARY_SRC);
    } catch (_) {
      try {
        await setSource(FALLBACK_SRC);
      } catch (e2) {
        console.warn('Full Movie video not found:', e2);
        closeModal();
        return;
      }
    }

    const closeBtn = modal.querySelector('[data-fullmovie-close]');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    try { video.pause(); } catch (_) {}
    video.removeAttribute('src');
    video.load();

    modal.hidden = true;
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('is-fullmovie-open');
    if (scrollSection) scrollSection.classList.remove('is-full-opened');

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  btn.addEventListener('click', openModal);
  closeEls.forEach((el) => el.addEventListener('click', closeModal));

  window.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
  });
})();
