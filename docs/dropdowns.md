# Dropdowns

Uses data attributes to suggest whether a dropdown should be open or closed.

NOTE: This doesn't change any visual style itself. You have to use CSS to implement the hiding of the dropdown.

## Data attributes (_italics are optional_)

| Attribute                            | Description                                                                                                |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| data-dropdown                        | Marks the container for the dropdown                                                                       |
| data-dropdown-content                | Marks the content that shows up when the dropdown is open                                                  |
| data-toggle-dropdown                 | Toggles the parent dropdown when clicked                                                                   |
| _data-dropdown-open="false"_         | Gets automatically placed on the dropdown's container. Keeps track of whether the dropdown is open or not. |
| _data-close-on-esc="true"_           | Whether or not pressing escape should close the dropdown.                                                  |
| _data-keep-in-view="true"_           | Whether or not the dropdown's position should be transformed to ensure it doesn't go offscreen.            |
| _data-close-on-outside-click="true"_ | Whether or not the dropdown should be closed when the user clicks outside of it.                           |

## Example

### HTML

```
<div data-dropdown>
    <button data-toggle-dropdown>ET</button>
    <ul class="dropdown-content" data-dropdown-content>
        <li>lang 1</li>
        <li>lang 2</li>
        <li>lang 3</li>
    </ul>
</div>

<style>
      [data-dropdown-content] {
        display: none;
      }
      [data-dropdown-open='true'] [data-dropdown-content] {
        display: block;
      }
</style>

```

### JavaScript

```js
import dropdowns from '@optimistdigital/core-js/lib/dropdowns';

/**
 * Initializes the dropdown logic
 */

dropdowns.init();

/**
 * openDropdown/closeDropdown/toggleDropdown functions take the container's DOM node
 */

dropdowns.openDropdown(document.getElementById('language-switcher')); // Opens language-switcher dropdown
dropdowns.closeDropdown(document.getElementById('language-switcher')); // Closes language-switcher dropdown
dropdowns.toggleDropdown(document.getElementById('language-switcher')); // Toggles language-switcher dropdown
```
