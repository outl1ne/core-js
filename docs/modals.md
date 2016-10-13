# lib&#x2F;modals

MODALS:
Allows you to control whether an element should be shown by clicking buttons with a corresponding data attribute.
NOTE: This doesn't change any visual style itself. You have to use CSS to change the element's visibility.
Examples of usage can be seen in tests or readme.md

Functionality:
- When the user presses escape, all modals will be closed (unless they have data-close-on-esc="false")
- Custom events get dispatched when a modal is opened/closed:
  window.addEventListener('modal:opened', (evt) => { console.log(evt.detail.$modal, evt.detail.name) });
  window.addEventListener('modal:closed', (evt) => { console.log(evt.detail.$modal, evt.detail.name) });



* * *

### lib&#x2F;modals.init(options) 

Starts listening to click and key events, adds initial attributes if missing

**Parameters**

**options**: `object`, Starts listening to click and key events, adds initial attributes if missing

 - **options.reportOpenModals**: `boolean`, Whether or not the global container should report whether a modal is open or not. You can use this to add overflow: hidden on body when modals are open.

 - **options.globalContainerSelector**: `string | object`, Selector for the DOM element that will contain information about whether modals are open or not.

 - **options.containerAttribute**: `string`, Attr. for the modal container that will contain the modal's name

 - **options.togglerAttribute**: `string`, Attr. that contains a modal's name and will toggle that modal when clicked

 - **options.closerAttribute**: `string`, Attr. that contains a modal's name and will close that modal when clicked

 - **options.openerAttribute**: `string`, Attr. that contains a modal's name and will open that modal when clicked

 - **options.openAttribute**: `string`, Attr. that determines whether the modal is open or not.

 - **options.closeOnEscAttribute**: `string`, Attr. that determines whether the modal should close when the escape key is pressed. (Missing value is treated as true)

 - **options.disableGlobalClassAttribute**: `string`, Attr. that determines whether the global container should get a class indicating that the modal is open.



### lib&#x2F;modals.parseOptions(o) 

Sets variables based on options object, or defaults. This should only be called from the constructor.

**Parameters**

**o**: `object`, Options object (possible values documented in init())



### lib&#x2F;modals.closeAllModals() 

Closes all modals on the page



### lib&#x2F;modals.toggleModal(modal) 

Toggles the modal's open attribute

**Parameters**

**modal**: `object | string`, Name or jQuery element of the modal to be toggled. If the argument is a string, it will be interpreted as the modal's name. Otherwise, it will be interpreted as a jQuery element

**Returns**: `boolean`, Whether a modal was toggled or not. If no modal is found, false will be returned.


### lib&#x2F;modals.openModal(modal) 

Sets the modal's open attribute to true

**Parameters**

**modal**: `object | string`, Name or jQuery element of the modal to be toggled. If the argument is a string, it will be interpreted as the modal's name. Otherwise, it will be interpreted as a jQuery element

**Returns**: `boolean`, Whether a modal was opened or not. If no modal is found, false will be returned.


### lib&#x2F;modals.closeModal(modal) 

Sets the modal's open attribute to false

**Parameters**

**modal**: `object | string`, Name or jQuery element of the modal to be toggled. If the argument is a string, it will be interpreted as the modal's name. Otherwise, it will be interpreted as a jQuery element

**Returns**: `boolean`, Whether a modal was opened or not. If no modal is found, false will be returned.


### lib&#x2F;modals.isModalOpen(modal) 

MODALS:
Allows you to control whether an element should be shown by clicking buttons with a corresponding data attribute.
NOTE: This doesn't change any visual style itself. You have to use CSS to change the element's visibility.
Examples of usage can be seen in tests or readme.md

Functionality:
- When the user presses escape, all modals will be closed (unless they have data-close-on-esc="false")
- Custom events get dispatched when a modal is opened/closed:
  window.addEventListener('modal:opened', (evt) => { console.log(evt.detail.$modal, evt.detail.name) });
  window.addEventListener('modal:closed', (evt) => { console.log(evt.detail.$modal, evt.detail.name) });

**Parameters**

**modal**: `object | string`, Name or jQuery element of the modal to be toggled. If the argument is a string, it will be interpreted as the modal's name. Otherwise, it will be interpreted as a jQuery element

**Returns**: `Boolean`, Whether the modal is open or not


### lib&#x2F;modals.isAnyModalOpen() 

MODALS:
Allows you to control whether an element should be shown by clicking buttons with a corresponding data attribute.
NOTE: This doesn't change any visual style itself. You have to use CSS to change the element's visibility.
Examples of usage can be seen in tests or readme.md

Functionality:
- When the user presses escape, all modals will be closed (unless they have data-close-on-esc="false")
- Custom events get dispatched when a modal is opened/closed:
  window.addEventListener('modal:opened', (evt) => { console.log(evt.detail.$modal, evt.detail.name) });
  window.addEventListener('modal:closed', (evt) => { console.log(evt.detail.$modal, evt.detail.name) });

**Returns**: `Boolean`, True if any modal is currently open. If none of the modals are open, false.


### lib&#x2F;modals.togglerClick() 

jQuery event handler that finds the name of the toggler's corresponding modal and toggles it



### lib&#x2F;modals.openerClick() 

jQuery event handler that finds the name of the toggler's corresponding modal and opens it



### lib&#x2F;modals.closerClick() 

jQuery event handler that finds the name of the toggler's corresponding modal and closes it



### lib&#x2F;modals.initializeOpenAttributes() 

Sets open statuses of all modals to false if they're not already set by the developer



### lib&#x2F;modals.getJQueryObject(modal) 

Helper function to normalize the modal to a jQuery object, so the user can enter either the modal's name or jQuery object.

**Parameters**

**modal**: `object | string`, Modal's name, or jQuery object

**Returns**: `object`, jQuery object representing the modal


### lib&#x2F;modals.getClassFriendlyName(name) 

Classes can't have spaces in them, but modal names technically can, so we strip those spaces away when using them as part of a class

**Parameters**

**name**: `string`, Original name

**Returns**: `string`, Name that can be used as a class



* * *










