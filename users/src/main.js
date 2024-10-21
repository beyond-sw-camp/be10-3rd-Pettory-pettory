import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router.js"

// common 컴포넌트 자동 전역 등록

const app = createApp(App);
app.use(router);
app.mount("#app");