# Optimized events

These are custom versions of native events with some extra functionality.

#### JavaScript API

More thorough documentation is in the docs folder

|Function|Description|
|---|---|
|init(options)|Initialization logic. This should only be called once. Creates throttled resize and scroll events out of the box.|
|throttle(originalEvent, newEvent, getDetail)|Creates a throttled version of an event. getDetail will be called whenever the event is dispatched and the return value will be set as the `event.detail` value.|

#### Events

|Event|event.detail|Description|
|---|---|---|
|window.addEventListener('optimizedResize', cb)|`{ width: number, height: number }`|Gets called when the screen is resized, but throttled. Not every resize event will be dispatched here. These also get dispatched when the orientation changes. If you use the `reportViewportSize` option, the callback will get an object that contains the new viewport size.|
|window.addEventListener('optimizedScroll', cb)|-|Gets called whenever the window is scrolled, but throttled. Not every scroll event will be dispatched here.|

#### Example

```
import { optimizedEvents } from '@optimistdigital/core-js';
optimizedEvents.init({ reportViewportSize: true });

window.addEventListener('optimizedResize', evt => {
    console.log(evt.detail.width, evt.detail.height);
});
```

#### Options

|Option|Default|Description|
|---|---|---|
|reportViewportSize|false|If set to true, optimizedResize events will be dispatched along with the new viewport size in the form `{ width: number, height: number }` |
