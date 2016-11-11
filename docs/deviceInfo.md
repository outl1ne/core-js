# Device info

A collection of functions to request information about the device.
We try to cache the values so any logic doesn't have to be run more than needed.

#### API

|Function|Description|
|---|---|
|init(options)|Initializes device info logic. This should only be called once.|
|getViewportWidth|Returns the viewport width using jQuery's $(window).width() function. If the `cacheViewport` option is true, the values will be cached on resize, so calling will not cause additional unnecessary reflows.|
|getViewportHeight|Returns the viewport height (same logic as getViewportWidth)|
|isTouchDevice|Returns true if the device has touch capabilities. NOTE: This doesn't mean that the device doesn't have a mouse pointer. I.e laptops with touchscreens might still return true.|
|isMobile|Looks at the userAgent to see if the device is likely a mobile device|
|isIpad|Looks at the userAgent to see if the device is likely an iPad|
|isAndroid|Looks at the userAgent to see if the device is likely using Android|
|isChromeiOS|Looks at the userAgent to see if the device is likely using Chrome on iOS|
|isIE|Looks at the userAgent to see if the browser is IE. Returns "false" if not IE. If the browser is IE, it will return an integer representing the version of IE.|

#### Options

|Option|Default|Description|
|---|---|---|
|cacheViewport|false|If set to true, viewport size will automatically be recorded whenever there is a resize, to be used with getViewportWidth/getViewportHeight. Turn this on if you need to ask for the viewport size at random points in your app. Turn it off if you never need to do this. |
