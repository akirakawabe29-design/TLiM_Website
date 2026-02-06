// Scroll expand (GSAP) + background muted video play on pin start
// - The pinned box expands to fullscreen via ScrollTrigger (scrubbed).
// - A background video (muted) starts playing when the pin/expand begins.
// - Full Movie button opens the modal (handled in full-movie.js). Overlay stays clickable.

gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector('.scroll-video');
const pin = document.querySelector('.scroll-video__pin');
const box = document.querySelector('.scroll-video__inner');
const overlay = document.querySelector('.scroll-video__overlay');
const bgVideo = document.getElementById('bgVideo');

// Overlay should be visible from the poster stage (always-on in current spec).
if (overlay) overlay.classList.add('is-visible');

function setVideoSrcFallback(videoEl, primary, fallback) {
  if (!videoEl) return;

  // Prefer explicit src so we can switch reliably on error.
  if (!videoEl.getAttribute('src') && primary) {
    videoEl.src = primary;
  }

  videoEl.addEventListener(
    'error',
    () => {
      if (!fallback) return;
      const src = (videoEl.getAttribute('src') || '').toString();
      if (src.includes(fallback)) return;

      videoEl.src = fallback;
      videoEl.load();
    },
    { once: true }
  );
}

function startBgVideo() {
  if (!bgVideo) return;

  // Ensure muted inline playback is allowed.
  bgVideo.muted = true;
  bgVideo.loop = true;
  bgVideo.playsInline = true;

  // If the first path fails, try a fallback.
  setVideoSrcFallback(bgVideo, 'Video/TLiM_Video_nobgm.mp4', 'TLiM_Video_nobgm.mp4');

  const p = bgVideo.play();
  if (p && typeof p.catch === 'function') {
    p.catch(() => {
      // Some Safari environments may still require a gesture.
      const once = () => {
        bgVideo.play().catch(() => {});
      };
      window.addEventListener('pointerdown', once, { once: true });
      window.addEventListener('touchstart', once, { once: true, passive: true });
    });
  }

  if (box) box.classList.add('is-bg-playing');
}

function stopBgVideo() {
  if (!bgVideo) return;
  try {
    bgVideo.pause();
  } catch (_) {}
  if (box) box.classList.remove('is-bg-playing');
}

if (!section || !pin || !box) {
  console.warn('scroll-video elements not found');
} else {
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    ScrollTrigger.matchMedia({
      '(max-width: 768px)': function () {
        // Add a short "hold" after the box reaches fullscreen so the next section
        // doesn't immediately appear.
        const dummy = { v: 0 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            // Longer pin = more breathing room after fullscreen.
            end: '+=150%',
            scrub: true,
            pin: pin,
            pinSpacing: true,
            anticipatePin: 1,
            onEnter: startBgVideo,
            onEnterBack: startBgVideo,
            onLeave: stopBgVideo,
            onLeaveBack: stopBgVideo
          }
        });

        // 1) Expand to fullscreen
        tl.to(box, {
          width: '100%',
          height: 'calc(100svh - var(--header-h))',
          borderRadius: 0,
          maxWidth: 'none',
          maxHeight: 'none',
          duration: 0.50,
          ease: 'none'
        });

        // 2) Hold at fullscreen for the remaining scroll (no visual change)
        tl.to(dummy, { v: 1, duration: 0.50, ease: 'none' });

        return () => {
          tl.scrollTrigger && tl.scrollTrigger.kill();
          tl.kill();
        };
      },

      '(min-width: 769px)': function () {
        // Add a short "hold" after the box reaches fullscreen so the next section
        // doesn't immediately appear.
        const dummy = { v: 0 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            // Longer pin = more breathing room after fullscreen.
            end: '+=230%',
            scrub: true,
            pin: pin,
            pinSpacing: true,
            anticipatePin: 1,
            onEnter: startBgVideo,
            onEnterBack: startBgVideo,
            onLeave: stopBgVideo,
            onLeaveBack: stopBgVideo
          }
        });

        // 1) Expand to fullscreen
        tl.to(box, {
          width: '100%',
          height: 'calc(100svh - var(--header-h))',
          borderRadius: 0,
          maxWidth: 'none',
          maxHeight: 'none',
          duration: 0.50,
          ease: 'none'
        });

        // 2) Hold at fullscreen for the remaining scroll (no visual change)
        tl.to(dummy, { v: 1, duration: 0.50, ease: 'none' });

        return () => {
          tl.scrollTrigger && tl.scrollTrigger.kill();
          tl.kill();
        };
      }
    });
  }

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  window.addEventListener('resize', () => {
    window.requestAnimationFrame(refresh);
  });
}
