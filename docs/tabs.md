# Tabs

Adds 'is-active' class to to the clicked button and the corresponding content area. If initially active tab has not been set (by adding 'is-active' class to one of the buttons manually), the first tab will be active when the page is rendered.

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
