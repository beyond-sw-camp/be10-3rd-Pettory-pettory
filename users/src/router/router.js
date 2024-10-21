import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import HomeView from "@/views/common/HomeView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomeView
        },
        {
            path: '/login',
            component: LoginView
        },
        {
            path: '/users',
            component: RegisterView
        },
    ]
});

export default router;