document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // 要素の取得
  const movieSection = document.querySelector('.movie-section');
  const maskWrapper = document.querySelector('.movie-mask-wrapper');
  const posterLayer = document.querySelector('.movie-poster-layer');
  const videoLayer = document.querySelector('.movie-video'); // 動画本体を取得
  const textContent = document.querySelector('.movie-content');

  if (movieSection && maskWrapper) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: movieSection,
        start: "top top",     // セクションの上部が画面上部に来たら開始
        end: "+=150%",        // スクロール量（1.5画面分スクロールする間アニメーション）
        scrub: 0.5,           // 慣性ありで追従
        pin: true,            // 画面を固定
        anticipatePin: 1
      }
    });

    // アニメーションの初期状態をセット（念のため）
    gsap.set([posterLayer, videoLayer], { scale: 1.0 });

    tl
    // 1. 窓（Clip-path）を全画面に広げる
    .to(maskWrapper, {
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      ease: "power2.inOut",
      duration: 1.5
    })
    
    // 2. 静止画と動画を同時に「拡大」させる（迫ってくる演出）
    .to([posterLayer, videoLayer], {
      scale: 1.15, // 1.15倍まで拡大
      ease: "power1.inOut",
      duration: 1.5
    }, "<") // マスク拡大と同時に開始

    // 3. 静止画をフェードアウトさせつつ、動画を見せる
    .to(posterLayer, {
      opacity: 0,
      ease: "power1.inOut",
      duration: 1.0
    }, "<0.2") // 少し遅れてフェードアウト開始

    // 4. テキストを拡大しながらフェードアウト
    .to(textContent, {
      opacity: 0,
      scale: 1.5,
      ease: "power1.in",
      duration: 0.8
    }, "<"); // 上のアニメーションと同時に開始
  }
});
