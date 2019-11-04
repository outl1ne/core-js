# Tabs

Adds 'is-active' class to the clicked button and the corresponding content area.

By default, the first tab will be active. You can specify the default active tab by adding the `is-active` class to one of the buttons.

## Example

#### HTML

```
 <div data-tabs>
    <div data-tab-buttons>
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
    </div>

    <div data-tab-content>
        <div>Content 1</div>
        <div>Content 2</div>
        <div>Content 3</div>
    </div>
</div>

<style>
    [data-tab-content] > * {
        display: none;
    }

    [data-tab-content] > *.is-active {
        display: block;
    }
</style>

```

#### JavaScript

```
import tabs from '@optimistdigital/core-js/lib/tabs';

tabs.init();

```
