/**
 * Ukiyo Theme - Theme-safe vanilla JS
 * Menu drawer, smooth scroll, scroll indicator, section reveal
 */
(function () {
  'use strict';

  // Drawer (mobile menu)
  function initDrawer() {
    var menuBtn = document.querySelector('[data-drawer-trigger]');
    var drawer = document.querySelector('[data-drawer]');
    var overlay = document.querySelector('[data-drawer-overlay]');
    var closeBtn = document.querySelector('[data-drawer-close]');

    if (!menuBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Scroll to next section (scroll indicator)
  function initScrollIndicator() {
    var scrollTrigger = document.querySelector('[data-scroll-to-next]');
    if (!scrollTrigger) return;

    scrollTrigger.addEventListener('click', function () {
      var main = document.getElementById('MainContent');
      if (!main) return;
      var firstSection = main.querySelector('section, .section-container');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Section reveal on scroll (Intersection Observer)
  function initSectionReveal() {
    if (typeof window.IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var sections = document.querySelectorAll('[data-reveal]');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: 0 }
    );

    sections.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Header: add background on scroll (match reference)
  function initHeaderScroll() {
    var nav = document.querySelector('.header-nav');
    if (!nav) return;

    function updateHeader() {
      if (window.scrollY > 20) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // Add .is-visible styles for section reveal
  var style = document.createElement('style');
  style.textContent = '[data-reveal].is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initDrawer();
      initScrollIndicator();
      initSectionReveal();
      initHeaderScroll();
    });
  } else {
    initDrawer();
    initScrollIndicator();
    initSectionReveal();
    initHeaderScroll();
  }
})();
