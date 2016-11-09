/**
 * DEVICE INFO:
 * This module provides information about the device (OS, browser, etc)
 * @module lib/deviceInfo
 */
const userAgent = window.navigator ? (window.navigator.userAgent || '') : '';
let _cacheViewport; // Whether you want to automatically cache the viewport to prevent redraws
let _isTouchDevice;
let _viewportWidth;
let _isMobile;
let _isIpad;
let _isAndroid;
let _isChromeiOS;

/**
 * Immediately caches the values, instead of waiting for them to be asked for.
 * Also adds corresponding classes to the html element
 * @param {object} [options]
 * @param {boolean} [options.cacheViewport] - Whether the viewport dimensions should be cached automatically on resize.
 */
export function init(options = {}) {
  parseConfig(options);
  onResize();
  const touchDevice = isTouchDevice();

  if (touchDevice) {
    $('html').addClass('touch-device');
  }

  if (options.cacheViewport) {
    onResize();
    window.addEventListener('optimizedResize', onResize);
  }
}

/**
 * Returns the width of the viewport.
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
  if (_isTouchDevice != null) {
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
 * Returns true if the device is a mobile device
 */
export function isMobile() {
  if (_isMobile != null) return _isMobile;
  return (_isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4))); // eslint-disable-line max-len
}

/**
 * Returns true if the device is an iPad
 */
export function isIpad() {
  if (_isIpad != null) return _isIpad;
  return (_isIpad = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1);
}

/**
 * Returns true if the device is using Android
 */
export function isAndroid() {
  if (_isAndroid != null) return _isAndroid;
  return (_isAndroid = navigator.userAgent.toLowerCase().indexOf('android') !== -1);
}

/**
 * Returns true if the device is using Chrome on iOS
 */
export function isChromeiOS() {
  if (_isChromeiOS != null) return _isChromeiOS;
  return (_isChromeiOS = navigator.userAgent.match('CriOS'));
}

/*
 * Returns the IE version, or false if not IE
 * Source: https://codepen.io/gapcode/pen/vEJNZN
 */
export function isIE() {
  const msie = userAgent.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10);
  }

  const trident = userAgent.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    const rv = userAgent.indexOf('rv:');
    return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10);
  }

  const edge = userAgent.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(userAgent.substring(edge + 5, userAgent.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

/**
 * Called by the window resize event, updates viewport information
 */
function onResize() {
  _viewportWidth = $(window).width();
}

function parseConfig(options) {
  _cacheViewport = options.cacheViewport || false;
  _isTouchDevice = null;
  _viewportWidth = null;
  _isMobile = null;
  _isIpad = null;
  _isAndroid = null;
  _isChromeiOS = null;
}
