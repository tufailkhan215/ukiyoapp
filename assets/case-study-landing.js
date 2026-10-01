/* Case Study Landing (csl-*) — scroll reveal and the optional chapter index.
   Every csl section includes this file; the guard makes repeat includes a
   no-op. In the theme editor the reveal is switched off in Liquid, and the
   editor's section events re-run setup so edited sections never stay hidden. */
(function () {
  if (window.__cslInit) return;
  window.__cslInit = true;

  var doc = document;
  var root = doc.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;
  var revealer = null;

  function reveal(scope) {
    var items = (scope || doc).querySelectorAll('.csl-rv:not(.is-in)');
    if (!hasIO || reduce || !root.classList.contains('csl-js')) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!revealer) {
      revealer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); revealer.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    }
    items.forEach(function (el) { revealer.observe(el); });
  }

  function chapters(scope) {
    if (!hasIO) return;
    (scope || doc).querySelectorAll('[data-csl-chapters]').forEach(function (section) {
      var links = section.querySelectorAll('.csl-toc a');
      if (!links.length) return;
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
  }

  function init() {
    root.classList.add('csl-ready');
    reveal();
    chapters();
  }

  // Theme editor: a re-rendered section arrives as new markup.
  doc.addEventListener('shopify:section:load', function (e) { reveal(e.target); chapters(e.target); });
  doc.addEventListener('shopify:block:select', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('.csl-rv') : null;
    if (el) el.classList.add('is-in');
  });

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
