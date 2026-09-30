/* Case Study Landing (csl-*) — scroll reveal, chapter tracking, statement
   word highlight. Every csl section includes this file; the guard below
   makes repeat includes a no-op. */
(function () {
  if (window.__cslInit) return;
  window.__cslInit = true;

  var doc = document;
  var root = doc.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function init() {
    root.classList.add('csl-ready');

    // Scroll reveal
    var reveal = doc.querySelectorAll('.csl-rv');
    if (!hasIO || reduce) {
      reveal.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
      reveal.forEach(function (el) { io.observe(el); });
    }

    // Chapter table of contents: highlight the chapter in the reading zone
    doc.querySelectorAll('[data-csl-chapters]').forEach(function (section) {
      var links = section.querySelectorAll('.csl-toc a');
      if (!links.length || !hasIO) return;
      var byId = {};
      links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
          var link = byId[e.target.id];
          if (link) { link.classList.add('is-active'); link.setAttribute('aria-current', 'true'); }
        });
      }, { rootMargin: '-35% 0px -55% 0px' });
      section.querySelectorAll('.csl-chapter').forEach(function (c) { spy.observe(c); });
    });

    // Result statement: words light up as it scrolls through the viewport
    var statements = doc.querySelectorAll('[data-csl-words]');
    if (!statements.length) return;
    if (reduce) {
      statements.forEach(function (el) {
        el.querySelectorAll('.w').forEach(function (w) { w.classList.add('on'); });
      });
      return;
    }
    var ticking = false;
    function paint() {
      ticking = false;
      var vh = window.innerHeight || root.clientHeight;
      statements.forEach(function (el) {
        var words = el.__cslWords || (el.__cslWords = el.querySelectorAll('.w'));
        var r = el.getBoundingClientRect();
        var p = (vh * 0.88 - r.top) / (r.height + vh * 0.3);
        p = Math.max(0, Math.min(1, p));
        var lit = Math.round(p * words.length);
        for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i < lit);
      });
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(paint); }
    }, { passive: true });
    window.addEventListener('resize', paint);
    paint();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
