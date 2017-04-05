/**
 * MODALS:
 * Allows you to control whether an element should be shown by clicking buttons with a corresponding data attribute.
 * NOTE: This doesn't change any visual style itself. You have to use CSS to change the element's visibility.
 * Examples of usage can be seen in tests or readme.md
 *
 * Functionality:
 * - When the user presses escape, all modals will be closed (unless they have data-close-on-esc="false")
 * - Custom events get dispatched when a modal is opened/closed:
 *   window.addEventListener('modal:opened', (evt) => { console.log(evt.detail.$modal, evt.detail.name) });
 *   window.addEventListener('modal:closed', (evt) => { console.log(evt.detail.$modal, evt.detail.name) });
 *
 * @module lib/modals
 */

import $ from 'jquery';

let containerAttribute;
let togglerAttribute;
let closerAttribute;
let openerAttribute;
let openAttribute;
let closeOnEscAttribute;
let disableGlobalClassAttribute;
let $globalContainer;
let reportOpenModals;

/**
 * Starts listening to click and key events, adds initial attributes if missing
 * @param {object} [options={}]
 * @param {boolean} [options.reportOpenModals=true] - Whether or not the global container should report whether a modal is open or not. You can use this to add overflow: hidden on body when modals are open.
 * @param {string|object} [options.globalContainerSelector='html'] - Selector for the DOM element that will contain information about whether modals are open or not.
 * @param {string} [options.containerAttribute='data-modal'] - Attr. for the modal container that will contain the modal's name
 * @param {string} [options.togglerAttribute='data-modal-toggler'] - Attr. that contains a modal's name and will toggle that modal when clicked
 * @param {string} [options.closerAttribute='data-modal-closer'] - Attr. that contains a modal's name and will close that modal when clicked
 * @param {string} [options.openerAttribute='data-modal-opener'] - Attr. that contains a modal's name and will open that modal when clicked
 * @param {string} [options.openAttribute='data-modal-open'] - Attr. that determines whether the modal is open or not.
 * @param {string} [options.closeOnEscAttribute='data-close-on-esc'] - Attr. that determines whether the modal should close when the escape key is pressed. (Missing value is treated as true)
 * @param {string} [options.disableGlobalClassAttribute='data-disable-global-class'] - Attr. that determines whether the global container should get a class indicating that the modal is open.
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
 * Shuts down the modal logic by clearing all event listeners.
 * Modals stay in their current state.
 */
export function dispose() {
  $(`[${togglerAttribute}]`).off('click', togglerClick);
  $(`[${openerAttribute}]`).off('click', openerClick);
  $(`[${closerAttribute}]`).off('click', closerClick);
  $(document).off('keydown', onKeyPress);
}

/**
 * Sets variables based on options object, or defaults. This should only be called from the constructor.
 * @param {object} [o] Options object (possible values documented in init())
 */
