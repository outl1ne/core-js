/**
 * SMOOTH SCROLL TO ANCHOR:
 * When clicking a link that has a hash corresponding to an element's ID,
 * the viewport will be scrolled to that element smoothly instead of jumping to it instantly.
 * @param  {number} time   The time in milliseconds that it should take for the animation to complete
 * @module lib/smoothScroll
 */

import $ from 'jquery';

export function initSmoothScrollToAnchor(time = 500) {
  $('a[href*="#"]:not([href="#"])').click(function smoothScrollToAnchor(event) {
    event.preventDefault();
    if (window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
      && window.location.hostname === this.hostname) {
      let target = $(this.hash);
      target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, time);
      }
    }
  });
}
