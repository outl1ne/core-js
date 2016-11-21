/* eslint-disable func-names, prefer-arrow-callback */

import expect from 'expect';
import renderToDom from '../utils/renderToDom';
import { modals } from '../../dist/index';
import $ from 'jquery';

describe(`Modal`, function() {

  beforeEach(`Render needed DOM elements, initialize modals`, () => {

    renderToDom(`
      <button data-modal-opener="testmodal"></button>
      <button data-modal-toggler="testmodal"></button>
      <button data-modal-toggler="not testmodal"></button>

      <div data-modal="testmodal">
        <button data-modal-closer="testmodal"></button>
      </div>
    `);

    modals.init();
  });

  it(`should toggle the modal modal-open data attribute when opener/closer is pressed`, () => {
    const $opener = $('[data-modal-opener="testmodal"]');
    const $closer = $('[data-modal-closer]');
    const $modal = $('[data-modal="testmodal"]');

    expect($modal.attr('data-modal-open')).toBe('false');
    $opener.click();
    expect($modal.attr('data-modal-open')).toBe('true');
    $closer.click();
    expect($modal.attr('data-modal-open')).toBe('false');
  });

  it(`should toggle the modal modal-open data attribute when toggler is pressed`, () => {
    const $toggler = $('[data-modal-toggler="testmodal"]');
    const $modal = $('[data-modal="testmodal"]');

    expect($modal.attr('data-modal-open')).toBe('false');
    $toggler.click();
    expect($modal.attr('data-modal-open')).toBe('true');
    $toggler.click();
    expect($modal.attr('data-modal-open')).toBe('false');
  });

  it(`should open when openModal is called with a jQuery element`, () => {
    const $modal = $('[data-modal="testmodal"]');
    expect($modal.attr('data-modal-open')).toBe('false');
    modals.openModal($modal);
    expect($modal.attr('data-modal-open')).toBe('true');
  });

  it(`should open when openModal is called with a name`, () => {
    const $modal = $('[data-modal="testmodal"]');
    expect($modal.attr('data-modal-open')).toBe('false');
    modals.openModal('testmodal');
    expect($modal.attr('data-modal-open')).toBe('true');
  });

  it(`should give html the class "modal-testmodal-open" while open`, () => {
    expect($('html').hasClass('modal-testmodal-open')).toBe(false);
    modals.openModal('testmodal');
    expect($('html').hasClass('modal-testmodal-open')).toBe(true);
    modals.closeModal('testmodal');
    expect($('html').hasClass('modal-testmodal-open')).toBe(false);
  });

  it(`should not react when a different modal's toggler is pressed`, () => {
    const $wrongToggler = $('[data-modal-toggler="not testmodal"]');
    const $modal = $('[data-modal="testmodal"]');

    expect($modal.attr('data-modal-open')).toBe('false');
    $wrongToggler.click();
    expect($modal.attr('data-modal-open')).toBe('false');
  });

  it(`should dispatch modal:opened/modal:closed, but only when it's not already open`, () => {
    const openSpy = expect.createSpy();
    const closeSpy = expect.createSpy();

    window.addEventListener('modal:opened', openSpy);
    window.addEventListener('modal:closed', closeSpy);
    modals.openModal('testmodal');
    modals.openModal('testmodal');
    modals.closeModal('testmodal');
    modals.closeModal('testmodal');
    expect(openSpy.calls.length).toBe(1);
    expect(closeSpy.calls.length).toBe(1);
  });
});

describe(`Modal that is opened by default`, () => {
  beforeEach(`Init`, () => {
    renderToDom(`
      <div data-modal="testmodal" data-modal-open="true">
        <button data-modal-closer="testmodal"></button>
      </div>
    `);

    modals.init();
  });

  it(`should give html the classes to show that it's open`, () => {
    expect($('html').hasClass('modal-open')).toBe(true);
    expect($('html').hasClass('modal-testmodal-open')).toBe(true);
  });
});

describe(`Modal that doesn't want to show global class, and not report open modals globally`, function() {

  beforeEach(`Render needed DOM elements, initialize modals`, () => {

    renderToDom(`
      <div data-modal="testmodal" data-disable-global-class>
        <button data-modal-closer="testmodal"></button>
      </div>
    `);

    modals.init({ reportOpenModals: false });
  });

  it(`should not show the modal's open class on the global container`, () => {
    const $modal = $('[data-modal="testmodal"]');

    expect($('html').hasClass('modal-testmodal-open')).toBe(false);
    expect($modal.attr('data-modal-open')).toBe('false');

    modals.openModal('testmodal');
    expect($('html').hasClass('modal-testmodal-open')).toBe(false);
    expect($('html').hasClass('modal-open')).toBe(false);
    expect($modal.attr('data-modal-open')).toBe('true');

    modals.closeModal('testmodal');
    expect($('html').hasClass('modal-testmodal-open')).toBe(false);
    expect($modal.attr('data-modal-open')).toBe('false');
  });
});

describe(`Modal that has a space in its name`, function() {

  beforeEach(`Render needed DOM elements, initialize modals`, () => {

    renderToDom(`
      <div data-modal="test modal">
        <button data-modal-toggler="test modal"></button>
      </div>
    `);

    modals.init();
  });

  it(`should toggle the modal without breaking, global container should get the class name without spaces`, () => {
    const $modal = $('[data-modal="test modal"]');

    expect($('html').hasClass('modal-testmodal-open')).toBe(false);
    expect($modal.attr('data-modal-open')).toBe('false');

    modals.openModal('test modal');
    expect($('html').hasClass('modal-testmodal-open')).toBe(true);
    expect($modal.attr('data-modal-open')).toBe('true');

    modals.closeModal('test modal');
    expect($('html').hasClass('modal-testmodal-open')).toBe(false);
    expect($modal.attr('data-modal-open')).toBe('false');
  });
});

describe(`Multiple modals`, function() {
  beforeEach(`Render needed DOM elements, initialize modals`, () => {

    renderToDom(`
      <div data-modal="testmodal1">
        <button data-modal-toggler="testmodal1"></button>
      </div>

      <div data-modal="testmodal2">
        <button data-modal-toggler="testmodal2"></button>
      </div>
    `);

    modals.init();
  });

  it(`should give "modal-open" class to html as long as any modal is open`, () => {
    const $html = $('html');
    expect($html.hasClass('modal-open')).toBe(false);
    modals.openModal('testmodal1');
    expect($html.hasClass('modal-open')).toBe(true);
    modals.openModal('testmodal2');
    expect($html.hasClass('modal-open')).toBe(true);
    modals.closeModal('testmodal2');
    expect($html.hasClass('modal-open')).toBe(true);
    modals.closeModal('testmodal1');
    expect($html.hasClass('modal-open')).toBe(false);
    modals.toggleModal('testmodal2');
    expect($html.hasClass('modal-open')).toBe(true);
    modals.toggleModal('testmodal2');
    expect($html.hasClass('modal-open')).toBe(false);
  });
});
