/* eslint-disable func-names, prefer-arrow-callback */
import expect from 'expect';
import { deviceInfo } from '../../dist/index';

describe(`Device info`, function() {
  const mockedWidth = 800;

  beforeEach(`Init module, mock clientWidth`, () => {
    this.clientWidth = document.documentElement.clientWidth;
    document.documentElement.clientWidth = mockedWidth;

    deviceInfo.init();
  });

  it(`should give the viewport width`, () => {
    expect(deviceInfo.getViewportWidth()).toBe(mockedWidth);
  });

  it(`should not think we are a touch device`, () => {
    expect(deviceInfo.isTouchDevice()).toBe(false);
  });

  afterEach(`Restore mocked variables`, () => {
    document.body.className = '';
    document.documentElement.clientWidth = this.clientWidth;
  });
});

describe(`Device info with viewport size caching + navigator with touch events`, function() {
  const mockedWidth = 800;

  beforeEach(`Init module, mock clientWidth`, () => {
    this.clientWidth = document.documentElement.clientWidth;
    document.documentElement.clientWidth = mockedWidth;
    global.navigator = { maxTouchPoints: 20 };

    deviceInfo.init({ cacheViewport: true });
  });

  it(`should give the viewport width without calling $(window).width()`, () => {
    const widthSpy = expect.spyOn($.fn, 'width').andCallThrough();

    expect(deviceInfo.getViewportWidth()).toBe(mockedWidth);
    expect(widthSpy).toNotHaveBeenCalled();
  });

  it(`should think we are a touch device`, () => {
    expect(deviceInfo.isTouchDevice()).toBe(true);
    expect($('html').hasClass('touch-device')).toBe(true);
  });
});
