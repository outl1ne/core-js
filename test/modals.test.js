const renderToDom = require('./renderToDom');
const modals = require('../lib/modals');

const getRandomModalName = () =>
  `modal-${Math.random()
    .toString()
    .replace('.', '')}`;

describe('Modals', () => {
  it(`should toggle the modal modal-open data attribute when opener/closer is pressed`, () => {
    const modalName = getRandomModalName();
    renderToDom(`
    <button data-modal-opener="${modalName}">Open modal</button>

    <div data-modal="${modalName}">
      <button data-modal-closer="${modalName}">Close modal</button>
      <button data-modal-toggler="${modalName}">Toggle modal</button>
      <div>Content here!</div>
    </div>
  `);

    modals.init();

    const opener = document.querySelector(`[data-modal-opener="${modalName}"]`);
    const closer = document.querySelector(`[data-modal-closer="${modalName}"]`);
    const modal = document.querySelector(`[data-modal="${modalName}"]`);
    const toggler = document.querySelector(`[data-modal-toggler="${modalName}"]`);

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
    const modalName = getRandomModalName();
    renderToDom(`
    <button data-modal-opener="${modalName}">Open modal</button>

    <div data-modal="${modalName}" data-close-on-esc="true">
      <button data-modal-closer="${modalName}">Close modal</button>
      <button data-modal-toggler="${modalName}">Toggle modal</button>
      <div>Content here!</div>
    </div>
  `);

    modals.init();

    const opener = document.querySelector(`[data-modal-opener="${modalName}"]`);
    const modal = document.querySelector(`[data-modal="${modalName}"]`);

    opener.click();
    expect(modal.dataset.modalOpen).toBe('true');
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    expect(modal.dataset.modalOpen).toBe('false');
  });

  it(`should not close the modal when esc is pressed (if configured)`, () => {
    const modalName = getRandomModalName();
    renderToDom(`
    <button data-modal-opener="${modalName}">Open modal</button>

    <div data-modal="${modalName}" data-close-on-esc="false">
      <button data-modal-closer="${modalName}">Close modal</button>
      <button data-modal-toggler="${modalName}">Toggle modal</button>
      <div>Content here!</div>
    </div>
  `);

    modals.init();

    const opener = document.querySelector(`[data-modal-opener="${modalName}"]`);
    const modal = document.querySelector(`[data-modal="${modalName}"]`);

    opener.click();
    expect(modal.dataset.modalOpen).toBe('true');
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    expect(modal.dataset.modalOpen).toBe('true');
  });

  it(`should add a class to html when the modal is opened`, () => {
    const modalName = getRandomModalName();
    renderToDom(`
    <button data-modal-opener="${modalName}">Open modal</button>

    <div data-modal="${modalName}">
      <button data-modal-closer="${modalName}">Close modal</button>
      <button data-modal-toggler="${modalName}">Toggle modal</button>
      <div>Content here!</div>
    </div>
  `);

    modals.init();

    const toggler = document.querySelector(`[data-modal-toggler="${modalName}"]`);

    toggler.click();
    expect(document.documentElement.classList.contains(`modal-${modalName}-open`)).toBe(true);
    toggler.click();
    expect(document.documentElement.classList.contains(`modal-${modalName}-open`)).toBe(false);
  });

  it(`should toggle the modal modal-open data attribute when openModal()/closeModal()/toggleModal() functions are called`, () => {
    const modalName = getRandomModalName();
    renderToDom(`
    <button data-modal-opener="${modalName}">Open modal</button>

    <div data-modal="${modalName}">
      <button data-modal-closer="${modalName}">Close modal</button>
      <button data-modal-toggler="${modalName}">Toggle modal</button>
      <div>Content here!</div>
    </div>
  `);

    modals.init();

    const modal = document.querySelector(`[data-modal="${modalName}"]`);

    expect(modal.dataset.modalOpen).toBe('false');
    modals.openModal(modalName);
    expect(modal.dataset.modalOpen).toBe('true');
    modals.closeModal(modalName);
    expect(modal.dataset.modalOpen).toBe('false');
    modals.toggleModal(modalName);
    expect(modal.dataset.modalOpen).toBe('true');
    modals.toggleModal(modalName);
    expect(modal.dataset.modalOpen).toBe('false');
  });
});
