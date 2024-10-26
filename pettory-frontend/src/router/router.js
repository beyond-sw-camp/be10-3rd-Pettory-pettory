import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import GroupListView from "@/views/joint-shopping/GroupListView.vue";
import GroupView from "@/views/joint-shopping/GroupView.vue";
import GroupCreateView from "@/views/joint-shopping/GroupCreateView.vue";
import GroupEditView from "@/views/joint-shopping/GroupEditView.vue";
import GroupParticipationView from "@/views/joint-shopping/GroupParticipationView.vue";
import CounselingCategoryList from "@/views/counseling/category/CategoryListView.vue";
import BoardCategoryList from "@/views/board/category/CategoryListView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            // 로그인 화면
            path : '/',
            name : 'Main',
            component : () => import('@/views/MainView.vue')
        },
        {
            // 로그인 화면
            path: '/login',
            component: () => import('@/views/users/LoginView.vue')
        },
        {
            // 회원가입 화면
            path: '/users',
            component: () => import('@/views/users/RegisterView.vue')
        },
        {
            // 이메일 인증코드 입력 화면
            path: '/users/emails/codes',
            component: () => import('@/views/users/RegisterVerifyView.vue'),
            props: route => ({
                verifyCode: route.query.verifyCode
            }),
        },
        {
            // 이메일 인증 성공 후 화면
            path: '/new-users',
            component: () => import('@/views/users/RegisterSuccessView.vue')
        },
        {
            // 마이페이지 화면
            path: '/users/email',
            component: () => import('@/views/users/UserInfoView.vue'),
            meta: {requiresAuth: true},
        },
        {
            // 비밀번호 찾기 화면
            path: '/users/passwords/emails',
            component: () => import('@/views/users/FindPasswordView.vue')
        },
        {
            // 비밀번호 변경 화면
            path: '/users/passwords',
            component: () => import('@/views/users/ChangePasswordView.vue'),
            meta: {requiresAuth: true},

        },

        {
            path: '/walkinggroups',
            component: () => import('@/views/walkinggroup/walkinggroup/WalkingGroupListView.vue')
        },
        {
            path: '/walkinggroups/:id',
            component: () => import('@/views/walkinggroup/walkinggroup/WalkingGroupDetailView.vue')
        },
        {
            path: '/walkinggroups/create',
            component: () => import('@/views/walkinggroup/walkinggroup/WalkingCreateView.vue')
        },
        {
            path: '/walkinggroups/:id/edit',
            component: () => import('@/views/walkinggroup/walkinggroup/WalkingGroupEditView.vue')
        },
        {
            path: '/registerwalkinggroups',
            component: () => import('@/views/walkinggroup/WalkingGroupApplication/RegisterWalkingGroupListView.vue')
        },
        {
            path: '/registerwalkinggroups/:id',
            component: () => import('@/views/walkinggroup/WalkingGroupApplication/RegisterWalkingGroupDetailView.vue')
        },
        {
            path: '/walkinggroupapplications',
            component: () => import('@/views/walkinggroup/WalkingGroupApplication/WalkingGroupApplicationListView.vue')
        },
        {
            path: '/walkinggrouprecords/:id',
            component: () => import('@/views/walkinggroup/WalkingGroupApplication/WalkingGroupRecordListView.vue')
        },
        {
            path: '/walkinggrouprecords/:id/create',
            component: () => import('@/views/walkinggroup/WalkingGroupApplication/WalkingGroupRecordCreateView.vue')
        },
        {
            path: '/walkinggrouprecords/:id/edit',
            component: () => import('@/views/walkinggroup/WalkingGroupApplication/WalkingGroupRecordEditView.vue')
        },


        {
            path: '/shoppinggroup',
            component: GroupListView,
            meta: {requiresAuth: true},
        },
        {
            path: '/shoppinggroup/:id',
            component: GroupView,
            meta: {requiresAuth: true},
        },
        {
            path: '/shoppinggroup/create',
            component: GroupCreateView,
            meta: {requiresAuth: true},
        },
        {
            path: '/shoppinggroup/:id/edit',
            component: GroupEditView,
            meta: {requiresAuth: true},
        },
        {
            path: '/shoppinggroup/:id/participation',
            component: GroupParticipationView,
            meta: {requiresAuth: true},
        },


        {
            path : '/counseling',
            name : 'Counseling',
            component: () => import('@/views/counseling/counseling/CounselingView.vue')
        },
        {
            path : '/counseling/category',
            name: 'CategoryList',
            component : CounselingCategoryList
        },
        {
            path : '/counseling/question',
            name: 'CounselingQuestion',
            component : () => import('@/views/counseling/counseling/CounselingQuestionView.vue')
        },
        {
            path : '/counseling/question/new',
            name : 'CounselingQuestionCreate',
            component : () => import('@/views/counseling/counseling/CounselingQuestionCreateView.vue')
        },


        {
            path : '/board',
            name : 'Board',
            component: () => import('@/views/board/board/BoardView.vue')

        },
        {
            path : '/board/category',
            name: 'CategoryList',
            component : BoardCategoryList
        },
        {
            path : '/board/post',
            name: 'BoardPost',
            component : () => import('@/views/board/board/BoardPostView.vue')
        },
        {
            path : '/board/post/new',
            name : 'BoardPostCreate',
            component : () => import('@/views/board/board/BoardPostCreateView.vue')
        }
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