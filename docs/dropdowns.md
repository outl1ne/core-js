# Dropdowns

DROPDOWNS: Uses data attributes to suggest whether a dropdown should be open or closed. NOTE: This doesn't change any visual style itself. You have to use CSS to implement the hiding of the dropdown. A basic version of this is implemented in the .basic-dropdown class (\_basic-dropdown.scss). Examples of usage can be seen in tests or readme.md

Extra behaviour:

If the user clicks outside of the dropdown, it closes automatically if data-close-on-outside-click is true.
The dropdown content is kept in viewport automatically if the data-keep-in-view attribute is present.

## Example

#### HTML

```
<div data-dropdown="language-switcher">
    <button class="toggle-dropdown" data-toggle-dropdown="language-switcher">ET</button>
    <ul class="dropdown-content" data-dropdown-content="language-switcher">
        <li>lang 1</li>
        <li>lang 2</li>
        <li>lang 3</li>
    </ul>
</div>

<style>
      .dropdown-content {
        display: none;
      }
      [data-dropdown-open='true'] .dropdown-content {
        display: block;
      }
</style>

```

#### JavaScript

```
import dropdowns from '@optimistdigital/core-js/lib/dropdowns';

dropdowns.init();

dropdowns.openDropdown('language-switcher'); // Opens language-switcher dropdown
dropdowns.closeDropdown('language-switcher'); // Closes language-switcher dropdown
dropdowns.toggleDropdown('language-switcher'); // Toggles language-switcher dropdown

```
