/* eslint-disable func-names, prefer-arrow-callback */
import '../../dist/index';

describe(`Core logic`, function() {

  it(`should dispatch a throttled optimizedResize event on resize`, () => new Promise((resolve) => {
    window.addEventListener('optimizedResize', resolve);
    window.dispatchEvent(new Event('resize'));
  }));

  it(`should dispatch a throttled optimizedScroll event on resize`, () => new Promise((resolve) => {
    window.addEventListener('optimizedScroll', resolve);
    window.dispatchEvent(new Event('scroll'));
  }));
});
