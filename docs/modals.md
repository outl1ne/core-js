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
modals.closeModal('checkout-modal'); // Passing in jquery object works too
```

## Data attributes

| Attribute                                       | Description                                                                                                                                              |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-modal="modal name"                         | Modal's name. This will be the modal's container.                                                                                                        |
| data-modal-[toggler/opener/closer]="modal name" | Toggles/opens/closes the modal when clicked. Can be placed anywhere in the DOM                                                                           |
| data-modal-open=["true"/"false"]                | Gets automatically placed on the modal's container. Keeps track of whether the modal is open or not. Defaults to false.                                  |
| data-close-on-esc="true"                        | Whether or not pressing escape should close the modal. True by default.                                                                                  |
| data-disable-global-class                       | By default, open modals get a corresponding `modal-modalname-open` class on the global container (html element by default). This disables that behaviour |

## JavaScript API

| Function           | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| init(options)      | Initializes modal logic. This should only be called once.   |
| openModal(modal)   | Opens the modal                                             |
| closeModal(modal)  | Closes the modal                                            |
| toggleModal(modal) | Toggles the modal                                           |
| closeAllModals()   | Closes all currently open modals                            |
| isAnyModalOpen()   | Returns true if any modal is currently open                 |
| isModalOpen(modal) | Returns true if the modal is open                           |
| dispose()          | Shuts down the modal logic by clearing all event listeners. |

## Events

| Event                                       | event.detail                                                            | Description                                         |
| ------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------- |
| window.addEventListener('modal:closed', cb) | `{type: "modal:opened", $modal: jQuery.fn.init[1], name: "modal-name"}` | Dispatched when a modal changes from open to closed |
| window.addEventListener('modal:opened', cb) | {`type: "modal:closed", $modal: jQuery.fn.init[1], name: "modal-name"}` | Dispatched when a modal changes from closed to open |

## Options

Most of these are just for customizing the data attributes that you will be use, and can probably left default

| Option           | Default | Description                                                                                                                                          |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| reportOpenModals | true    | Whether or not the html element should report whether a modal is open or not. You can use this to add overflow: hidden on body when modals are open. |
