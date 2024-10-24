import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/walkinggroups',
            component: () => import('@/walkinggroup/views/WalkingGroupList.vue')
        },
        {
            path: '/walkinggroups/:id',
            component: () => import('@/walkinggroup/views/WalkingGroupDetail.vue')
        },
        {
            path: '/walkinggroups/create',
            component: () => import('@/walkinggroup/views/WalkingCreate.vue')
        },
        {
            path: '/walkinggroups/edit',
            component: () => import('@/walkinggroup/views/WalkingGroupEdit.vue')
        }
    ]
})

export default router;