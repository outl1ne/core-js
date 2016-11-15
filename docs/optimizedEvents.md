# Optimized events

These are custom versions of native events with some extra functionality.

## Example

```
import { optimizedEvents } from '@optimistdigital/core-js';
optimizedEvents.init({ reportViewportSize: true });

window.addEventListener('optimizedResize', evt => {
    console.log(evt.detail.width, evt.detail.height);
});
```

## JavaScript API

|Function|Description|
|---|---|
|init(options)|Call this once, at the start of your app. Creates throttled resize and scroll events out of the box.|
|throttle(originalEvent, newEvent, getDetail)|Creates a throttled version of an event. getDetail will be called whenever the event is dispatched and the return value will be set as the `event.detail` value.|

## Events

|Event|event.detail|Description|
|---|---|---|
|window.addEventListener('optimizedResize', cb)|`{ width: number, height: number }`|Called when the screen is resized (throttled). Also gets dispatched when orientation changes. If you use the `reportViewportSize` option, evt.detail will contain the viewport size.|
|window.addEventListener('optimizedScroll', cb)|-|Called whenever the window is scrolled (throttled).|

## Options

|Option|Default|Description|
|---|---|---|
|reportViewportSize|false|If set to true, optimizedResize callbacks will be passed the viewport size. |
