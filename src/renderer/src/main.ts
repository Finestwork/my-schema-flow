import '@vue-flow/core/dist/style.css';
import '@vue-flow/minimap/dist/style.css';
import '@vue-flow/controls/dist/style.css';
import 'overlayscrollbars/overlayscrollbars.css';
import 'nprogress/nprogress.css';
import '@assets/css/fonts.css';
import '@assets/css/tailwind.css';
import '@assets/css/scrollbar.css';
import '@assets/css/vueflow.css';
import '@assets/css/nprogress.css';

import App from './App.vue';
import { numberOnly, noWhiteSpace } from '@directives/TextInputDirectives';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

createApp(App)
    .use(createPinia())
    .directive('number-only', numberOnly)
    .directive('no-white-space', noWhiteSpace)
    .mount('body');
