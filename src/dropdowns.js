export default {
  init,
};

function init() {
  document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
    initDropdown(dropdown);
  });
}

function initDropdown(dropdown) {
  dropdown.querySelector('[data-toggle-dropdown]').addEventListener('click', () => toggleDropdown(dropdown));

  onOutsideClick(dropdown, () => closeDropdown(dropdown));

  window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      closeDropdown(dropdown);
    }
  });
}

function toggleDropdown(dropdown) {
  dropdown.querySelector('[data-dropdown-content]').classList.toggle('is-active');
}

function closeDropdown(dropdown) {
  dropdown.querySelector('[data-dropdown-content]').classList.remove('is-active');
}

/**
 * https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
//  */
function onOutsideClick(dropdown, callback) {
  const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length); // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js

  const outsideClickListener = event => {
    if (!dropdown.contains(event.target) && isVisible(dropdown)) {
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
