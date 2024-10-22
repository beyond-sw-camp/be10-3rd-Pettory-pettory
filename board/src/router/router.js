import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import CategoryList from "@/category/view/CategoryList.vue";
import Board from "@/board/view/Board.vue"


const router = createRouter( {
    history: createWebHistory(),
    routes : [
        {
            path : '/board',
            name : 'board',
            component: () => import('@/board/view/Board.vue')
        },
        {
            path : '/board/category',
            name: 'CategoryList',
            component : CategoryList
        }
    ]
});

export default router;