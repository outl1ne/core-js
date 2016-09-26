# Optimist Digital | Core JS

This is a collection of JS functionalities that we commonly need to use. Documentation for each module can be found in the docs folder, or source code.

## Assumptions

We assume that $ is a globally accessible alias for jQuery.

## Usage

You can import each module individually, or use the default import which gives you an object of all the modules. You should then call the (default) init function to start the necessary logic for each module. Options can also be passed into some of these init functions. Example:

```
import { modals } from '@optimistdigital/core-js';
modals.init({ togglerAttribute: 'data-modal-btn' });
modals.closeAllModals();

import CoreJS from '@optimistdigital/core-js';
CoreJS.dropdowns.init({ contentAttribute: 'data-tooltip' });
```
## Testing

To test, type `npm test`
Tests are run using Mocha + jsdom on the build version.
