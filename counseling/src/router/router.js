import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import CategoryList from "@/category/view/CategoryListView.vue";



const router = createRouter( {
    history: createWebHistory(),
    routes : [
        {
            path : '/counseling',
            name : 'Counseling',
            component: () => import('@/views/question/CounselingView.vue')
        },
        {
            path : '/counseling/category',
            name: 'CategoryList',
            component : CategoryList
        },
        {
            path : '/counseling/question',
            name: 'CounselingQuestion',
            component : () => import('@/views/question/CounselingQuestionView.vue')
        },
        {
            path : '/counseling/question/:id',
            name : 'CounselingQuestionDetail',
            component : () => import('@/views/question/CounselingQuestionView.vue')
        },
        {
            path : '/',
            name : 'Main',
            component : () => import('@/views/main/Main.vue')
        },
        {
            path : '/counseling/question/new',
            name : 'CounselingQuestionCreate',
            component : () => import('@/views/question/CounselingQuestionCreateView.vue')
        }
    ]
});

export default router;