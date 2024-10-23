import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import CategoryList from "@/category/view/CategoryListView.vue";
import Board from "@/board/view/BoardView.vue"


const router = createRouter( {
    history: createWebHistory(),
    routes : [
        {
            path : '/board',
            name : 'board',
            component: () => import('@/board/view/BoardView.vue')
        },
        {
            path : '/board/category',
            name: 'CategoryList',
            component : CategoryList
        }
    ]
});

export default router;