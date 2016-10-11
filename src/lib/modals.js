/**
 * MODALS:
 * Allows you to control whether an element should be shown by clicking buttons with a corresponding data attribute.
 * NOTE: This doesn't change any visual style itself. You have to use CSS to change the element's visibility.
 *
 * Functionality:
 * - When the user presses escape, all modals will be closed (unless they have data-close-on-esc="false")
 * - Custom events get dispatched when a modal is opened/closed:
 *   window.addEventListener('modal:opened', (evt) => { console.log(evt.detail.$modal, evt.detail.name) }
 *   window.addEventListener('modal:closed', (evt) => { console.log(evt.detail.$modal, evt.detail.name) }
 *
 * Example of usage:
 *  <button data-modal-toggler="demo-modal">Click to toggle modal</button>
 *  <div data-modal="demo-modal" data-modal-open="false" class="basic-modal">
 *    <p>Modal content</p>
 *    <button data-modal-closer="demo-modal">Click to close modal</button>
 *  </div>
 *
 * @module lib/modals
 */

let containerAttribute;
let togglerAttribute;
let closerAttribute;
let openerAttribute;
let openAttribute;
let closeOnEscAttribute;
/**
 * Starts listening to click and key events, adds initial attributes if missing
 * @param {object} [options={}]
 * @param {string} [options.containerAttribute='data-modal'] - Attr. for the modal container that will contain the modal's name
 * @param {string} [options.togglerAttribute='data-modal-toggler'] - Attr. that contains a modal's name and will toggle that modal when clicked
 * @param {string} [options.closerAttribute='data-modal-closer'] - Attr. that contains a modal's name and will close that modal when clicked
 * @param {string} [options.openerAttribute='data-modal-opener'] - Attr. that contains a modal's name and will open that modal when clicked
 * @param {string} [options.openAttribute='data-modal-open'] - Attr. that determines whether the modal is open or not.
 * @param {string} [options.closeOnEscAttribute='data-close-on-esc'] - Attr. that determines whether the modal should close when the escape key is pressed. (Missing value is treated as true)
 */
export function init(options = {}) {
  parseOptions(options);
  initializeOpenAttributes();

  // Modal opener listeners
  $(`[${togglerAttribute}]`).on('click', togglerClick);
  $(`[${openerAttribute}]`).on('click', openerClick);
  $(`[${closerAttribute}]`).on('click', closerClick);
  $(document).on('keydown', onKeyPress);
}

/**
 * Sets variables based on options object, or defaults. This should only be called from the constructor.
 * @param {object} [options]
 */
function parseOptions(options) {
  containerAttribute = options.containerAttribute || 'data-modal';
  togglerAttribute = options.togglerAttribute || 'data-modal-toggler';
  closerAttribute = options.closerAttribute || 'data-modal-closer';
  openerAttribute = options.openerAttribute || 'data-modal-opener';
  openAttribute = options.openAttribute || 'data-modal-open';
  closeOnEscAttribute = options.closeOnOutsideAttribute || 'data-close-on-esc';
}

/**
 * Closes all modals on the page
 */
export function closeAllModals() {
  $(`[${containerAttribute}]`).each(function closeModalsIterator() {
    closeModal($(this));
  });
}

/**
 * Toggles the modal's open attribute
 * @param  {object|string} modal   Name or jQuery element of the modal to be toggled. If the argument is a string, it will be interpreted as the modal's name. Otherwise, it will be interpreted as a jQuery element
 */
export function toggleModal(modal) {
  const $modal = typeof modal === 'string' ? $(`[${containerAttribute}="${modal}"]`) : modal;
  const isOpen = $modal.attr(openAttribute) === 'true';
  if (isOpen) {
    closeModal($modal);
  } else {
    openModal($modal);
  }
}

/**
 * Sets the modal's open attribute to true
 * @param  {object|string} modal   Name or jQuery element of the modal to be toggled. If the argument is a string, it will be interpreted as the modal's name. Otherwise, it will be interpreted as a jQuery element
 */
export function openModal(modal) {
  const $modal = typeof modal === 'string' ? $(`[${containerAttribute}="${modal}"]`) : modal;
  const name = $modal.attr(containerAttribute);
  $modal.attr(openAttribute, true);
  window.dispatchEvent(new CustomEvent('modal:opened', { detail: { $modal, name } }));
}

/**
 * Sets the modal's open attribute to false
 * @param  {object|string} modal   Name or jQuery element of the modal to be toggled. If the argument is a string, it will be interpreted as the modal's name. Otherwise, it will be interpreted as a jQuery element
 */
export function closeModal(modal) {
  const $modal = typeof modal === 'string' ? $(`[${containerAttribute}="${modal}"]`) : modal;
  const name = $modal.attr(containerAttribute);
  $modal.attr(openAttribute, false);
  window.dispatchEvent(new CustomEvent('modal:closed', { detail: { $modal, name } }));
}

/**
 * jQuery event handler that finds the name of the toggler's corresponding modal and toggles it
 */
function togglerClick() {
  const name = $(this).attr(togglerAttribute);
  const $modal = $(`[${containerAttribute}="${name}"]`);
  toggleModal($modal, name);
}

/**
 * jQuery event handler that finds the name of the toggler's corresponding modal and opens it
 */
function openerClick() {
  const name = $(this).attr(openerAttribute);
  const $modal = $(`[${containerAttribute}="${name}"]`);
  openModal($modal, name);
}

/**
 * jQuery event handler that finds the name of the toggler's corresponding modal and closes it
 */
function closerClick() {
  const name = $(this).attr(closerAttribute);
  const $modal = $(`[${containerAttribute}="${name}"]`);
  closeModal($modal, name);
}

/**
 * Sets open statuses of all modals to false if they're not already set by the developer
 */
function initializeOpenAttributes() {
  const $modals = $(`[${containerAttribute}]`);

  $modals.each(function initializeModalIterator() {
    const $modal = $(this);
    if ($modal.attr(openAttribute) !== 'true') {
      closeModal($modal);
    }
  });
}

function onKeyPress(evt) {
  if (evt.which === 27) {
    $(`[${containerAttribute}]`).not(`[${closeOnEscAttribute}="false"]`).each(function closeModalsIterator() {
      closeModal($(this));
    });
  }
}
