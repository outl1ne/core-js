# Custom events

Creates custom events that the browser doesn't support or has an inconvenient syntax. Currently contains:

- focusChange (evt.detail: true|false (focused or unfocused))

## Example

```
import { customEvents } from '@optimistdigital/core-js';
customEvents.init();

window.addEventListener('focusChange', evt => {
    console.log(`Focus changed to ${evt.detail}`);
});
```
