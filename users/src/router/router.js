import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import HomeView from "@/views/common/HomeView.vue";
import RegisterVerifyView from "@/views/user/RegisterVerifyView.vue";
import UserInfoView from "@/views/user/UserInfoView.vue";
import RegisterSuccessView from "@/views/user/RegisterSuccessView.vue";
import FindPasswordView from "@/views/user/FindPasswordView.vue";
import ChangePasswordView from "@/views/user/ChangePasswordView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            // 홈 화면
            path: '/',
            component: () => import('@/views/common/HomeView.vue')
        },
        {
            // 로그인 화면
            path: '/login',
            component: () => import('@/views/user/LoginView.vue')
        },
        {
            // 회원가입 화면
            path: '/users',
            component: () => import('@/views/user/RegisterView.vue')
        },
        {
            // 이메일 인증코드 입력 화면
            path: '/users/emails/codes',
            component: () => import('@/views/user/RegisterVerifyView.vue'),
            props: route => ({
                verifyCode: route.query.verifyCode
            }),
        },
        {
            // 이메일 인증 성공 후 화면
            path: '/new-users',
            component: () => import('@/views/user/RegisterSuccessView.vue')
        },
        {
            // 마이페이지 화면
            path: '/users/email',
            component: () => import('@/views/user/UserInfoView.vue')
        },
        {
            // 비밀번호 찾기 화면
            path: '/users/passwords/emails',
            component: () => import('@/views/user/FindPasswordView.vue')
        },
        {
            // 비밀번호 변경 화면
            path: '/users/passwords',
            component: () => import('@/views/user/ChangePasswordView.vue')
        },

    ]
});

export default router;