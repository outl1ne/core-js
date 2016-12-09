# Smooth scroll to anchor

When clicking a link that has a hash corresponding to an element's ID, the viewport will be scrolled to that element smoothly instead of jumping to it instantly.

## Example

#### HTML
```
<a href="#products">Scroll to products</a>
<div id="products"></div>
```

#### JavaScript
```
import { initSmoothScrollToAnchor } from '@optimistdigital/core-js';
initSmoothScrollToAnchor(250);
```

## JavaScript API

|Function|Description|
|---|---|
|initSmoothScrollToAnchor(time = 500)|Initializes the event listeners on anchor elements. Time is how long the animation takes in milliseconds, defaults to 500. This function only needs to be called once. |
