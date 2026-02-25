/* SMS Closer - Theme App Extension JS */

(function () {
  'use strict';

  function initSMSCloser() {
    const buttons = document.querySelectorAll('[data-sms-closer]');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.classList.remove('is-tapped');
        void btn.offsetWidth;
        btn.classList.add('is-tapped');

        if (window.Shopify && window.Shopify.analytics) {
          try {
            window.Shopify.analytics.publish('sms_closer_clicked', {
              url: window.location.href,
            });
          } catch (err) {}
        }
      });

      btn.addEventListener('animationend', function () {
        btn.classList.remove('is-tapped');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSMSCloser);
  } else {
    initSMSCloser();
  }

  document.addEventListener('shopify:section:load', initSMSCloser);
  document.addEventListener('shopify:block:select', initSMSCloser);
})();
