import {createRouter, createWebHistory} from "vue-router";
import MainView from "@/views/main/MainView.vue";
import GroupListView from "@/views/shopping-group/GroupListView.vue";
import GroupView from "@/views/shopping-group/GroupView.vue";
import GroupEditView from "@/views/shopping-group/GroupEditView.vue";
import GroupCreateView from "@/views/shopping-group/GroupCreateView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainView
        },
        {
            path: '/shoppinggroup',
            component: GroupListView
        },
        {
            path: '/shoppinggroup/:id',
            component: GroupView
        },
        {
            path: '/shoppinggroup/create',
            component: GroupCreateView
        },
        {
            path: '/shoppinggroup/:id/edit',
            component: GroupEditView
        },
    ]
});

export default router;