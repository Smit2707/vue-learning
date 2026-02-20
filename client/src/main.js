import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

/**
 * Vue application entry point
 * Initializes the app with router and global configurations
 */

const app = createApp(App);

// Use router
app.use(router);

// Mount the app
app.mount('#app');