function parseOptions(o) {
  $globalContainer = o.globalContainerSelector != null ? $(o.globalContainerSelector) : $(document.documentElement);
  reportOpenModals = o.reportOpenModals != null ? o.reportOpenModals : true;
  containerAttribute = o.containerAttribute != null ? o.containerAttribute : 'data-modal';
  togglerAttribute = o.togglerAttribute != null ? o.togglerAttribute : 'data-modal-toggler';
  closerAttribute = o.closerAttribute != null ? o.closerAttribute : 'data-modal-closer';
  openerAttribute = o.openerAttribute != null ? o.openerAttribute : 'data-modal-opener';
  openAttribute = o.openAttribute != null ? o.openAttribute : 'data-modal-open';
  closeOnEscAttribute = o.closeOnOutsideAttribute != null ? o.closeOnOutsideAttribute : 'data-close-on-esc';
  disableGlobalClassAttribute = o.disableGlobalClassAttribute != null ? o.disableGlobalClassAttribute : 'data-disable-global-class'; // eslint-disable-line max-len
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
 * @return {boolean}  Whether a modal was toggled or not. If no modal is found, false will be returned.
 */
export function toggleModal(modal) {
  const $modal = getJQueryObject(modal);
  const isOpen = $modal.attr(openAttribute) === 'true';
  if (isOpen) {
    return closeModal($modal);
  }
  return openModal($modal);
}

 /**
  * Sets the modal's open attribute to true
  * @param  {object|string} modal   Name or jQuery element of the modal to be toggled. If the argument is a string, it will be interpreted as the modal's name. Otherwise, it will be interpreted as a jQuery element
  * @return {boolean}  Whether a modal was opened or not. If no modal is found, false will be returned.
  */
export function openModal(modal) {
  const $modal = getJQueryObject(modal);

  if (!$modal || $modal.length === 0 || isModalOpen($modal)) return false;

  if (!setModalOpen($modal)) return false;

  window.dispatchEvent(new CustomEvent('modal:opened', { detail: {
    type: 'modal:opened', $modal, name
  } }));

  return true;
}

/**
 * First step in opening a modal. Sets the DOM attributes and classes when necessary.
 * Doesn't dispatch events.
 */
function setModalOpen($modal) {
  const name = $modal.attr(containerAttribute);
  const disableGlobalClassValue = $modal.attr(disableGlobalClassAttribute);
  const shouldShowGlobalClass = typeof disableGlobalClassValue === 'undefined' || disableGlobalClassValue === 'false';

  $modal.attr(openAttribute, true);
  if (shouldShowGlobalClass) $globalContainer.addClass(`modal-${getClassFriendlyName(name)}-open`);
  if (reportOpenModals) $globalContainer.addClass(`modal-open`);

  return true;
}

/**
 * Sets the modal's open attribute to false
 * @param  {object|string} modal   Name or jQuery element of the modal to be toggled. If the argument is a string, it will be interpreted as the modal's name. Otherwise, it will be interpreted as a jQuery element
 * @return {boolean}  Whether a modal was opened or not. If no modal is found, false will be returned.
 */
export function closeModal(modal) {
  const $modal = getJQueryObject(modal);

  if (!$modal || $modal.length === 0 || !isModalOpen($modal)) return false;

  const name = $modal.attr(containerAttribute);

  $modal.attr(openAttribute, false);
  $globalContainer.removeClass(`modal-${getClassFriendlyName(name)}-open`);
  if (reportOpenModals && !isAnyModalOpen()) $globalContainer.removeClass(`modal-open`);

  window.dispatchEvent(new CustomEvent('modal:closed', { detail: {
    type: 'modal:closed', $modal, name
  } }));

  return true;
}

/**
 * @param  {object|string} modal Name or jQuery element of the modal to be toggled. If the argument is a string, it will be interpreted as the modal's name. Otherwise, it will be interpreted as a jQuery element
 * @return {Boolean}  Whether the modal is open or not
 */
export function isModalOpen(modal) {
  const $modal = getJQueryObject(modal);
  return $modal.attr(openAttribute) === 'true';
}

/**
 * @return {Boolean} True if any modal is currently open. If none of the modals are open, false.
 */
export function isAnyModalOpen() {
  return $(`[${openAttribute}="true"]`).length > 0;
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
      $modal.attr(openAttribute, false);
    } else {
      setModalOpen($modal);
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

/**
 * Helper function to normalize the modal to a jQuery object, so the user can enter either the modal's name or jQuery object.
 * @param  {object|string} modal Modal's name, or jQuery object
 * @return {object}       jQuery object representing the modal
 */
function getJQueryObject(modal) {
  return typeof modal === 'string' ? $(`[${containerAttribute}="${modal}"]`) : modal;
}

/**
 * Classes can't have spaces in them, but modal names technically can, so we strip those spaces away when using them as part of a class
 * @param  {string} name Original name
 * @return {string}      Name that can be used as a class
 */
function getClassFriendlyName(name) {
  return name.replace(/ /g, '');
}
