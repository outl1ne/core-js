/* eslint-disable func-names, prefer-arrow-callback */

import expect from 'expect';
import renderToDom from '../utils/renderToDom';
import { modals } from '../../dist/index';

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

  it(`should not react when a different modal's toggler is pressed`, () => {
    const $wrongToggler = $('[data-modal-toggler="not testmodal"]');
    const $modal = $('[data-modal="testmodal"]');

    expect($modal.attr('data-modal-open')).toBe('false');
    $wrongToggler.click();
    expect($modal.attr('data-modal-open')).toBe('false');
  });
});
