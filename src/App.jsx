import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAPプラグインの登録
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Refs for GSAP
  const mainRef = useRef(null);
  const movieSectionRef = useRef(null);
  const movieWrapperRef = useRef(null);
  const moviePosterRef = useRef(null);
  const movieVideoRef = useRef(null);
  const movieOverlayRef = useRef(null);
  const movieBtnRef = useRef(null);

  // ナビゲーションの開閉
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  // モーダルの開閉
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // GSAP Animation Setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // フェードインアニメーション（共通）
      const fadeElements = document.querySelectorAll('.fade-in-up');
      fadeElements.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // Movie Section Animation (Aperture Effect)
      if (movieSectionRef.current && movieWrapperRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: movieSectionRef.current,
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          }
        });

        // 初期状態の設定
        gsap.set([moviePosterRef.current, movieVideoRef.current], { 
          scale: 1.1, 
          transformOrigin: "center center" 
        });
        gsap.set(movieOverlayRef.current, { 
          backgroundColor: "rgba(0,0,0,0.6)", 
          opacity: 0, 
          autoAlpha: 0 
        });
        gsap.set(movieBtnRef.current, { 
          opacity: 0, 
          autoAlpha: 0,
          xPercent: -50,
          yPercent: -50,
          top: "50%",
          left: "50%"
        });

        tl
          // 1. マスク拡大
          .fromTo(movieWrapperRef.current,
            { clipPath: "inset(15% 10% 15% 10% round 20px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1, ease: "power2.inOut" }
          )
          // 2. ポスターフェードアウト
          .to(moviePosterRef.current, { opacity: 0, duration: 0.1, ease: "power1.inOut" }, "<")
          // 3. 映像スケールダウン
          .to([moviePosterRef.current, movieVideoRef.current], 
            { scale: 1, duration: 1, ease: "power2.inOut" }, 
            "<"
          )
          // 4. オーバーレイとボタン表示
          .to([movieOverlayRef.current, movieBtnRef.current], 
            { opacity: 1, autoAlpha: 1, duration: 0.5, ease: "power2.out" }
          );
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="font-sans text-gray-900 bg-white antialiased selection:bg-black selection:text-white">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm transition-all duration-300 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold tracking-tighter z-50 relative">
            TLiM
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            {['About', 'Service', 'Case', 'News', 'Recruit'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gray-500 transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 p-2 focus:outline-none" 
            onClick={toggleNav}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transition-transform duration-300 ${isNavOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-black transition-opacity duration-300 ${isNavOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-black transition-transform duration-300 ${isNavOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          {['About', 'Service', 'Case', 'News', 'Recruit', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-3xl font-bold tracking-tight hover:text-gray-500"
              onClick={closeNav}
            >
              {item}
            </a>
          ))}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          {/* 背景画像や動画があればここに配置。今回はミニマルなグレー背景 */}
          <div className="w-full h-full bg-gray-50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-6 fade-in-up">
            Turn Life <br className="md:hidden" />
            into <span className="text-gray-400">Meaningful.</span>
          </h1>
          <p className="text-sm md:text-base tracking-[0.2em] text-gray-600 fade-in-up uppercase">
            人生を、意義あるものに。
          </p>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] tracking-widest">SCROLL</span>
          <div className="w-[1px] h-12 bg-black"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
          <div className="fade-in-up">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-2 text-gray-400">About</h2>
            <p className="text-3xl md:text-4xl font-bold leading-tight">
              事業に、<br />意義ある成果を。
            </p>
          </div>
          <div className="space-y-8 text-gray-600 leading-relaxed fade-in-up">
            <p>
              私たちが向き合っているのは、「売上」や「フォロワー数」といった数字だけではありません。
              なぜこの事業をやるのか、誰の人生を支えたいのか。その想いの本質を問い続けます。
            </p>
            <p>
              TLiMは、一過性の流行ではなく、人の心に残り続けるブランドづくりを大切にしています。
              柔軟な視点と誠実な仕事で、クライアントの期待を超え、人生を意義あるものへと変えていきます。
            </p>
          </div>
        </div>
      </section>

      {/* Movie Section (Aperture Effect) */}
      <section ref={movieSectionRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
        <div ref={movieWrapperRef} className="relative w-full h-full z-10 overflow-hidden bg-black">
          
          {/* Poster Layer */}
          <div ref={moviePosterRef} className="absolute inset-0 z-20 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('img/poster.png')" }}>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Video Layer */}
          <div className="absolute inset-0 z-10 w-full h-full">
            <video 
              ref={movieVideoRef}
              className="w-full h-full object-cover"
              muted playsInline loop autoPlay preload="metadata"
            >
              <source src="Video/TLiM_Video_nobgm.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Overlay & Button */}
          <div ref={movieOverlayRef} className="absolute inset-0 z-30 pointer-events-none"></div>
          <button 
            ref={movieBtnRef}
            onClick={openModal}
            className="absolute z-40 px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-sm hover:bg-gray-200 transition-colors rounded-sm"
          >
            View Full Movie
          </button>
        </div>

        {/* Text Overlay (Always visible initially) */}
        <div className="absolute z-50 text-center text-white mix-blend-overlay pointer-events-none px-4">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 opacity-80">Concept Movie</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Emotion driven.<br />Logic backed.
          </h2>
        </div>
      </section>

      {/* Service Section */}
      <section id="service" className="py-24 md:py-32 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 fade-in-up">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-2 text-gray-400">What we do</h2>
            <p className="text-3xl md:text-4xl font-bold">事業内容</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Creative", 
                ja: "クリエイティブ制作", 
                desc: "ブランドの「核」を写真・映像・WEBで表現し、世界観を構築します。",
                tags: ["Photo", "Movie", "Web Design"],
                img: "img/shooting.png"
              },
              { 
                title: "Marketing", 
                ja: "PR・マーケティング", 
                desc: "共感を生むストーリー設計で、インフルエンサーやメディアを通じてアプローチ。",
                tags: ["Influencer", "Event", "Media"],
                img: "img/PRmarketing.png"
              },
              { 
                title: "HR Support", 
                ja: "採用サポート", 
                desc: "「どんな未来をつくりたいか」を届ける採用ブランディングを支援します。",
                tags: ["Branding", "Copywriting", "Movie"],
                img: "img/recruiting.png"
              },
            ].map((service, idx) => (
              <div key={idx} className="group bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 fade-in-up">
                <div className="h-48 mb-6 overflow-hidden rounded-lg bg-gray-100">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{service.title}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{service.ja}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded-md">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SNS Management (Wide) */}
          <div className="mt-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm flex flex-col md:flex-row gap-12 items-center fade-in-up">
            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden rounded-xl bg-gray-100">
              <img src="img/SNSmanagement.png" alt="SNS Management" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Social Media</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">SNS運用代行事業</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                SNSは集客ツールである前に、人格がにじみ出るメディアです。短期的なバズだけでなく、信頼が蓄積されるアカウント設計を行います。
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] md:text-xs font-medium text-gray-500">
                {['企画設計', '撮影・編集', '運用代行', '分析・改善'].map((step, i) => (
                  <div key={i} className="relative">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center text-blue-600 font-bold">0{i+1}</div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-16 fade-in-up">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-2 text-gray-400">Expertise</h2>
          <p className="text-3xl md:text-4xl font-bold">専門領域</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { en: "Food", ja: "飲食", img: "img/food.png" },
            { en: "Beauty", ja: "美容", img: "img/beauty.png" },
            { en: "Apparel", ja: "アパレル", img: "img/apparel .png" }, // space in filename preserved
            { en: "Medical", ja: "医療", img: "img/Medical.png" },
          ].map((field, idx) => (
            <a key={idx} href="#" className="group relative h-80 overflow-hidden rounded-xl fade-in-up">
              <img src={field.img} alt={field.en} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="text-xs font-light tracking-wider opacity-80">{field.en}</span>
                <p className="text-xl font-bold mt-1">{field.ja}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Case Section */}
      <section id="case" className="py-24 md:py-32 px-4 md:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 fade-in-up">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-2 text-gray-500">Case Study</h2>
            <p className="text-3xl md:text-4xl font-bold">実績紹介</p>
          </div>
          
          <div className="space-y-16">
            {[1, 2].map((item) => (
              <div key={item} className="flex flex-col md:flex-row gap-8 md:gap-16 items-center fade-in-up">
                <div className="w-full md:w-1/2 aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <img src={item === 1 ? "img/SASAYA.png" : "img/Spiceworks.png"} alt="Case" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-xs text-gray-400 mb-4 tracking-wider">Branding / Recruitment / SNS</p>
                  <h3 className="text-2xl font-bold mb-4">SASAYA Holdings<br/>集客・採用マーケティング</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    企画・投稿・分析・改善まで一貫で運用。集客、採用、通販と連携し、ファンが自然に増える設計を構築しました。
                  </p>
                  <a href="#" className="inline-block mt-6 text-sm border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors">View Detail</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-24 md:py-32 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-12 fade-in-up">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-2 text-gray-400">News</h2>
            <p className="text-3xl font-bold">ニュース</p>
          </div>
          <a href="#" className="text-sm font-bold border-b border-black pb-1">View All</a>
        </div>

        <ul className="space-y-6">
          {[1, 2, 3, 4].map((item, idx) => (
            <li key={idx} className="border-b border-gray-100 pb-6 fade-in-up">
              <a href="#" className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 hover:opacity-70 transition-opacity">
                <time className="text-xs text-gray-400 font-mono">2025.12.15</time>
                <span className={`text-[10px] px-2 py-0.5 rounded border w-fit ${idx % 2 === 0 ? 'border-blue-200 text-blue-600' : 'border-gray-200 text-gray-500'}`}>
                  {idx % 2 === 0 ? 'お知らせ' : 'プレスリリース'}
                </span>
                <p className="text-sm md:text-base font-medium">オフィシャルウェブサイトを公開しました。</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Promo (Company/Recruit) */}
      <section className="grid md:grid-cols-2 h-[50vh] md:h-[60vh]">
        <a href="company.html" className="group relative overflow-hidden block">
          <img src="img/TLiMcompany.png" alt="Company" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold mb-2">Company</h3>
            <p className="text-sm opacity-80">会社情報</p>
          </div>
        </a>
        <a href="recruit.html" className="group relative overflow-hidden block">
          <img src="img/Companybanner.png" alt="Recruit" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-bold mb-2">Recruit</h3>
            <p className="text-sm opacity-80">私たちと働きませんか？</p>
          </div>
        </a>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 bg-white text-center">
        <a href="contact.html" className="inline-block text-5xl md:text-7xl font-bold tracking-tighter hover:text-gray-500 transition-colors fade-in-up">
          CONTACT US.
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 pt-16 pb-8 px-4 md:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">TLiM</h2>
            <p className="text-xs text-gray-500 tracking-widest">Turn Life into Meaningful.</p>
            <div className="flex gap-4 pt-2">
              {/* SVG Icons */}
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-bold mb-4">Menu</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#about" className="hover:text-black">About</a></li>
                <li><a href="#service" className="hover:text-black">Service</a></li>
                <li><a href="#case" className="hover:text-black">Case</a></li>
                <li><a href="#news" className="hover:text-black">News</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">Creative</a></li>
                <li><a href="#" className="hover:text-black">Marketing</a></li>
                <li><a href="#" className="hover:text-black">HR Support</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold mb-4">Expertise</h4>
              <p className="text-gray-600 leading-relaxed">
                Food & Beverage / Beauty / Apparel / Medical
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} TLiM Inc. All Rights Reserved.
        </div>
      </footer>

      {/* Full Movie Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl">
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
            <video 
              className="w-full h-auto max-h-[80vh] shadow-2xl"
              controls autoPlay
              src="Video/TLiM_TOPVideo_short.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

    </div>
  );
}