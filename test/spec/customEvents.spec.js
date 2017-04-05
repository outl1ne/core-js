/* eslint-disable func-names, prefer-arrow-callback */
import { customEvents } from '../../dist/index';

describe(`Custom events`, function() {

  it(`should initialize without errors`, () => new Promise((resolve) => {
    customEvents.init();
    resolve();
  }));

  it(`should dispatch the event if visibilitychange happens`, () => new Promise((resolve) => {
    customEvents.init();
    window.addEventListener('focusChange', resolve);
    document.dispatchEvent(new Event('visibilitychange'));
  }));
});
