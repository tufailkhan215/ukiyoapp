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

  // Testimonial carousel (prev/next + dots + counter)
  function initTestimonialCarousel() {
    document.querySelectorAll('[data-testimonials-section]').forEach(function (sectionEl) {
      var sectionId = sectionEl.getAttribute('data-testimonials-section');
      var track = sectionEl.querySelector('.testimonial-track');
      var prevBtn = sectionEl.querySelector('.testimonial-prev');
      var nextBtn = sectionEl.querySelector('.testimonial-next');
      var dots = sectionEl.querySelectorAll('.testimonial-dot');
      var currentEl = sectionEl.querySelector('.testimonial-current');
      var totalEl = sectionEl.querySelector('.testimonial-total');
      if (!track || !dots.length) return;

      var total = dots.length;
      var index = 0;

      function pad(n) {
        return (n < 10 ? '0' : '') + n;
      }

      function goTo(i) {
        index = ((i % total) + total) % total;
        var pct = total > 0 ? (100 / total) * index : 0;
        track.style.transform = 'translateX(-' + pct + '%)';

        dots.forEach(function (dot, j) {
          var isActive = j === index;
          dot.setAttribute('aria-current', isActive ? 'true' : 'false');
          dot.style.width = isActive ? '2.5rem' : '';
          dot.style.backgroundColor = isActive ? 'white' : '';
        });

        if (currentEl) currentEl.textContent = pad(index + 1);
      }

      if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); });
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          var i = parseInt(dot.getAttribute('data-index'), 10);
          if (!isNaN(i)) goTo(i);
        });
      });

      goTo(0);
    });
  }

  // Urgency countdown (hours, minutes, seconds)
  function initUrgencyCountdown() {
    document.querySelectorAll('[data-urgency-section][data-countdown-end]').forEach(function (sectionEl) {
      var endStr = sectionEl.getAttribute('data-countdown-end');
      if (!endStr || !endStr.trim()) return;

      var endDate = new Date(endStr.replace(' ', 'T'));
      if (isNaN(endDate.getTime())) return;

      var hoursEl = sectionEl.querySelector('.urgency-hours');
      var minutesEl = sectionEl.querySelector('.urgency-minutes');
      var secondsEl = sectionEl.querySelector('.urgency-seconds');
      if (!hoursEl || !minutesEl || !secondsEl) return;

      function pad(n) {
        n = Math.max(0, Math.floor(n));
        return (n < 10 ? '0' : '') + n;
      }

      function tick() {
        var now = new Date();
        var diff = endDate.getTime() - now.getTime();
        if (diff <= 0) {
          hoursEl.textContent = '00';
          minutesEl.textContent = '00';
          secondsEl.textContent = '00';
          if (sectionEl._urgencyInterval) {
            clearInterval(sectionEl._urgencyInterval);
            sectionEl._urgencyInterval = null;
          }
          return;
        }
        var s = Math.floor(diff / 1000) % 60;
        var m = Math.floor(diff / 60000) % 60;
        var h = Math.floor(diff / 3600000);
        hoursEl.textContent = pad(h);
        minutesEl.textContent = pad(m);
        secondsEl.textContent = pad(s);
      }

      tick();
      sectionEl._urgencyInterval = setInterval(tick, 1000);
    });
  }

  // Nav mega dropdown (hover show/hide, chevron rotate)
  function initNavDropdowns() {
    document.querySelectorAll('[data-dropdown]').forEach(function (dropdown) {
      var trigger = dropdown.querySelector('[data-dropdown-trigger]');
      var panel = dropdown.querySelector('[data-dropdown-panel]');
      var chevron = dropdown.querySelector('.nav-dropdown-chevron');
      if (!trigger || !panel) return;

      function open() {
        panel.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
        panel.classList.add('opacity-100', 'visible');
        panel.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }

      function close() {
        panel.classList.add('opacity-0', 'invisible', 'pointer-events-none');
        panel.classList.remove('opacity-100', 'visible');
        panel.setAttribute('aria-hidden', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        if (chevron) chevron.style.transform = '';
      }

      dropdown.addEventListener('mouseenter', open);
      dropdown.addEventListener('mouseleave', close);
    });
  }

  // Header scroll state (transparent -> solid background)
  function initHeaderScroll() {
    var nav = document.querySelector('.ukiyo-nav');
    if (!nav) return;

    function updateScrolled() {
      if (window.scrollY > 10) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
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
      initTestimonialCarousel();
      initUrgencyCountdown();
      initNavDropdowns();
      initHeaderScroll();
    });
  } else {
    initDrawer();
    initScrollIndicator();
    initSectionReveal();
    initTestimonialCarousel();
    initUrgencyCountdown();
    initNavDropdowns();
    initHeaderScroll();
  }
})();
