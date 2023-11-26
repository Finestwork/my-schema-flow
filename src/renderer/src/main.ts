import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/css/fonts.css';
import './assets/css/tailwind.css';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/minimap/dist/style.css';
import '@vue-flow/controls/dist/style.css';

createApp(App).use(createPinia()).mount('body');
