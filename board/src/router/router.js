import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import CategoryList from "@/category/view/CategoryListView.vue";



const router = createRouter( {
    history: createWebHistory(),
    routes : [
        {
            path : '/board',
            name : 'Board',
            component: () => import('@/board/view/BoardView.vue')
        },
        {
            path : '/board/category',
            name: 'CategoryList',
            component : CategoryList
        },
        {
            path : '/board/post',
            name: 'BoardPost',
            component : () => import('@/board/view/BoardPostView.vue')
        },
        {
            path : '/board/post/:id',
            name : 'BoardPostDetail',
            component : () => import('@/board/view/BoardPostVIew.vue')
        },
        {
            path : '/',
            name : 'Main',
            component : () => import('@/main/view/MainView.vue')
        },
        {
            path : '/board/post/new',
            name : 'BoardPostCreate',
            component : () => import('@/board/view/BoardPostCreateView.vue')
        }
    ]
});

export default router;