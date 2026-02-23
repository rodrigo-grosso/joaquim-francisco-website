// ============================================
// Joaquim Francisco - Site JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile Menu Toggle ----
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const menuLabel = document.getElementById('menu-label');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      if (menuIconOpen && menuIconClose) {
        menuIconOpen.style.display = isOpen ? 'none' : 'block';
        menuIconClose.style.display = isOpen ? 'block' : 'none';
      }
      if (menuLabel) {
        menuLabel.textContent = isOpen ? 'Fechar' : 'Menu';
      }
    });

    // Close menu on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        if (menuIconOpen && menuIconClose) {
          menuIconOpen.style.display = 'block';
          menuIconClose.style.display = 'none';
        }
        if (menuLabel) {
          menuLabel.textContent = 'Menu';
        }
      });
    });
  }

  // ---- Contact Form Submission ----
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('success-message');

  if (contactForm && successMsg) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.style.display = 'none';
      successMsg.classList.add('show');
    });

    const resetBtn = successMsg.querySelector('button');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        successMsg.classList.remove('show');
        contactForm.style.display = 'block';
        contactForm.reset();
      });
    }
  }

  // ---- Scroll Animations ----
  const animateElements = document.querySelectorAll('.animate-in');
  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(function (el) {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  // ---- Active nav link ----
  const currentPath = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '');
  document.querySelectorAll('.top-nav-list a, .mobile-nav a').forEach(function (link) {
    const linkPath = link.getAttribute('href').replace(/\/$/, '').replace(/\.html$/, '');
    if (currentPath === linkPath || (currentPath.endsWith(linkPath) && linkPath !== '')) {
      link.classList.add('active');
    }
  });

  // ---- Year in footer ----
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
