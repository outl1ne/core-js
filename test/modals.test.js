const renderToDom = require('./renderToDom');
const { modals } = require('../dist/index');

describe('Modals', () => {
  beforeEach(() => {
    renderToDom(`
          <button data-modal-opener="testmodal"></button>
          <button data-modal-toggler="testmodal"></button>
          <div data-modal="testmodal">
            <button data-modal-closer="testmodal"></button>
          </div>
        `);

    modals.init();
  });

  it(`should toggle the modal modal-open data attribute when opener/closer is pressed`, () => {
    const opener = document.querySelector('[data-modal-opener="testmodal"]');
    const closer = document.querySelector('[data-modal-closer="testmodal"]');
    const modal = document.querySelector('[data-modal="testmodal"]');
    const toggler = document.querySelector('[data-modal-toggler="testmodal"]');

    expect(modal.dataset.modalOpen).toBe('false');
    opener.click();
    expect(modal.dataset.modalOpen).toBe('true');
    closer.click();
    expect(modal.dataset.modalOpen).toBe('false');
    toggler.click();
    expect(modal.dataset.modalOpen).toBe('true');
    toggler.click();
    expect(modal.dataset.modalOpen).toBe('false');
  });

  it(`should close the modal when esc is pressed`, () => {
    const opener = document.querySelector('[data-modal-opener="testmodal"]');
    const modal = document.querySelector('[data-modal="testmodal"]');

    opener.click();
    expect(modal.dataset.modalOpen).toBe('true');
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    expect(modal.dataset.modalOpen).toBe('false');
  });

  it(`should add a class to html when the modal is opened`, () => {
    const toggler = document.querySelector('[data-modal-toggler="testmodal"]');

    toggler.click();
    expect(document.documentElement.classList.contains('modal-testmodal-open')).toBe(true);
    toggler.click();
    expect(document.documentElement.classList.contains('modal-testmodal-open')).toBe(false);
  });
});
