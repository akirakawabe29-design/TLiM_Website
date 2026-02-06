// Mobile navigation toggle (no dependencies)
function initNavToggle() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".global-nav");
  const backdrop = document.querySelector(".nav-backdrop");
  const closeBtn = document.querySelector(".nav-close");

  if (!btn || !nav || !backdrop) return;

  const open = () => {
    document.body.classList.add("nav-open");
    btn.setAttribute("aria-expanded", "true");
    backdrop.hidden = false;
  };

  const close = () => {
    document.body.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
    backdrop.hidden = true;
  };

  btn.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("nav-open");
    if (isOpen) close();
    else open();
  });

  backdrop.addEventListener("click", close);
  if (closeBtn) closeBtn.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

window.initNavToggle = initNavToggle;

document.addEventListener("DOMContentLoaded", initNavToggle);
