import './lib/polyfill/requestAnimationFrame'; // Polyfills requestAnimationFrame (CustomEvent depends on this)
import './lib/polyfill/CustomEvent'; // Polyfills custom events

import { initSmoothScrollToAnchor } from './lib/smoothScroll';
import * as modals from './lib/modals';
import * as floatLabel from './lib/floatLabel';
import * as dropdowns from './lib/dropdowns';
import * as deviceInfo from './lib/deviceInfo';
import * as optimizedEvents from './lib/optimizedEvents';
import * as customEvents from './lib/customEvents';

export { initSmoothScrollToAnchor, modals, floatLabel, dropdowns, deviceInfo, optimizedEvents, customEvents };
export default { initSmoothScrollToAnchor, modals, floatLabel, dropdowns, deviceInfo, optimizedEvents, customEvents };
