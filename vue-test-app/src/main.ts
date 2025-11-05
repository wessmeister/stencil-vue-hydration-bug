import { createApp } from 'vue';
import App from './App.vue';
import { defineCustomElements } from 'demo-components/loader';

defineCustomElements();

createApp(App).mount('#app');
