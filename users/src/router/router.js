import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import HomeView from "@/views/common/HomeView.vue";
import RegisterVerifyView from "@/views/user/RegisterVerifyView.vue";
import WalkingRecordCalendarView from "@/views/user/WalkingRecordCalendarView.vue";
import UserInfoView from "@/views/user/UserInfoView.vue";
import RegisterSuccessView from "@/views/user/RegisterSuccessView.vue";
import FindPasswordView from "@/views/user/FindPasswordView.vue";
import ChangePasswordView from "@/views/user/ChangePasswordView.vue";

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
            component: RegisterVerifyView,
            props: route => ({
                verifyCode: route.query.verifyCode
            }),
        },
        {
            path: '/new-users',
            component: RegisterSuccessView
        },
        {
            path: '/walking-records/summary',
            component: WalkingRecordCalendarView,
            props: route => ({
                year: route.query.year,
                month: route.query.month,
            }),
        },
        {
            path: '/users/email',
            component: UserInfoView
        },
        {
            path: '/users/passwords/emails',
            component: FindPasswordView
        },
        {
            path: '/users/passwords',
            component: ChangePasswordView
        },

    ]
});

export default router;