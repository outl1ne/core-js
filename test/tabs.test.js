const renderToDom = require('./renderToDom');
const tabs = require('../lib/tabs');

describe('Tabs', () => {
  beforeEach(() => {
    renderToDom(`
      <div data-tabs class="tabs">
      <div data-tab-buttons class="tab-buttons">
          <button>Tab 1</button>
          <button>Tab 2</button>
          <button>Tab 3</button>
      </div>

      <div data-tab-content class="tab-content">
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
      </div>
  </div>
          `);

    tabs.init();
  });

  it(`should add 'is-active' class to tab-content element when the corresponding tab-button is pressed and remove the class from other content elements`, () => {
    document.querySelectorAll('[data-tab-buttons] button').forEach(button => {
      const tabIndex = Array.from(button.parentNode.children).indexOf(button);
      const tabButton = document.querySelector(`[data-tab-buttons] :nth-of-type(${tabIndex + 1})`);
      const tabContent = document.querySelector(`[data-tab-content] :nth-of-type(${tabIndex + 1})`);
      const nonActiveContent = Array.from(document.querySelectorAll('[data-tab-content] > *'));
      nonActiveContent.splice(tabIndex, 1);
      const nonActiveButtons = Array.from(document.querySelectorAll('[data-tab-buttons] button'));
      nonActiveButtons.splice(tabIndex, 1);

      tabButton.click();
      expect(tabContent.classList.contains('is-active')).toBe(true);
      expect(tabButton.classList.contains('is-active')).toBe(true);

      nonActiveContent.map(child => {
        return expect(child.classList.contains('is-active')).toBe(false);
      });
      nonActiveButtons.map(child => {
        return expect(child.classList.contains('is-active')).toBe(false);
      });
    });
  });

  it(`should have 'is-active' class on one of the buttons and the corresponding content when rendering the page`, () => {
    let activeButton = false;
    let activeContent = false;

    document.querySelectorAll('[data-tab-buttons] button').forEach(button => {
      if (button.classList.contains('is-active')) {
        activeButton = true;
      }
    });
    document.querySelectorAll('[data-tab-content] > *').forEach(tab => {
      if (tab.classList.contains('is-active')) {
        activeContent = true;
      }
    });
    expect(activeButton).toBe(true);
    expect(activeContent).toBe(true);
  });
});
