import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";

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