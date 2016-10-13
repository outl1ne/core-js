This is a collection of JS functionalities that we commonly need to use. Documentation for each module can be found in the docs folder, or source code.

We assume that $ is a globally accessible alias for jQuery.


# Modals

Modals can be used with only data attributes, but there is a JavaScript API to interact with the modals.
Note: We don't add any styles to the modals. You should use the data-modal-open attribute to toggle visibility with CSS.

## Example

#### HTML
```
<button data-modal-opener="checkout-modal"></button>

<div data-modal="checkout-modal">
  <button data-modal-closer="testmodal"></button>
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

More thorough documentation is in the docs folder

|Function|Description|
|---|---|
|init(options)|Initializes modal logic. This should only be called once.|
|openModal(modal)|Opens the modal|
|closeModal(modal)|Closes the modal|
|toggleModal(modal)|Toggles the modal|
|closeAllModals()|Closes all currently open modals|
|isAnyModalOpen()|Returns true if any modal is currently open|

#### Events

|Event|event.detail|Description|
|---|---|---|
|window.addEventListener('modal:closed', cb)|`{type: "modal:opened", $modal: jQuery.fn.init[1], name: "modal-name"}`|Dispatched when a modal is closed. Not dispatched when trying to open a modal that's already open.|
|window.addEventListener('modal:opened', cb)|{`type: "modal:closed", $modal: jQuery.fn.init[1], name: "modal-name"}`|Dispatched when a modal is opened. Not dispatched when trying to close a modal that's already closed.|

## Testing

To test, type `npm test`
Tests are run using Mocha + jsdom on the build version.
