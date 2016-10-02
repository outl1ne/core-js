/* eslint-disable func-names, prefer-arrow-callback */

import expect from 'expect';
import renderToDom from '../utils/renderToDom';
import { dropdowns } from '../../dist/index';

describe(`Dropdowns`, function() {

  beforeEach(`Render needed DOM elements, initialize counters listeners`, () => {

    renderToDom(`
      <button data-dropdown-open="false" data-keep-in-view>
          <div data-dropdown-toggler>Dropdown!</div>
          <div data-dropdown>
            <div>Dropdown content!</div>
          </div>
      </button>
    `);

    this.$toggler = $('[data-dropdown-toggler]');
    this.$parent = this.$toggler.parent();
    this.$content = this.$parent.find('[data-dropdown]');

    this.clientWidth = document.documentElement.clientWidth;
    this.clientLeft = document.documentElement.clientLeft;
    document.documentElement.clientWidth = 1454;
    document.documentElement.clientLeft = 0;

    this.$parent[0].getBoundingClientRect = () => (
      { bottom: 787, height: 27, left: 342, right: 394, top: 760, width: 51 }
    );
    this.$content[0].getBoundingClientRect = () => (
      { bottom: 827, height: 40, left: 343, right: 520, top: 787, width: 177 }
    );

    dropdowns.init();
  });

  it(`should toggle on and off when visible area is pressed`, () => {
    expect(this.$parent.attr('data-dropdown-open')).toBe('false');
    this.$toggler.click();
    expect(this.$parent.attr('data-dropdown-open')).toBe('true');
    this.$toggler.click();
    expect(this.$parent.attr('data-dropdown-open')).toBe('false');
  });

  it(`should not toggle the dropdown when the inner content is clicked`, () => {
    const $toggler = $('[data-dropdown-toggler]');
    const $parent = $toggler.parent();
    const $content = $parent.find('[data-dropdown]');

    $toggler.click();
    expect($parent.attr('data-dropdown-open')).toBe('true');
    $content.click();
    expect($parent.attr('data-dropdown-open')).toBe('true');
  });
});

describe(`Dropdown that is out of viewport to the right`, function() {

  beforeEach(`Render needed DOM elements, mock widths/positions`, () => {
    renderToDom(`
      <button data-dropdown-open="false" data-keep-in-view>
          <div data-dropdown-toggler>Dropdown!</div>
          <div data-dropdown>
            <div>Dropdown content!</div>
          </div>
      </button>
    `);

    this.$toggler = $('[data-dropdown-toggler]');
    this.$parent = this.$toggler.parent();
    this.$content = this.$parent.find('[data-dropdown]');

    this.clientWidth = document.documentElement.clientWidth;
    this.clientLeft = document.documentElement.clientLeft;
    document.documentElement.clientWidth = 1454;
    document.documentElement.clientLeft = 0;

    this.$parent[0].getBoundingClientRect = () => (
      { bottom: 787, height: 27, left: 1342, right: 1394, top: 760, width: 51 }
    );
    this.$content[0].getBoundingClientRect = () => (
      { bottom: 827, height: 40, left: 1343, right: 1520, top: 787, width: 177 }
    );

    dropdowns.init();
  });

  it('should move the dropdown to the left to prevent it from going offscreen', () => {
    // translate(${viewportWidth - (openerCenter + dropdownWidthHalf) - dropdownWidthHalf}px, 20px)
    expect(this.$content[0].style.transform).toContain(`translate(-736.5px`); // We don't care about the Y value
  });

  afterEach(`Clean up mocked variables`, () => {
    document.documentElement.clientWidth = this.clientWidth;
    document.documentElement.clientLeft = this.clientLeft;
  });
});

describe(`Dropdown that is out of viewport to the left`, function() {

  beforeEach(`Render needed DOM elements, mock widths/positions`, () => {
    renderToDom(`
      <button data-dropdown-open="false" data-keep-in-view>
          <div data-dropdown-toggler>Dropdown!</div>
          <div data-dropdown>
            <div>Dropdown content!</div>
          </div>
      </button>
    `);

    this.$toggler = $('[data-dropdown-toggler]');
    this.$parent = this.$toggler.parent();
    this.$content = this.$parent.find('[data-dropdown]');

    this.clientWidth = document.documentElement.clientWidth;
    this.clientLeft = document.documentElement.clientLeft;
    document.documentElement.clientWidth = 1454;
    document.documentElement.clientLeft = 0;

    this.$parent[0].getBoundingClientRect = () => (
      { bottom: 787, height: 27, left: -342, right: 94, top: 760, width: 51 }
    );
    this.$content[0].getBoundingClientRect = () => (
      { bottom: 827, height: 40, left: -343, right: 220, top: 787, width: 177 }
    );

    dropdowns.init();
  });

  it('should move the dropdown to the right to prevent it from going offscreen', () => {
    // translate(${viewportWidth - (openerCenter + dropdownWidthHalf) - dropdownWidthHalf}px, 20px)
    expect(this.$content[0].style.transform).toContain(`translate(324.5px`); // We don't care about the Y value
  });

  afterEach(`Clean up mocked variables`, () => {
    document.documentElement.clientWidth = this.clientWidth;
    document.documentElement.clientLeft = this.clientLeft;
  });
});
