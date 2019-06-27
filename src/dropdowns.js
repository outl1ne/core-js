import debounce from 'lodash-es/debounce';
import onOutsideClick from './utils/onOutsideClick';

const SHOULD_KEEP_IN_VIEWPORT = true;

/**
 * Wrapper around the dom node so we can store additional data
 */
class Dropdown {
  constructor(dom) {
    this.dom = dom;
    this.lastTransform = { x: 0, y: 0 };
  }
}

/**
 * Initializes all dropdowns on the page, adding event listeners etc
 */
function init() {
  document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
    initDropdown(new Dropdown(dropdown));
  });
}

/**
 * Initializes a single dropdown
 * @param {HTMLElement} dropdown - dropdown element to initialize
 */
function initDropdown(dropdown) {
  if (!dropdown.dom.dataset.dropdownOpen) {
    dropdown.dom.setAttribute('data-dropdown-open', 'false');
  }
  dropdown.dom.querySelector('[data-toggle-dropdown]').addEventListener('click', () => toggleDropdown(dropdown));

  // Close on outside click

  onOutsideClick(dropdown.dom, () => closeDropdown(dropdown));

  // Close on escape keypress
  window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      closeDropdown(dropdown);
    }
  });

  // Keep in viewport
  if (SHOULD_KEEP_IN_VIEWPORT) {
    window.addEventListener('resize', debounce(() => keepInViewport(dropdown), 100));
  }

  // If the dropdown doesn't have the attribute set by user, set it to closed for consistency
  if (!dropdown.dom.hasAttribute('data-dropdown-open')) closeDropdown(dropdown);
}

/**
 * @param {HTMLElement} dropdown
 * @return {boolean} - whether or not the dropdown is currently open
 */
function isOpen(dropdown) {
  return dropdown.dom.getAttribute('data-dropdown-open') === 'true';
}

/**
 * @param {HTMLElement} dropdown - the dropdown whose opened status will be toggled
 */
function toggleDropdown(dropdown) {
  if (isOpen(dropdown)) {
    closeDropdown(dropdown);
  } else {
    openDropdown(dropdown);
  }
}

/**
 * Opens a dropdown
 * @param {HTMLElement} dropdown - the dropdown that will be opened
 */
function openDropdown(dropdown) {
  dropdown.dom.setAttribute('data-dropdown-open', 'true');

  if (SHOULD_KEEP_IN_VIEWPORT) {
    keepInViewport(dropdown);
  }
}

/**
 * Closes a dropdown
 * @param {HTMLElement} dropdown - the dropdown that will be closed
 */
function closeDropdown(dropdown) {
  dropdown.dom.setAttribute('data-dropdown-open', 'false');
}

/**
 * Tries to ensure that the dropdown stays in the viewport by shifting
 * it to the left/right with transforms, if it would go offscreen
 *
 * @param {HTMLElement} dropdown - the dropdown that will be kept in viewport
 */
function keepInViewport(dropdown) {
  // No point in moving dropdown when it's closed
  if (!isOpen(dropdown)) return;

  const content = dropdown.dom.querySelector('[data-dropdown-content]');
  const transform = getTransform(content, dropdown.lastTransform);
  content.style.transform = `translate(${transform.x}px, ${transform.y}px)`;

  dropdown.lastTransform = transform;
}

/**
 * @param {HTMLElement} Dropdown element
 * @return {{ x: Number, y: Number }} - Object describing how much the element should be transformed to stay on screen
 */
function getTransform(element, lastTransform) {
  const viewportWidth = document.documentElement.clientWidth;
  const rect = element.getBoundingClientRect();
  const elementX = rect.x - lastTransform.x;
  const wouldGoPastScreenToTheRight = elementX + rect.width > viewportWidth;
  const wouldGoPastScreenToTheLeft = elementX < 0;

  if (wouldGoPastScreenToTheLeft) {
    return { x: -elementX, y: 0 };
  } else if (wouldGoPastScreenToTheRight) {
    // Here we add a limiter to prevent the element from being moved offscreen to the left
    const furthestAcceptableLeftShift = elementX < 0 ? elementX : -elementX;
    const desiredLeftShift = viewportWidth - (elementX + rect.width);

    return { x: Math.max(furthestAcceptableLeftShift, desiredLeftShift), y: 0 };
  }

  return { x: 0, y: 0 };
}

export default {
  init,
  openDropdown,
  closeDropdown,
  toggleDropdown,
};
