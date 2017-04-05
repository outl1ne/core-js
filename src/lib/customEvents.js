/**
 * CUSTOM EVENTS:
 * Creates custom events that the browser doesn't support or has an inconvenient syntax. Currently contains:
 * - focusChange (evt.detail: true|false (focused or unfocused))
 *
 * @module lib/optimizedEvents
 */

export function init(opts = {}) {
  initFocusChange(opts);
}

function initFocusChange() {
  const browserPrefixes = ['moz', 'ms', 'o', 'webkit'];
  const browserPrefix = browserPrefixes.find(prefix => `${prefix}Hidden` in document) ||
                                            ('hidden' in document ? '' : null);

  if (browserPrefix !== null) {
    document.addEventListener(`${browserPrefix}visibilitychange`, () => {
      if (document[(browserPrefix === '' ? 'hidden' : `${browserPrefix}Hidden`)]) {
        dispatchFocusChangeEvent(false);
      } else {
        dispatchFocusChangeEvent(true);
      }
    });
  } else {
    window.addEventListener('blur', () => {
      dispatchFocusChangeEvent(false);
    });
    window.addEventListener('focus', () => {
      dispatchFocusChangeEvent(true);
    });
  }
}

function dispatchFocusChangeEvent(status) {
  window.dispatchEvent(
    new CustomEvent('focusChange', { detail: status })
  );
}
