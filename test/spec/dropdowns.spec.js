/* eslint-disable func-names, prefer-arrow-callback */

import expect from 'expect';
import renderToDom from '../utils/renderToDom';
import { dropdowns } from '../../dist/index';

describe(`Dropdowns`, function() {

  beforeEach(`Render needed DOM elements, initialize counters listeners`, () => {

    renderToDom(`
      <button data-dropdown-open="false">
          <div data-dropdown-toggler>Dropdown!</div>
          <div data-dropdown>
            <div>Dropdown content!</div>
          </div>
      </button>
    `);

    dropdowns.init();
  });

  it(`should toggle on and off when visible area is pressed`, () => {
    const $toggler = $('[data-dropdown-toggler]');
    const $parent = $toggler.parent();

    expect($parent.attr('data-dropdown-open')).toBe('false');
    $toggler.click();
    expect($parent.attr('data-dropdown-open')).toBe('true');
    $toggler.click();
    expect($parent.attr('data-dropdown-open')).toBe('false');
  });
});
