const renderToDom = require('./renderToDom');
const dropdowns = require('../lib/dropdowns');

describe('Dropdowns', () => {
  it(`should toggle the dropdown dropdown-open data attribute toggle-dropdown button is pressed`, () => {
    renderToDom(`
    <div data-dropdown>
      <button data-toggle-dropdown>ET</button>
      <ul class="dropdown-content" data-dropdown-content>
        <li>lang 1</li>
        <li>lang 2</li>
        <li>lang 3</li>
      </ul>
    </div>
        `);

    dropdowns.init();

    const dropdown = document.querySelector('[data-dropdown]');
    const toggler = document.querySelector('[data-toggle-dropdown]');

    expect(dropdown.dataset.dropdownOpen).toBe('false');
    toggler.click();
    expect(dropdown.dataset.dropdownOpen).toBe('true');
    toggler.click();
    expect(dropdown.dataset.dropdownOpen).toBe('false');
  });

  it(`should close the dropdown when esc is pressed (if configured)`, () => {
    renderToDom(`
    <div data-dropdown data-close-on-esc="true" data-dropdown-open="true">
      <button data-toggle-dropdown>ET</button>
      <ul class="dropdown-content" data-dropdown-content>
        <li>lang 1</li>
        <li>lang 2</li>
        <li>lang 3</li>
      </ul>
    </div>
        `);

    dropdowns.init();

    const dropdown = document.querySelector('[data-dropdown]');

    expect(dropdown.dataset.dropdownOpen).toBe('true');
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    expect(dropdown.dataset.dropdownOpen).toBe('false');
  });

  it(`should not close the dropdown when esc is pressed (if configured)`, () => {
    renderToDom(`
    <div data-dropdown data-close-on-esc="false" data-dropdown-open="true">
      <button data-toggle-dropdown>ET</button>
      <ul class="dropdown-content" data-dropdown-content>
        <li>lang 1</li>
        <li>lang 2</li>
        <li>lang 3</li>
      </ul>
    </div>
        `);

    dropdowns.init();

    const dropdown = document.querySelector('[data-dropdown]');

    expect(dropdown.dataset.dropdownOpen).toBe('true');
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    expect(dropdown.dataset.dropdownOpen).toBe('true');
  });

  it(`should toggle the dropdown-open data attribute when openDropdown()/closeDropdown()/toggleDropdown() functions are called`, () => {
    renderToDom(`
    <div data-dropdown>
      <button data-toggle-dropdown>ET</button>
      <ul class="dropdown-content" data-dropdown-content>
        <li>lang 1</li>
        <li>lang 2</li>
        <li>lang 3</li>
      </ul>
    </div>
        `);

    dropdowns.init();

    const dropdown = document.querySelector('[data-dropdown]');

    expect(dropdown.dataset.dropdownOpen).toBe('false');
    dropdowns.openDropdown(dropdown);
    expect(dropdown.dataset.dropdownOpen).toBe('true');
    dropdowns.closeDropdown(dropdown);
    expect(dropdown.dataset.dropdownOpen).toBe('false');
    dropdowns.toggleDropdown(dropdown);
    expect(dropdown.dataset.dropdownOpen).toBe('true');
    dropdowns.toggleDropdown(dropdown);
    expect(dropdown.dataset.dropdownOpen).toBe('false');
  });

  it(`should close the dropdown when user clicks outside the dropdown (if configured)`, () => {
    renderToDom(`
    <div data-dropdown data-dropdown-open="true" data-close-on-outside-click="true">
      <button data-toggle-dropdown>ET</button>
      <ul class="dropdown-content" data-dropdown-content>
        <li>lang 1</li>
        <li>lang 2</li>
        <li>lang 3</li>
      </ul>
    </div>
        `);

    dropdowns.init();

    const dropdown = document.querySelector('[data-dropdown]');
    expect(dropdown.dataset.dropdownOpen).toBe('true');

    // Things don't have a size in JSDOM, so outside click detection logic fails.
    // We mock a client rect for this element so our code would think it's visible
    dropdown.getClientRects = () => [{ top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 }];
    document.documentElement.click();
    expect(dropdown.dataset.dropdownOpen).toBe('false');
  });

  it(`should not close the dropdown when user clicks outside the dropdown (if configured)`, () => {
    renderToDom(`
    <div data-dropdown data-dropdown-open="true" data-close-on-outside-click="false">
      <button data-toggle-dropdown>ET</button>
      <ul class="dropdown-content" data-dropdown-content>
        <li>lang 1</li>
        <li>lang 2</li>
        <li>lang 3</li>
      </ul>
    </div>
        `);

    dropdowns.init();

    const dropdown = document.querySelector('[data-dropdown]');
    expect(dropdown.dataset.dropdownOpen).toBe('true');

    // Things don't have a size in JSDOM, so outside click detection logic fails.
    // We mock a client rect for this element so our code would think it's visible
    dropdown.getClientRects = () => [{ top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 }];
    document.documentElement.click();
    expect(dropdown.dataset.dropdownOpen).toBe('true');
  });
});

/**
 * SHAME: data-keep-in-view is untested because it's difficult to test in jsdom without heavy mocking which might defeat the purpose? Should research further
 */
