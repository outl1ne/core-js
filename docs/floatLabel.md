# lib&#x2F;floatLabel

FLOAT LABELS:
This code is meant to accompany float labels code (should be found in styles/components/_float-label.scss)
It adds a `has-text` class to any input that has text in it, so we can style the labels accordingly
NOTE: Prefilled password fields will not float until the user interacts with the page.
Examples of usage can be seen in tests or readme.md



* * *

### lib&#x2F;floatLabel.init(options) 

Starts checking input fields for text

**Parameters**

**options**: `object`, Starts checking input fields for text

 - **options.inputFieldSelector**: `string`, Class selector for the labels that the input belongs to

 - **options.hasTextClass**: `string`, The class to be added when the input has any text



### lib&#x2F;floatLabel.parseOptions(options) 

Sets variables based on options object, or defaults. This should only be called from init.

**Parameters**

**options**: `object`, Sets variables based on options object, or defaults. This should only be called from init.



### lib&#x2F;floatLabel.evaluateContent(inputEl) 

Checks if an element has any text in it, and adds a class accordingly

**Parameters**

**inputEl**: `object`, The DOM element whose content to evaluate



### lib&#x2F;floatLabel.evaluateAllFields($fields) 

Checks all given input fields if they have text in them

**Parameters**

**$fields**: `object`, jQuery object containing all the fields that should be checked




* * *










