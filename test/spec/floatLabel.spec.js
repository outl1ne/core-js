/* eslint-disable func-names, prefer-arrow-callback */
import expect from 'expect';
import renderToDom from '../utils/renderToDom';
import { floatLabel } from '../../dist/index';

describe(`Float label`, function() {

  beforeEach(`Render needed DOM elements, initialize counters listeners`, () => {

    renderToDom(`
      <label class="input-field input-field-text">
        <input type="text" name="test">
        <span class="label label-top">
          <span class="error-msg"></span>
        </span>
        <span class="label label-mid">
          <span class="error-msg"></span>
        </span>
      </label>
      <label class="input-field input-field-textarea"><textarea></textarea></label>
    `);

    floatLabel.init();
  });

  it(`should detect when it's input isn't empty`, () => {
    const $inputEl = $('.input-field > input');

    expect($inputEl.hasClass('has-text')).toBe(false, 'has-text should be off by default');

    $inputEl.val('Fred');
    $inputEl.trigger('input');
    expect($inputEl.hasClass('has-text')).toBe(true, 'has-text should turn on when user types something');

    $inputEl.val('');
    $inputEl.trigger('input');
    expect($inputEl.hasClass('has-text')).toBe(false, 'has-text should turn off when user empties input');
  });
});
