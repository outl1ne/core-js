/**
 * DROPDOWNS:
 * Uses data attributes to suggest whether a dropdown should be open or closed.
 * NOTE: This doesn't change any visual style itself. You have to use CSS
 * to implement the hiding of the dropdown. A basic version of this is
 * implemented in the `.basic-dropdown` class (_basic-dropdown.scss)
 *
 * Extra behaviour:
 * - If the user clicks outside of the dropdown, it closes automatically if data-close-on-outside-click is true.
 * - The dropdown content is kept in viewport automatically if the `data-keep-in-view` attribute is present.
 *
 * Example of usage:
 *
 * <div data-dropdown-open="false" data-keep-in-view data-close-on-outside-click class="basic-dropdown">
 *   <button data-dropdown-toggler class="btn-toggle-dropdown">Toggle dropdown</button>
 *   <div data-dropdown class="dropdown-content">
 *     Dropdown content!
 *   </div>
 * </div>
 * @module app/scripts/dropdowns
 */

import { getViewportWidth } from './deviceInfo';

let togglerAttribute;
let keepInViewAttribute;
let containerAttribute;
let contentAttribute;
let closeOnOutsideAttribute;
let $dropdownTogglers;
let $keptInViewOpeners;
let $dropdowns;

/**
 * Adds event listeners
 * @param {object} [options]
 * @param {string} [options.togglerAttribute] - Attr. for child elements that toggle the dropdown on click
 * @param {string} [options.keepInViewAttribute] - Attr. that determines whether the dropdown is kept in viewport automatically
 * @param {string} [options.containerAttribute] - Attr. for the containing element that keeps track of whether or not the dropdown is open
 * @param {string} [options.contentAttribute] - Attr. marking the visible content of the dropdown
 * @param {string} [options.closeOnOutsideAttribute] - Attr. that determines whether the dropdown should close when mouseclick happens on the outside
 */
export function init(options = {}) {
  parseOptions(options);

  $dropdownTogglers = $(`[${togglerAttribute}]`);
  $keptInViewOpeners = $(`[${containerAttribute}][${keepInViewAttribute}]`);
  $dropdowns = $(`[${contentAttribute}]`);

  $dropdowns.on('click', evt => evt.stopPropagation());

  $dropdownTogglers.on('click', evt => {
    evt.stopPropagation();
    const $opener = $(evt.target);
    toggleDropdown($opener.closest(`[${containerAttribute}]`));
  });

  $(window).on('click', closeDropdowns);

  if ($keptInViewOpeners.length > 0) {
    keepInViewport();
    window.addEventListener('optimizedResize', keepInViewport);
  }
}

/**
 * Sets variables based on options object, or defaults. This should only be called from init.
 * @param {object} [options]
 */
function parseOptions(options) {
  togglerAttribute = options.togglerAttribute || 'data-dropdown-toggler';
  keepInViewAttribute = options.keepInViewAttribute || 'data-keep-in-view';
  containerAttribute = options.containerAttribute || 'data-dropdown-open';
  contentAttribute = options.contentAttribute || 'data-dropdown';
  closeOnOutsideAttribute = options.closeOnOutsideAttribute || 'data-close-on-outside-click';
}

/**
 * Toggles the dropdown by changing the container attribute's value to true/false
 * @param  {object} $dropdown   jQuery object corresponding to the dropdown container
 */
function toggleDropdown($dropdown) {
  if ($dropdown.attr(containerAttribute) === 'false') {
    $dropdown.attr(containerAttribute, 'true');
    keepInViewport();
  } else {
    $dropdown.attr(containerAttribute, 'false');
  }
}

/**
 * Keeps all the dropdowns in view that have the keepInViewAttribute
 */
export function keepInViewport() {
  const viewportWidth = getViewportWidth();

  for (let i = 0, len = $keptInViewOpeners.length; i < len; i++) {
    const $opener = $keptInViewOpeners.eq(i);
    const $dropdown = $opener.find(`[${contentAttribute}]`);
    const openerWidth = $opener.width();
    const openerCenter = $opener.offset().left + (openerWidth / 2);
    const dropdownWidth = $dropdown.width();
    const dropdownWidthHalf = dropdownWidth / 2;

    if (openerCenter + dropdownWidthHalf > viewportWidth) { // If dropdown would go past screen to the right
      // Pin to right
      $dropdown.css({
        transform: `translate(${viewportWidth - (openerCenter + dropdownWidthHalf) - dropdownWidthHalf}px, 20px)`
      });
    } else if (openerCenter - dropdownWidthHalf < 0) { // If dropdown would go past screen to the left
      $dropdown.css({
        transform: `translate(${-openerCenter}px, 20px)`
      });
    } else {
      $dropdown.css({
        transform: ``
      });
    }
  }
}

/**
 * Closes all the dropdowns that have the closeOnOutsideAttribute
 */
export function closeDropdowns() {
  $(`[${containerAttribute}][${closeOnOutsideAttribute}]`).attr('data-dropdown-open', 'false');
}
