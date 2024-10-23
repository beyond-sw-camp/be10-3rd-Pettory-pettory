import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import CategoryList from "@/category/view/CategoryListView.vue";
import Board from "@/board/view/BoardView.vue"
import BoardPost from "@/board/components/BoardPost.vue";


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
            path : '/board/post/new',
            name : 'BoardPostNew',
            component : () => import('@/board/view/BoardPostCreateView.vue')
        }
    ]
});

export default router;