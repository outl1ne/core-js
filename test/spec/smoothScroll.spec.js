/* eslint-disable func-names, prefer-arrow-callback */
import expect from 'expect';
import renderToDom from '../utils/renderToDom';
import { initSmoothScrollToAnchor } from '../../dist/index';

describe(`Smooth scroll`, function() {

  beforeEach(`Render needed DOM elements`, () => {

    renderToDom(`
      <div>
        <a href="#test" style="display: block;"></a>
        <div id="test"></div>
      </div>
    `);

    $('#test')[0].getBoundingClientRect = () => ({ top: 10000 });
    // document.documentElement.clientHeight = document.body.offsetHeight = 100000;
    window.pageYOffset = 5;

    initSmoothScrollToAnchor();
  });

  it(`should detect when it's input isn't empty`, () => {
    const $link = $('a');
    const animateSpy = expect.spyOn($.fn, 'animate').andCallThrough();
    $link.click();
    expect(animateSpy.calls.length).toBe(1);
  });
});
