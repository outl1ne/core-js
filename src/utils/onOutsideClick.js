import isVisible from './isVisible';

/**
 * https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
 */
export default function onOutsideClick(el, callback) {
  const outsideClickListener = event => {
    if (!el.contains(event.target) && isVisible(el)) {
      // or use: event.target.closest(selector) === null
      callback();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
  };

  document.addEventListener('click', outsideClickListener);

  return removeClickListener;
}
