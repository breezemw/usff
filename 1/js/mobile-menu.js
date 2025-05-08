function initMobileMenu() {
  const nav = document.querySelector('.nav');
  const logo = document.querySelector('.logo');
  
  if (!nav || !logo) return;
  
  // Toggle menu on logo click for mobile
  if (window.innerWidth <= 768) {
    logo.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        nav.classList.toggle('active');
      }
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !logo.contains(e.target)) {
        nav.classList.remove('active');
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', initMobileMenu);
window.addEventListener('resize', initMobileMenu);
