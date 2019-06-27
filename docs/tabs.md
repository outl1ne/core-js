# Tabs

## Example

#### HTML

```
 <div data-tabs class="tabs">
            <div data-tab-buttons class="tab-buttons">
                <button>Tab 1</button>
                <button>Tab 2</button>
                <button>Tab 3</button>
            </div>

            <div data-tab-content class="tab-content">
                <div>Content 1</div>
                <div>Content 2</div>
                <div>Content 3</div>
            </div>
        </div>

        <style>
            [data-tab-buttons] button {
                display: gray;
            }

            [data-tab-buttons] button.is-active {
                background-color: lime;
            }

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
