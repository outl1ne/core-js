const renderToDom = require('./renderToDom');
const dropdowns = require('../lib/dropdowns');

describe('Dropdowns', () => {
  beforeEach(() => {
    renderToDom(`
    <div data-dropdown="testdropdown">
      <button data-toggle-dropdown="testdropdown">ET</button>
         <ul data-dropdown-content="testdropdown">
            <li>lang 1</li>
            <li>lang 2</li>
            <li>lang 3</li>
          </ul>
    </div>

        `);

    dropdowns.init();
  });

  it(`should toggle the dropdown dropdown-open data attribute toggle-dropdown button is pressed`, () => {
    const dropdown = document.querySelector('[data-dropdown="testdropdown"]');
    const toggler = document.querySelector('[data-toggle-dropdown="testdropdown"]');

    expect(dropdown.dataset.dropdownOpen).toBe('false');
    toggler.click();
    expect(dropdown.dataset.dropdownOpen).toBe('true');
    toggler.click();
    expect(dropdown.dataset.dropdownOpen).toBe('false');
  });

  it(`should close the dropdown when esc is pressed`, () => {
    const dropdown = document.querySelector('[data-dropdown="testdropdown"]');
    const toggler = document.querySelector('[data-toggle-dropdown="testdropdown"]');

    toggler.click();
    expect(dropdown.dataset.dropdownOpen).toBe('true');
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    expect(dropdown.dataset.dropdownOpen).toBe('false');
  });

  xit(`should toggle the dropdown-open data attribute when openDropdown()/closeDropdown()/toggleDropdown() functions are called`, () => {
    const dropdown = document.querySelector('[data-dropdown="testdropdown"]');

    expect(dropdown.dataset.dropdownOpen).toBe('false');
    dropdowns.openDropdown('testdropdown');
    expect(dropdown.dataset.dropdownOpen).toBe('true');
    dropdowns.closeDropdown('testdropdown');
    expect(dropdown.dataset.dropdownOpen).toBe('false');
    dropdowns.toggleDropdown('testdropdown');
    expect(dropdown.dataset.dropdownOpen).toBe('true');
    dropdowns.toggleDropdown('testdropdown');
    expect(dropdown.dataset.dropdownOpen).toBe('false');
  });

  xit(`should close the dropdown when user clicks outside the dropdown`, () => {
    const dropdown = document.querySelector('[data-dropdown="testdropdown"]');
    const toggler = document.querySelector('[data-toggle-dropdown="testdropdown"]');

    toggler.click();
    expect(dropdown.dataset.dropdownOpen).toBe('true');
    document.body.click();
    expect(dropdown.dataset.dropdownOpen).toBe('false');
  });
});
