// SCSS entry. In production, the contents are extracted into a separate file. In dev, JS loads the CSS dynamically.
import '../scss/entry.scss';
// Polyfills
import 'core-js/stable';

import { modals, dropdowns } from '../../../dist';

modals.init();
dropdowns.init();
