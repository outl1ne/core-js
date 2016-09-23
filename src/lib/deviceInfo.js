/**
 * DEVICE INFO:
 * This module provides information about the device (OS, browser, etc)
 * @module app/scripts/deviceInfo
 */
let _cacheViewport; // Whether you want to automatically cache the viewport to prevent redraws
let _isTouchDevice = null;
let _viewportWidth;

/**
 * Immediately caches the values, instead of waiting for them to be asked for.
 * Also adds corresponding classes to the html element
 * @param {object} [options]
 * @param {boolean} [options.cacheViewport] - Whether the viewport dimensions should be cached automatically on resize.
 */
export function init(options = {}) {
  _cacheViewport = options.cacheViewport || false;
  onResize();
  const $html = $('html');
  const touchDevice = isTouchDevice();

  if (touchDevice) {
    $html.addClass('touch-device');
  }

  if (options.cacheViewport) {
    onResize();
    window.addEventListener('optimizedResize', onResize);
  }
}

/**
 * Returns the width of the viewport. Note that this gets updated on resize - if you
 * don't use anything that depends on the window width (such as dropdown.js),
 * you may want to disable this to slightly improve resize performance
 * @return {number} Cached viewport width
 */
export function getViewportWidth() {
  return _cacheViewport ? (_viewportWidth || $(window).width()) : $(window).width();
}

/**
 * Detects if the device has touch capabilities.
 * NOTE: This does not mean that it doesn't have other capabilities (like mouse),
 * for example laptops with an optional touch screen
* @return {boolean} If the device has touch capabilities
 */
export function isTouchDevice() {
  if (_isTouchDevice) {
    return _isTouchDevice;
  }

  if (typeof navigator === 'undefined') {
    return false;
  }

  return (_isTouchDevice = (('ontouchstart' in window)
    || (navigator.maxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0)));
}

/**
 * Called by the window resize event, updates viewport information
 */
function onResize() {
  _viewportWidth = $(window).width();
}
