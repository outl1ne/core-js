/* eslint-disable func-names, prefer-arrow-callback */
import expect from 'expect';
import { deviceInfo, optimizedEvents } from '../../dist/index';

const mockedWidth = 800;
const mockedHeight = 600;

optimizedEvents.init({ reportViewportSize: true });

describe(`Device info`, function() {

  beforeEach(`Init module, mock clientWidth`, () => {
    this.clientWidth = document.documentElement.clientWidth;
    document.documentElement.clientWidth = mockedWidth;
    this.clientHeight = document.documentElement.clientHeight;
    document.documentElement.clientHeight = mockedHeight;

    deviceInfo.init();
  });

  it(`should give the viewport width and height`, () => {
    expect(deviceInfo.getViewportWidth()).toBe(mockedWidth);
    expect(deviceInfo.getViewportHeight()).toBe(mockedHeight);
  });

  it(`should not dispatch optimizedResize twice in a row`, function(done) {
    const resizeSpy = expect.createSpy();

    window.addEventListener('optimizedResize', evt => {
      expect(evt.detail.width).toBe(800);
      expect(evt.detail.height).toBe(600);
      resizeSpy();
    });
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    setTimeout(() => {
      expect(resizeSpy.calls.length).toBe(1);
      done();
    }, 50)
  });

  it(`should dispatch optimizedResize when orientation changes`, () => {
    const resizeSpy = expect.createSpy();

    window.addEventListener('optimizedResize', resizeSpy);
    window.dispatchEvent(new Event('orientationchange'))
    expect(resizeSpy).toHaveBeenCalled();
  });

  it(`should not think we are a touch device`, () => {
    expect(deviceInfo.isTouchDevice()).toBe(false);
  });

  it(`should not think we are LTE IE9`, () => {
    expect(deviceInfo.isIE()).toBe(false);
    expect(deviceInfo.isIE()).toBe(false);
  });

  afterEach(`Restore mocked variables`, () => {
    document.body.className = '';
    document.documentElement.clientWidth = this.clientWidth;
    document.documentElement.clientHeight = this.clientHeight;
  });
});

describe(`Touch device check with undefined navigator`, function() {
  beforeEach(`Mock navigator`, () => {
    this.realNavigator = global.navigator;
    global.navigator = undefined;
  });

  it(`should not think we are a touch device`, () => {
    expect(deviceInfo.isTouchDevice()).toBe(false);
  });

  afterEach(`Restore navigator`, () => {
    global.navigator = this.realNavigator;
  });
});

describe(`Device info with viewport size caching + navigator with touch events`, function() {

  beforeEach(`Init module, mock clientWidth`, () => {
    this.clientWidth = document.documentElement.clientWidth;
    document.documentElement.clientWidth = mockedWidth;
    this.clientHeight = document.documentElement.clientHeight;
    document.documentElement.clientHeight = mockedHeight;

    global.navigator = { maxTouchPoints: 20 };

    deviceInfo.init({ cacheViewport: true });
  });

  it(`should give the viewport width without calling $(window).width()`, () => {
    const widthSpy = expect.spyOn($.fn, 'width').andCallThrough();

    expect(deviceInfo.getViewportWidth()).toBe(mockedWidth);
    expect(widthSpy).toNotHaveBeenCalled();
  });

  it(`should think we are a touch device`, () => {
    expect(deviceInfo.isTouchDevice()).toBe(true, 'Expected touch device to be true');
    expect($('html').hasClass('touch-device')).toBe(true, 'Expected html to have `touch-device` class');
  });

  afterEach(`Restore mocked variables`, () => {
    document.body.className = '';
    document.documentElement.clientWidth = this.clientWidth;
    document.documentElement.clientHeight = this.clientHeight;
  });
});
