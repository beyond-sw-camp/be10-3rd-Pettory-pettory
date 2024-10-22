import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import CategoryList from "@/view/CategoryList.vue";
import Board from "@/view/Board.vue"


const router = createRouter( {
    history: createWebHistory(),
    routes : [
        {
            path : '/board',
            name : 'board',
            component: () => import('@/view/Board.vue')
        },
        {
            path : '/board/category',
            name: 'CategoryList',
            component : CategoryList
        }
    ]
});

export default router;