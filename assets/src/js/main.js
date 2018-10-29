/* =====================================================================
 * MAIN JS
 * =====================================================================
 * 1. Open modal
 * 2. Trigger Smooth Scroll
 * ===================================================================*/

(function (doc, win) {
  'use strict';

  /* ---------------------------------------------------------------------
   * 1. Open modal
   * -------------------------------------------------------------------*/

  const btn = doc.querySelector('.trigger-lightbox');
  btn.addEventListener('click', () => new lightbox('#modal'));

  /* ---------------------------------------------------------------------
   * 2. Trigger Smooth Scroll
   * -------------------------------------------------------------------*/

  const scroll = new SmoothScroll();

  const smoothScrollWithoutHash = (selector, settings) => {
    const clickHandler = (event) => {
      const toggle = event.target.closest(selector);
      if (!toggle || toggle.tagName.toLowerCase() !== 'a') return;
      const anchor = doc.querySelector(toggle.hash);
      if (!anchor) return;
      event.preventDefault();
      scroll.animateScroll(anchor, toggle, settings || {});
    };
    win.addEventListener('click', clickHandler, false);
  };

  smoothScrollWithoutHash('.smooth-scroll[href*="#"]');

}(document, window));
