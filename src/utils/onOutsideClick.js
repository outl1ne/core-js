/**
 * https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
 */
export default function onOutsideClick(el, callback) {
  const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length); // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js

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
