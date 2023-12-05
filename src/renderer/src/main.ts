import './assets/css/fonts.css';
import './assets/css/tailwind.css';
import './assets/css/scrollbar.css';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/minimap/dist/style.css';
import '@vue-flow/controls/dist/style.css';
import './assets/css/vueflow.css';

import App from './App.vue';
import { NumberOnly } from '@renderer/directives/NumberOnly';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

createApp(App).use(createPinia()).directive('number-only', NumberOnly).mount('body');
