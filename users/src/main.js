import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router.js"
import VCalendar from 'v-calendar';
import {createPinia} from "pinia";

const app = createApp(App);
const pinia = createPinia();
app.use(VCalendar, {componentPrefix: 'v'});
app.use(pinia);
app.use(router);
app.mount("#app");