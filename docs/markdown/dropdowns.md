# lib&#x2F;dropdowns

DROPDOWNS:
Uses data attributes to suggest whether a dropdown should be open or closed.
NOTE: This doesn't change any visual style itself. You have to use CSS
to implement the hiding of the dropdown. A basic version of this is
implemented in the `.basic-dropdown` class (_basic-dropdown.scss).
Examples of usage can be seen in tests or readme.md

Extra behaviour:
- If the user clicks outside of the dropdown, it closes automatically if data-close-on-outside-click is true.
- The dropdown content is kept in viewport automatically if the `data-keep-in-view` attribute is present.



* * *

### lib&#x2F;dropdowns.init(options) 

Adds event listeners

**Parameters**

**options**: `object`, Adds event listeners

 - **options.togglerAttribute**: `string`, Attr. for child elements that toggle the dropdown on click

 - **options.keepInViewAttribute**: `string`, Attr. that determines whether the dropdown is kept in viewport automatically

 - **options.containerAttribute**: `string`, Attr. for the containing element that keeps track of whether or not the dropdown is open

 - **options.contentAttribute**: `string`, Attr. marking the visible content of the dropdown

 - **options.closeOnOutsideAttribute**: `string`, Attr. that determines whether the dropdown should close when mouseclick happens on the outside



### lib&#x2F;dropdowns.parseOptions(options) 

Sets variables based on options object, or defaults. This should only be called from init.

**Parameters**

**options**: `object`, Sets variables based on options object, or defaults. This should only be called from init.



### lib&#x2F;dropdowns.toggleDropdown($dropdown) 

Toggles the dropdown by changing the container attribute's value to true/false

**Parameters**

**$dropdown**: `object`, jQuery object corresponding to the dropdown container



### lib&#x2F;dropdowns.keepInViewport() 

Keeps all the dropdowns in view that have the keepInViewAttribute



### lib&#x2F;dropdowns.closeDropdowns() 

Closes all the dropdowns that have the closeOnOutsideAttribute




* * *










