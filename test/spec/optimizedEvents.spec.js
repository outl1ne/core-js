/* eslint-disable func-names, prefer-arrow-callback */
import '../../dist/index';

describe(`Optimized events`, function() {

  it(`should dispatch a throttled optimizedResize event on resize`, () => new Promise((resolve) => {
    window.addEventListener('optimizedResize', resolve);
    window.dispatchEvent(new Event('resize'));
  }));
});
