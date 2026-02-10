document.addEventListener("DOMContentLoaded", () => {
  // GSAPとScrollTriggerが読み込まれているか確認
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const trigger = document.querySelector("#movie-trigger");
  const wrapper = document.querySelector(".movie-mask-wrapper");
  const poster = document.querySelector(".movie-poster-layer");
  const video = document.querySelector(".movie-video");
  const overlay = document.querySelector(".movie-overlay");
  const btn = document.querySelector(".movie-fullbtn");

  if (!trigger || !wrapper || !poster || !video || !overlay || !btn) return;

  // オーバーレイとボタンの初期設定（黒いマスク、z-index確保）
  gsap.set(overlay, {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 25
  });
  gsap.set(btn, {
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    zIndex: 30
  });

  // タイムラインの作成
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: "top top",   // セクション上部が画面上部に到達した時
      end: "+=2000",      // アニメーションさせるスクロール距離
      scrub: true,        // スクロール量に同期
      pin: true,          // セクションを固定
      anticipatePin: 1,   // ピン留めのガタつき防止
    }
  });

  tl
    // 1. マスクを全画面に広げる (inset 0%)
    .fromTo(wrapper, 
      { clipPath: "inset(15% 10% 15% 10% round 20px)" }, // 初期状態：枠の中で表示
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",        // 終了状態：全画面
        ease: "power2.inOut",
        duration: 1
      }
    )
    // 2. ポスター画像をフェードアウト（動画を表示）
    .to(poster, {
      opacity: 0,
      duration: 0.1,
      ease: "power1.inOut"
    }, "<") // マスク拡大開始と同時にフェードアウト
    // 3. 映像とポスターのスケールを1.1倍から1倍に戻す（奥行き演出）
    .fromTo([poster, video],
      { scale: 1.1, transformOrigin: "center center" }, // 初期状態：少し拡大
      {
        scale: 1,
        transformOrigin: "center center",
        duration: 1,
        ease: "power2.inOut"
      }, 
      "<"
    ) // マスク拡大と同時に開始
    // 4. 黒いマスクとボタンを表示
    .fromTo([overlay, btn],
      { opacity: 0, autoAlpha: 0 },
      {
        opacity: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out"
      }
    );
});