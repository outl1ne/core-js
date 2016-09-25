/**
 * OPTIMIZED EVENTS:
 * Creates events called "optimizedResize" and "optimizedScroll" that will listen to scroll/resize events,
 * optimized with requestAnimationFrame to prevent them from getting called too much. This should help
 * with performance, but will get called less often than the native scroll/resize events.
 * This code also polyfills CustomEvent if it doesn't already exist.
 *
 * @module lib/optimizedEvents
 */

/* eslint-disable */

import './polyfill/CustomEvent';

(function() {
    'use strict';
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    throttle ('resize', 'optimizedResize');
    throttle ('scroll', 'optimizedScroll');
})();
