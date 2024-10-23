import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import HomeView from "@/views/common/HomeView.vue";
import RegisterVerifyView from "@/views/user/RegisterVerifyView.vue";
import WalkingRecordCalendar from "@/views/user/WalkingRecordCalendarView.vue";
import WalkingRecordCalendarView from "@/views/user/WalkingRecordCalendarView.vue";

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
        {
            path: '/users/emails/codes',
            component: RegisterVerifyView
        },
        {
            path: '/users/emails/codes/home',
            component: RegisterVerifyView
        },
        {
            path: '/users/emails/codes/home',
            component: RegisterVerifyView
        },
        {
            path: '/walking-records/summary',
            component: WalkingRecordCalendarView,
            props: route => ({
                year: route.query.year,
                month: route.query.month,
                petId: route.query.petId
            }),
        },
    ]
});

export default router;