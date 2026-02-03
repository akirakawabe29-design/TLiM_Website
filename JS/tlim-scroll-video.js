gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".scroll-video");
const pin = document.querySelector(".scroll-video__pin");
const box = document.querySelector(".scroll-video__inner");
const video = document.querySelector(".scroll-video__video");

if (!section || !pin || !box || !video) {
  console.warn("scroll-video elements not found");
} else {
  video.pause();
  video.currentTime = 0;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=120%",
      scrub: true,
      pin: pin,
      pinSpacing: true,
      anticipatePin: 1,

      onEnter: () => {
        section.classList.add("is-playing");
        video.play().catch(() => {});
      },

      onLeaveBack: () => {
        section.classList.remove("is-playing");
        video.pause();
        video.currentTime = 0;
      }
    }
  });

  tl.to(box, {
    width: "100vw",
    height: "100vh",
    borderRadius: 0,
    ease: "none"
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}
