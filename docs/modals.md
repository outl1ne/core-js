# Modals

Modals can be used with only data attributes, but there is a JavaScript API to interact with the modals.
Note: We don't add any styles to the modals. You should use the data-modal-open attribute to toggle visibility with CSS.

## Example

#### HTML
```
<button data-modal-opener="checkout-modal"></button>

<div data-modal="checkout-modal">
  <button data-modal-closer="checkout-modal"></button>
  <div>Content here!</div>
</div>

<style>
    [data-modal="checkout-modal"] { display: none; }
    [data-modal="checkout-modal"][data-modal-open="true"] { display: block; }
</style>
```

#### JavaScript

```
import { modals } from '@optimistdigital/core-js';

modals.init();
window.addEventListener('modal:opened', evt => console.log(evt.detail.name));

modals.openModal('checkout-modal'); // Logs "checkout-modal"
modals.closeModal($('[data-modal="checkout-modal"]')); // Passing in jquery object instead of modal name works too
```

#### Data attributes (the names for these can be configured)

|Attribute|Description|
|---|---|
|data-modal="modal name"|Modal's name. Place this in the modal's container element.|
|data-modal-[toggler/opener/closer]="modal name"|Toggles/opens/closes the corresponding modal when clicked. These can be placed anywhere in the DOM|
|data-modal-open=["true"/"false"]|Exists on the same element as data-modal. Says whether the modal is open or not. You can set this to true by default. If not present, we automatically set this to false.|
|data-close-on-esc="true"|Whether or not pressing escape should close the modal. True by default.|
|data-disable-global-class|By default, open modals get a corresponding `modal-modalname-open` class on the global container (html element by default). This disables that behaviour|

#### JavaScript API

|Function|Description|
|---|---|
|init(options)|Initializes modal logic. This should only be called once.|
|openModal(modal)|Opens the modal|
|closeModal(modal)|Closes the modal|
|toggleModal(modal)|Toggles the modal|
|closeAllModals()|Closes all currently open modals|
|isAnyModalOpen()|Returns true if any modal is currently open|
|isModalOpen(modal)|Returns true if the modal is open|

#### Events

|Event|event.detail|Description|
|---|---|---|
|window.addEventListener('modal:closed', cb)|`{type: "modal:opened", $modal: jQuery.fn.init[1], name: "modal-name"}`|Dispatched when a modal is closed. Not dispatched when trying to open a modal that's already open.|
|window.addEventListener('modal:opened', cb)|{`type: "modal:closed", $modal: jQuery.fn.init[1], name: "modal-name"}`|Dispatched when a modal is opened. Not dispatched when trying to close a modal that's already closed.|

#### Options

Most of these are just for customizing the data attributes that you will be use, and can probably left default

|Option|Default|Description|
|---|---|---|
|globalContainerSelector|$(document.documentElement)|Selector for the DOM element that will contain information about whether modals are open or not.|
|reportOpenModals|true|Whether or not the global container should report whether a modal is open or not. You can use this to add overflow: hidden on body when modals are open.|
|containerAttribute|'data-modal'|Attr. for the modal container that will contain the modal's name|
|togglerAttribute|'data-modal-toggler'|Attr. that contains a modal's name and will toggle that modal when clicked|
|closerAttribute|'data-modal-closer'|Attr. that contains a modal's name and will close that modal when clicked|
|openerAttribute|'data-modal-opener'|Attr. that contains a modal's name and will open that modal when clicked|
|openAttribute|'data-modal-open'|Attr. that determines whether the modal is open or not.
|closeOnOutsideAttribute|'data-close-on-esc'|Attr. that determines whether the modal should close when the escape key is pressed. (Missing value is treated as true)|
|closeOnOutsideAttribute|'data-disable-global-class'|Attr. that determines whether the global container should get a class indicating that the modal is open.|
