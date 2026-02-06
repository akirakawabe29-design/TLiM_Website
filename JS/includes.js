(() => {
  const load = async (selector, url) => {
    const host = document.querySelector(selector);
    if (!host) return;
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) return;
    host.innerHTML = await res.text();
  };

  const initFooterYear = () => {
    const el = document.getElementById("footerYear");
    if (el) el.textContent = new Date().getFullYear();
  };

  const initNavToggle = () => {
    if (typeof window.initNavToggle === "function") {
      window.initNavToggle();
    }
  };

  document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
      load("[data-include='header']", "includes/header.html"),
      load("[data-include='footer']", "includes/footer.html")
    ]);
    initNavToggle();
    initFooterYear();
  });
})();
