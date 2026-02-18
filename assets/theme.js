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

  // Big statement carousel (prev/next, dots, optional progress bar + auto-advance)
  function initBigStatementCarousel() {
    document.querySelectorAll('[data-big-statement]').forEach(function (sectionEl) {
      var trackInner = sectionEl.querySelector('.big-statement-track-inner');
      var prevBtn = sectionEl.querySelector('.big-statement-prev');
      var nextBtn = sectionEl.querySelector('.big-statement-next');
      var dots = sectionEl.querySelectorAll('.big-statement-dot');
      if (!trackInner || !dots.length) return;

      var total = dots.length;
      var index = 0;
      var progressTimer = null;
      var duration = 6000;

      function goTo(i) {
        index = ((i % total) + total) % total;
        var pct = total > 0 ? (100 / total) * index : 0;
        trackInner.style.transform = 'translateX(-' + pct + '%)';

        dots.forEach(function (dot, j) {
          var isActive = j === index;
          var progress = dot.querySelector('.big-statement-progress');
          dot.setAttribute('aria-current', isActive ? 'true' : 'false');
          dot.style.width = isActive ? '2rem' : '0.5rem';
          dot.style.backgroundColor = isActive ? 'white' : 'rgba(255,255,255,0.2)';
          if (progress) {
            progress.style.transform = 'scaleX(0)';
            progress.style.transition = 'none';
          }
        });

        if (progressTimer) clearInterval(progressTimer);
        var activeDot = dots[index];
        var activeProgress = activeDot ? activeDot.querySelector('.big-statement-progress') : null;
        if (activeProgress) {
          var start = Date.now();
          progressTimer = setInterval(function () {
            var elapsed = Date.now() - start;
            var x = Math.min(1, elapsed / duration);
            activeProgress.style.transform = 'scaleX(' + x + ')';
            if (x >= 1) {
              clearInterval(progressTimer);
              progressTimer = null;
              goTo(index + 1);
            }
          }, 50);
        }
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

  // Brutal Stack: service bundle selector, discount pills, Your Bundle summary, ROI calculator
  function initBrutalStack() {
    document.querySelectorAll('[data-brutal-stack]').forEach(function (sectionEl) {
      var tiersJson = sectionEl.getAttribute('data-discount-tiers');
      var tiers = tiersJson ? JSON.parse(tiersJson) : { 2: 20, 3: 35, 4: 50, 5: 60, 6: 70 };
      var services = sectionEl.querySelectorAll('.brutal-stack-service');
      var selectAllBtn = sectionEl.querySelector('.brutal-stack-select-all');
      var placeholder = sectionEl.querySelector('.brutal-stack-bundle-placeholder');
      var bundleContent = sectionEl.querySelector('.brutal-stack-bundle-content');
      var bundleItems = sectionEl.querySelector('.brutal-stack-bundle-items');
      var revenueInput = sectionEl.querySelector('.brutal-stack-revenue');
      var roiItems = sectionEl.querySelector('.brutal-stack-roi-items');
      var pills = sectionEl.querySelectorAll('.brutal-stack-pill');

      function fmt(n) {
        return '$' + Math.round(n).toLocaleString();
      }

      function getSelected() {
        var list = [];
        services.forEach(function (btn) {
          if (btn.getAttribute('data-selected') === 'true') {
            list.push({
              title: btn.getAttribute('data-title') || '',
              price: parseFloat(btn.getAttribute('data-price')) || 0,
              roi: parseFloat(btn.getAttribute('data-roi')) || 0
            });
          }
        });
        return list;
      }

      function getDiscountPct(count) {
        if (count < 2) return 0;
        var pct = tiers[String(count)];
        return typeof pct === 'number' ? pct : 0;
      }

      function refreshPills() {
        var count = getSelected().length;
        pills.forEach(function (pill) {
          var pillCount = parseInt(pill.getAttribute('data-count'), 10);
          var isActive = pillCount === count && count >= 2;
          pill.classList.toggle('bg-green-500', isActive);
          pill.classList.toggle('text-white', isActive);
          pill.classList.toggle('bg-white/[0.03]', !isActive);
          pill.classList.toggle('text-white/40', !isActive);
          pill.classList.toggle('border', !isActive);
          pill.classList.toggle('border-white/10', !isActive);
        });
      }

      function refreshBundle() {
        var selected = getSelected();
        if (selected.length === 0) {
          if (placeholder) placeholder.classList.remove('hidden');
          if (bundleContent) bundleContent.classList.add('hidden');
          return;
        }
        if (placeholder) placeholder.classList.add('hidden');
        if (bundleContent) bundleContent.classList.remove('hidden');
        var subtotal = selected.reduce(function (sum, s) { return sum + s.price; }, 0);
        var discountPct = getDiscountPct(selected.length);
        var discountAmount = subtotal * (discountPct / 100);
        var total = subtotal - discountAmount;

        if (bundleItems) {
          bundleItems.innerHTML = selected.map(function (s) {
            return '<div class="flex justify-between text-sm"><span class="text-white/60">' + escapeHtml(s.title) + '</span><span class="text-white/40">' + fmt(s.price) + '</span></div>';
          }).join('');
        }
        var subtotalEl = sectionEl.querySelector('.brutal-stack-subtotal');
        var pctEl = sectionEl.querySelector('.brutal-stack-discount-pct');
        var amountEl = sectionEl.querySelector('.brutal-stack-discount-amount');
        var totalEl = sectionEl.querySelector('.brutal-stack-total');
        var savingsEl = sectionEl.querySelector('.brutal-stack-savings');
        if (subtotalEl) subtotalEl.textContent = fmt(subtotal);
        if (pctEl) pctEl.textContent = discountPct;
        if (amountEl) amountEl.textContent = '-' + fmt(discountAmount);
        if (totalEl) totalEl.textContent = fmt(total);
        if (savingsEl) savingsEl.textContent = 'You save ' + fmt(discountAmount);
      }

      function refreshROI() {
        var selected = getSelected();
        var revenue = parseFloat(revenueInput && revenueInput.value) || 0;
        var totalRoi = selected.reduce(function (sum, s) { return sum + s.roi; }, 0);
        var increase = revenue * (totalRoi / 100);

        if (roiItems) {
          roiItems.innerHTML = selected.map(function (s) {
            return '<div class="flex justify-between p-3 bg-black/5 rounded"><span class="text-black/60 text-sm">' + escapeHtml(s.title) + '</span><span class="text-black font-medium">+' + s.roi + '%</span></div>';
          }).join('');
        }
        var increaseEl = sectionEl.querySelector('.brutal-stack-increase');
        var totalRoiEl = sectionEl.querySelector('.brutal-stack-roi-total');
        if (increaseEl) increaseEl.textContent = '+' + fmt(increase);
        if (totalRoiEl) totalRoiEl.textContent = 'Total ROI boost: +' + totalRoi + '%';
      }

      function escapeHtml(s) {
        var div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
      }

      function toggleService(btn) {
        var on = btn.getAttribute('data-selected') !== 'true';
        btn.setAttribute('data-selected', on ? 'true' : 'false');
        var check = btn.querySelector('.brutal-stack-check');
        var title = btn.querySelector('.brutal-stack-title');
        var price = btn.querySelector('.brutal-stack-price');
        if (on) {
          btn.classList.remove('border-white/[0.05]', 'bg-white/[0.02]');
          btn.classList.add('border-white/30', 'bg-white/[0.05]');
          if (check) {
            check.classList.remove('bg-white/10');
            check.classList.add('bg-white');
            var svg = check.querySelector('svg');
            if (svg) svg.classList.remove('hidden');
          }
          if (title) title.classList.remove('text-white/70'), title.classList.add('text-white');
          if (price) price.classList.remove('text-white/50'), price.classList.add('text-white');
        } else {
          btn.classList.add('border-white/[0.05]', 'bg-white/[0.02]');
          btn.classList.remove('border-white/30', 'bg-white/[0.05]');
          if (check) {
            check.classList.add('bg-white/10');
            check.classList.remove('bg-white');
            var svg = check.querySelector('svg');
            if (svg) svg.classList.add('hidden');
          }
          if (title) title.classList.add('text-white/70'), title.classList.remove('text-white');
          if (price) price.classList.add('text-white/50'), price.classList.remove('text-white');
        }
        refreshBundle();
        refreshPills();
        refreshROI();
      }

      services.forEach(function (btn) {
        btn.addEventListener('click', function () { toggleService(btn); });
      });

      if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function () {
          var selectedCount = getSelected().length;
          var targetOn = selectedCount !== services.length;
          services.forEach(function (btn) {
            var currentlyOn = btn.getAttribute('data-selected') === 'true';
            if (currentlyOn !== targetOn) toggleService(btn);
          });
        });
      }

      if (revenueInput) revenueInput.addEventListener('input', refreshROI);

      refreshPills();
      refreshROI();
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

  // Add to cart: intercept form submit, POST via fetch, open cart drawer and refresh
  function initAddToCart() {
    document.addEventListener('submit', function (e) {
      var form = e.target;
      if (form.method && form.method.toLowerCase() === 'post' && form.action && form.action.indexOf('/cart/add') !== -1) {
        e.preventDefault();
        var formData = new FormData(form);
        fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
        })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data.status && data.status === 422) {
              if (data.description) alert(data.description);
              return;
            }
            if (typeof window.fetchCartDrawer === 'function') window.fetchCartDrawer();
            if (typeof window.openCartDrawer === 'function') window.openCartDrawer();
          })
          .catch(function () {
            form.submit();
          });
      }
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
      initBigStatementCarousel();
      initBrutalStack();
      initUrgencyCountdown();
      initNavDropdowns();
      initHeaderScroll();
      initAddToCart();
    });
  } else {
    initDrawer();
    initScrollIndicator();
    initSectionReveal();
    initTestimonialCarousel();
    initBigStatementCarousel();
    initBrutalStack();
    initUrgencyCountdown();
    initNavDropdowns();
    initHeaderScroll();
    initAddToCart();
  }
})();
