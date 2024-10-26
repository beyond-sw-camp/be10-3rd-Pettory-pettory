import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router.js";
import BootstrapVue3 from "bootstrap-vue-3";
import { createPinia } from "pinia";
import './assets/global.css';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(BootstrapVue3);
app.use(pinia);
app.mount('#app');
