const renderToDom = require('./renderToDom');
const tabs = require('../lib/tabs');

describe('Tabs', () => {
  beforeEach(() => {
    renderToDom(`
      <div data-tabs>
        <div data-tab-buttons>
          <button>Tab 1</button>
          <button>Tab 2</button>
          <button>Tab 3</button>
        </div>

        <div data-tab-content>
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
      const tabContent = document.querySelector(`[data-tab-content] :nth-of-type(${tabIndex + 1})`);

      button.click();

      expect(tabContent.classList.contains('is-active')).toBe(true);
      expect(button.classList.contains('is-active')).toBe(true);

      Array.from(document.querySelectorAll('[data-tab-content] > *'))
        .filter(x => x !== tabContent)
        .forEach(el => {
          expect(el.classList.contains('is-active')).toBe(false);
        });

      Array.from(document.querySelectorAll('[data-tab-buttons] > *'))
        .filter(x => x !== button)
        .forEach(el => {
          expect(el.classList.contains('is-active')).toBe(false);
        });
    });
  });

  it(`should have 'is-active' class on one of the buttons and the corresponding content when rendering the page`, () => {
    console.log('Oooo', document.body.outerHTML);
    const activeButtons = Array.from(document.querySelectorAll('[data-tab-buttons] > *')).filter(el =>
      el.classList.contains('is-active')
    );
    const activeContent = Array.from(document.querySelectorAll('[data-tab-content] > *')).filter(el =>
      el.classList.contains('is-active')
    );

    expect(activeButtons).toHaveLength(1);
    expect(activeContent).toHaveLength(1);
  });
});
