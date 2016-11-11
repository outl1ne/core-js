/**
 * OPTIMIZED EVENTS:
 * Creates events called "optimizedResize" and "optimizedScroll" that will listen to scroll/resize events,
 * optimized with requestAnimationFrame to prevent them from getting called too much. This helps with
 * performance, but will get called less often than the native scroll/resize events.
 *
 * @module lib/optimizedEvents
 */

export function init(opts) {
  /* Add throttled events */
  throttle('resize', 'optimizedResize', opts.reportViewportSize === true && getViewportDetail);
  throttle('scroll', 'optimizedScroll');

  /* Dispatch optimizedResize on orientation change */
  window.addEventListener('orientationchange', () => {
    window.dispatchEvent(
      new CustomEvent('optimizedResize', { detail: opts.reportViewportSize === true && getViewportDetail() })
    );
  });
}

/**
 * Creates a throttled version of an event
 * @param  {string} originalEvent          Original event to throttle
 * @param  {string} newEvent          Name of the new custom event
 * @param  {?function} getDetail  Optional function that should return an object which will be set as the `event.detail` value. This gets called whenever the custom event is dispatched.
 */
export function throttle(originalEvent, newEvent, getDetail) {
  let running = false;

  window.addEventListener(originalEvent, () => {
    if (running) { return; }

    running = true;

    window.requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent(newEvent, { detail: getDetail && getDetail() }));
      running = false;
    });
  });
}

function getViewportDetail() {
  return {
    width: $(window).width(),
    height: $(window).height()
  }
}
