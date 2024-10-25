import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";


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
            component: () => import('@/views/user/UserInfoView.vue'),
            meta: {requiresAuth: true},
        },
        {
            // 비밀번호 찾기 화면
            path: '/users/passwords/emails',
            component: () => import('@/views/user/FindPasswordView.vue')
        },
        {
            // 비밀번호 변경 화면
            path: '/users/passwords',
            component: () => import('@/views/user/ChangePasswordView.vue'),
            meta: {requiresAuth: true},

        },

    ]
});

// 로그인 안 한 상태에셔 url 에 경로 입력하여 접근하는 동작 막기
// route 이동 전 인증 상태를 확인한다.
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // 인증이 필요한 페이지에 접근할 때
    if (to.meta.requiresAuth && !authStore.accessToken) {
        next({path: '/login'}); //  로그인 페이지로 리디렉션
    }
    // 로그인 한 후 로그인, 회원가입 페이지에 접근할 때
    else if (authStore.accessToken && (to.path === '/login' || to.path === '/users')) {
        next({path: '/users/email'});  // 마이페이지로 리디렉션
    }
    else {
        next();
    }
});

export default router;