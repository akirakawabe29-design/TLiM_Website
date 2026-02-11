<?php
if (!defined('ABSPATH')) {
    exit;
}

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
<footer class="bg-black text-white py-16 px-6">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
    <div class="space-y-6">
      <a href="<?php echo esc_url($home_url); ?>" aria-label="TLiM Top">
        <img src="<?php echo esc_url(home_url('/img/tlimロゴ.svg')); ?>" alt="TLiM" class="h-6 w-auto sm:h-8 brightness-0 invert">
      </a>
      <p class="text-sm text-gray-400 tracking-wide">Turn Life into Meaningful.</p>

      <div class="flex space-x-4">
        <a href="https://www.instagram.com/tlim.marketing/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
      </div>
    </div>

    <nav>
      <ul class="flex flex-col md:flex-row gap-4 md:gap-8 text-sm font-medium text-gray-300">
        <li><a href="<?php echo esc_url($about_url); ?>" class="hover:text-white transition-colors">About</a></li>
        <li><a href="<?php echo esc_url($service_list_url); ?>" class="hover:text-white transition-colors">Service</a></li>
        <li><a href="<?php echo esc_url($professional_list_url); ?>" class="hover:text-white transition-colors">Professional</a></li>
        <li><a href="<?php echo esc_url($case_list_url); ?>" class="hover:text-white transition-colors">Case</a></li>
        <li><a href="<?php echo esc_url($news_list_url); ?>" class="hover:text-white transition-colors">News</a></li>
        <li><a href="<?php echo esc_url($company_url); ?>" class="hover:text-white transition-colors">Company</a></li>
        <li><a href="<?php echo esc_url($recruit_url); ?>" class="hover:text-white transition-colors">Recruit</a></li>
        <li><a href="<?php echo esc_url($contact_url); ?>" class="hover:text-white transition-colors">Contact</a></li>
      </ul>
    </nav>
  </div>
  <div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center md:text-left">
    <small class="text-xs text-gray-500">&copy; All Rights Reserved TLiM Inc.</small>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
