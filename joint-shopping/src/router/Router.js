import {createRouter, createWebHistory} from "vue-router";
import MainView from "@/views/main/MainView.vue";
import GroupListView from "@/views/shopping-group/GroupListView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainView
        },
        {
            path: '/jointshopping',
            component: GroupListView
        },
    ]
});

export default router;