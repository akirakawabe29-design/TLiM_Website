// JavaScript Document
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".fade-in");

  if (!("IntersectionObserver" in window)) {
    // 古いブラウザ用フォールバック
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          // 上スクロールで戻したい場合は残す
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -15% 0px",
      threshold: 0
    }
  );

  targets.forEach(el => observer.observe(el));
});
