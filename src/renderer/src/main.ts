import { createApp } from 'vue'
import {createPinia} from "pinia";
import App from './App.vue'
import './assets/css/tailwind.css';
import '@vue-flow/core/dist/style.css';

createApp(App).use(createPinia()).mount('#app')
