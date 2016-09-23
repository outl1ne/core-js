/**
 * FLOAT LABELS:
 * This code is meant to accompany float labels code (should be found in styles/components/_float-label.scss)
 * It adds a `has-text` class to any input that has text in it, so we can style the labels accordingly
 * NOTE: Prefilled password fields will not float until the user interacts with the page.
 *
 * Example of usage:
 * <label class="input-field">
 *   <input type="text">
 * </label>
 * @module app/scripts/floatLabel
 */

let inputFieldSelector;
let hasTextClass;
let $inputFields;

/**
 * Starts checking input fields for text
 * @param {object} [options]
 * @param {string} [options.inputFieldSelector] - Class selector for the labels that the input belongs to
 * @param {string} [options.hasTextClass] - The class to be added when the input has any text
 */
export function init(options = {}) {
  parseOptions(options);

  $inputFields = $(inputFieldSelector);
  $inputFields.on('input', (evt) => evaluateContent(evt.target));

  // Timeout is here to prevent bugs with prefills.
  setTimeout(() => {
    evaluateAllFields($inputFields);
  });
}

/**
 * Sets variables based on options object, or defaults. This should only be called from init.
 * @param {object} [options]
 */
function parseOptions(options) {
  inputFieldSelector = options.inputFieldSelector || '.input-field';
  hasTextClass = options.hasTextClass || 'has-text';
}

/**
 * Checks if an element has any text in it, and adds a class accordingly
 * @param  {object} inputEl   The DOM element whose content to evaluate
 */
function evaluateContent(inputEl) {
  if (!inputEl) {
    return;
  }

  const content = inputEl.value;
  if (content !== '') {
    $(inputEl).addClass(hasTextClass);
  } else {
    $(inputEl).removeClass(hasTextClass);
  }
}

/**
 * Checks all given input fields if they have text in them
 * @param  {object} $fields   jQuery object containing all the fields that should be checked
 */
function evaluateAllFields($fields) {
  $fields.each(function fieldIterator() {
    evaluateContent($(this).find('input')[0]);
  });
}
