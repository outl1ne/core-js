# Modals

Controls a modal's opened status with a `data-modal-open` attribute. The html element also gets a `data-{modalName}-open` class when a modal is open.

Modals can be used with data attributes or the JavaScript API.

Note: We don't add any styles to the modals. You should use the data-modal-open attribute to toggle visibility with CSS.

## Example

#### HTML

```
<button data-modal-opener="checkout-modal">Open modal</button>

<div data-modal="checkout-modal">
  <button data-modal-closer="checkout-modal">Close modal</button>
  <div>Content here!</div>
</div>

<style>
    [data-modal="checkout-modal"] { display: none; }
    [data-modal="checkout-modal"][data-modal-open="true"] { display: block; }
</style>
```

#### JavaScript

```js
import modals from '@optimistdigital/core-js/lib/modals';

/**
 * Initialize modal logic
 */
modals.init();

/**
 * Event listeners can be used to react to the modal opening and closing
 */
window.addEventListener('modal:opened', evt => console.log(evt.detail.name));
window.addEventListener('modal:closed', evt => console.log(evt.detail.name));

/**
 * JS API can be used to open and close the modal
 */
modals.openModal('checkout-modal');
modals.closeModal('checkout-modal'); // Passing in DOM node works too
```

## Data attributes

| Attribute                                       | Description                                                                                                             |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| data-modal="modal name"                         | Modal's name. This will be the modal's container.                                                                       |
| data-modal-[toggler/opener/closer]="modal name" | Toggles/opens/closes the modal when clicked. Can be placed anywhere in the DOM                                          |
| data-modal-open="false"                         | Gets automatically placed on the modal's container. Keeps track of whether the modal is open or not. Defaults to false. |
| data-close-on-esc="true"                        | Whether or not pressing escape should close the modal. True by default.                                                 |

## JavaScript API

| Function           | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| init(options)      | Initializes modal logic. This should only be called once.   |
| openModal(modal)   | Opens the modal. Takes the modal name or container DOM node |
| closeModal(modal)  | Closes the modal                                            |
| toggleModal(modal) | Toggles the modal                                           |

## Events

| Event                                       | event.detail                                                     | Description                                         |
| ------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------- |
| window.addEventListener('modal:closed', cb) | `{type: "modal:opened", $modal: DOMElement, name: "modal-name"}` | Dispatched when a modal changes from open to closed |
| window.addEventListener('modal:opened', cb) | `{type: "modal:closed", $modal: DOMElement, name: "modal-name"}` | Dispatched when a modal changes from closed to open |
