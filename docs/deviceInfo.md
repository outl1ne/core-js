# lib&#x2F;deviceInfo

DEVICE INFO:
This module provides information about the device (OS, browser, etc)



* * *

### lib&#x2F;deviceInfo.init(options) 

Immediately caches the values, instead of waiting for them to be asked for.
Also adds corresponding classes to the html element

**Parameters**

**options**: `object`, Immediately caches the values, instead of waiting for them to be asked for.
Also adds corresponding classes to the html element

 - **options.cacheViewport**: `boolean`, Whether the viewport dimensions should be cached automatically on resize.



### lib&#x2F;deviceInfo.getViewportWidth() 

Returns the width of the viewport.

**Returns**: `number`, Cached viewport width


### lib&#x2F;deviceInfo.isTouchDevice() 

Detects if the device has touch capabilities.
NOTE: This does not mean that it doesn't have other capabilities (like mouse),
for example laptops with an optional touch screen

**Returns**: `boolean`, If the device has touch capabilities


### lib&#x2F;deviceInfo.isMobile() 

Returns true if the device is a mobile device



### lib&#x2F;deviceInfo.isIpad() 

Returns true if the device is an iPad



### lib&#x2F;deviceInfo.isAndroid() 

Returns true if the device is using Android



### lib&#x2F;deviceInfo.isChromeiOS() 

Returns true if the device is using Chrome on iOS



### lib&#x2F;deviceInfo.onResize() 

Called by the window resize event, updates viewport information




* * *










