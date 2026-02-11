<?php
if (!defined('ABSPATH')) {
    exit;
}

$meta = isset($GLOBALS['tlim_meta']) && is_array($GLOBALS['tlim_meta']) ? $GLOBALS['tlim_meta'] : array();
$title = $meta['title'] ?? 'TLiM | Branding & Creative Firm - Turn Life into Meaningful';
$description = $meta['description'] ?? '株式会社TLiMの公式サイト。';
$canonical = $meta['canonical'] ?? home_url('/');
$og_image = $meta['og_image'] ?? home_url('/img/ogp.png');

$home_url = home_url('/');
$about_url = tlim_page_or_file_url('about', 'about.html');
$service_list_url = tlim_page_or_file_url('service-list', 'service-list.html');
$professional_list_url = tlim_page_or_file_url('professional-list', 'professional-list.html');
$case_list_url = tlim_page_or_file_url('case-list', 'case-list.html');
$news_list_url = tlim_page_or_file_url('news-list', 'news-list.html');
$company_url = tlim_page_or_file_url('company', 'company.html');
$recruit_url = tlim_page_or_file_url('recruit', 'recruit.html');
$contact_url = tlim_page_or_file_url('contact', 'contact.html');
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title><?php echo esc_html($title); ?></title>
<meta name="description" content="<?php echo esc_attr($description); ?>">
<link rel="canonical" href="<?php echo esc_url($canonical); ?>">
<meta property="og:title" content="<?php echo esc_attr($title); ?>">
<meta property="og:description" content="<?php echo esc_attr($description); ?>">
<meta property="og:type" content="website">
<meta property="og:url" content="<?php echo esc_url($canonical); ?>">
<meta property="og:image" content="<?php echo esc_url($og_image); ?>">
<meta property="og:site_name" content="TLiM">
<meta property="og:locale" content="ja_JP">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?php echo esc_attr($title); ?>">
<meta name="twitter:description" content="<?php echo esc_attr($description); ?>">
<meta name="twitter:image" content="<?php echo esc_url($og_image); ?>">
<meta name="format-detection" content="telephone=no">
<base href="<?php echo esc_url($home_url); ?>">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['"Noto Sans JP"', 'sans-serif'],
          serif: ['"Playfair Display"', 'serif'],
          eng: ['"Manrope"', 'sans-serif'],
          mono: ['"Space Mono"', 'monospace'],
        },
        colors: {
          black: '#050505',
          dark: '#0A0A0A',
          food: '#C4A878',
          beauty: '#E8DCCA',
          apparel: '#C0C0C0',
          medical: '#00E5FF',
        },
        backgroundImage: {
          marquee: 'marquee 55s linear infinite',
          'grid-pattern': "linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)",
          'noise': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJnoiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2cpIiBvcGFjaXR5PSIwLjAzIi8+PC9zdmc+')",
        },
        animation: {
          marquee: 'marquee 55s linear infinite',
          'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'spotlight': 'spotlight 10s ease-in-out infinite alternate',
          'scan': 'scan 4s linear infinite',
        },
        keyframes: {
          marquee: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          spotlight: {
            '0%': { opacity: 0.3, transform: 'scale(1) translate(0,0)' },
            '100%': { opacity: 0.6, transform: 'scale(1.2) translate(20px, -20px)' },
          },
          scan: {
            '0%': { top: '0%', opacity: 0 },
            '10%': { opacity: 1 },
            '90%': { opacity: 1 },
            '100%': { top: '100%', opacity: 0 },
          }
        }
      }
    }
  }
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Manrope:wght@300;500;600;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<?php wp_head(); ?>
</head>
<body <?php body_class('font-sans text-white antialiased bg-black'); ?>>
<?php wp_body_open(); ?>
<header class="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 transition-all duration-300" id="header">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
    <a href="<?php echo esc_url($home_url); ?>" class="flex-shrink-0" aria-label="TLiM Top">
      <img src="<?php echo esc_url(home_url('/img/tlimロゴ.svg')); ?>" alt="TLiM" class="h-6 w-auto sm:h-8 brightness-0 invert">
    </a>

    <nav class="hidden md:flex space-x-8 items-center" aria-label="Global Navigation">
      <ul class="flex space-x-8 text-sm font-medium tracking-wide">
        <li><a href="<?php echo esc_url($about_url); ?>" class="hover:text-gray-400 transition-colors">About</a></li>
        <li><a href="<?php echo esc_url($service_list_url); ?>" class="hover:text-gray-400 transition-colors">Service</a></li>
        <li><a href="<?php echo esc_url($professional_list_url); ?>" class="hover:text-gray-400 transition-colors">Professional</a></li>
        <li><a href="<?php echo esc_url($case_list_url); ?>" class="hover:text-gray-400 transition-colors">Case</a></li>
        <li><a href="<?php echo esc_url($news_list_url); ?>" class="hover:text-gray-400 transition-colors">News</a></li>
        <li><a href="<?php echo esc_url($company_url); ?>" class="hover:text-gray-400 transition-colors">Company</a></li>
        <li><a href="<?php echo esc_url($recruit_url); ?>" class="hover:text-gray-400 transition-colors">Recruit</a></li>
        <li><a href="<?php echo esc_url($contact_url); ?>" class="bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-colors">Contact</a></li>
      </ul>
    </nav>

    <button class="md:hidden p-2 -mr-2 text-white focus:outline-none" id="js-nav-toggle" aria-label="Menu" aria-expanded="false">
      <div class="w-6 h-5 flex flex-col justify-between">
        <span class="block w-full h-0.5 bg-current transition-all duration-300 origin-center"></span>
        <span class="block w-full h-0.5 bg-current transition-all duration-300"></span>
        <span class="block w-full h-0.5 bg-current transition-all duration-300 origin-center"></span>
      </div>
    </button>
  </div>
</header>

<div class="fixed inset-0 z-40 bg-black transition-opacity duration-300 opacity-0 pointer-events-none md:hidden pt-20 px-6" id="js-mobile-nav" aria-hidden="true">
  <div class="h-full overflow-y-auto">
    <ul class="flex flex-col space-y-6 text-xl font-bold">
      <li><a href="<?php echo esc_url($about_url); ?>" class="js-nav-link block py-2 border-b border-gray-800">About</a></li>
      <li><a href="<?php echo esc_url($service_list_url); ?>" class="js-nav-link block py-2 border-b border-gray-800">Service</a></li>
      <li><a href="<?php echo esc_url($professional_list_url); ?>" class="js-nav-link block py-2 border-b border-gray-800">Professional</a></li>
      <li><a href="<?php echo esc_url($case_list_url); ?>" class="js-nav-link block py-2 border-b border-gray-800">Case</a></li>
      <li><a href="<?php echo esc_url($news_list_url); ?>" class="js-nav-link block py-2 border-b border-gray-800">News</a></li>
      <li><a href="<?php echo esc_url($company_url); ?>" class="js-nav-link block py-2 border-b border-gray-800">Company</a></li>
      <li><a href="<?php echo esc_url($recruit_url); ?>" class="js-nav-link block py-2 border-b border-gray-800">Recruit</a></li>
      <li><a href="<?php echo esc_url($contact_url); ?>" class="js-nav-link block py-2 border-b border-gray-800 text-gray-400">Contact</a></li>
    </ul>
  </div>
</div>
