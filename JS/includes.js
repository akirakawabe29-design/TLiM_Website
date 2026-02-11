(() => {
  const FALLBACK = {
    header: `<header class="header-menu" aria-label="Header">
  <div class="header-wrapper">
    <a class="logo" href="index.html" aria-label="TLiM Home">
      <img src="img/tlimロゴ.svg" alt="TLiM">
    </a>

    <button class="nav-toggle" type="button" aria-controls="global-nav" aria-expanded="false">
      <span class="sr-only">Menu</span>
      <span class="nav-toggle__bar" aria-hidden="true"></span>
      <span class="nav-toggle__bar" aria-hidden="true"></span>
    </button>

    <nav class="global-nav" id="global-nav" aria-label="Global navigation">
      <button class="nav-close" type="button" aria-label="Close menu">×</button>
      <ul class="nav-list">
        <li class="nav-item"><a href="index.html#about">About us</a></li>
        <li class="nav-item"><a href="index.html#service">What we do</a></li>
        <li class="nav-item"><a href="index.html#case">Case</a></li>
        <li class="nav-item"><a href="recruit.html">Recruit</a></li>
        <li class="nav-item"><a href="company.html">Company</a></li>
        <li class="nav-item"><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>
<div class="nav-backdrop" aria-hidden="true"></div>`,
    footer: `<footer class="site-footer">
  <div class="footer-inner">
    
    <div class="footer-brand fade-in">
      <div class="footer-logo">TLiM</div>
      <p class="footer-tagline">Turn Life into Meaningful</p>
      <p class="footer-vision">事業に、意義ある成果を。</p>
    </div>

    <div class="footer-nav-grid fade-in">
      <div class="footer-nav-group">
        <p class="footer-nav-label">Menu</p>
        <ul class="footer-links">
          <li><a href="#about">About</a></li>
          <li><a href="#service">What we do</a></li>
          <li><a href="#case">Case</a></li>
          <li><a href="#news">News</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      
      <div class="footer-nav-group">
        <p class="footer-nav-label">Services</p>
        <ul class="footer-links">
          <li><a href="#service">クリエイティブ制作</a></li>
          <li><a href="#service">PR・マーケティング</a></li>
          <li><a href="#service">採用サポート</a></li>
          <li><a href="#service">SNS運用代行</a></li>
        </ul>
      </div>

      <div class="footer-nav-group is-fullwidth">
        <p class="footer-nav-label">Expertise</p>
        <p class="footer-expertise-text">
          Food and Beverage / Beauty / Apparel / Medical
        </p>
      </div>
    </div>

    <div class="footer-bottom fade-in">
      <div class="footer-sns">
        <a href="#" class="footer-sns-link" aria-label="Instagram">Instagram</a>
        <a href="#" class="footer-sns-link" aria-label="X">X (Twitter)</a>
      </div>
      <p class="footer-copy">&copy; <span id="footerYear"></span> TLiM. All Rights Reserved.</p>
    </div>

  </div>
</footer>`
  };

  const load = (selector, fallbackKey) => {
    const host = document.querySelector(selector);
    if (!host) return;
    host.innerHTML = FALLBACK[fallbackKey];
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

  const render = () => {
    load("[data-include='header']", "header");
    load("[data-include='footer']", "footer");
    initNavToggle();
    initFooterYear();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
