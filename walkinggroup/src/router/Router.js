import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path : '/',
            name : 'Main',
            component : () => import('@/main/view/MainView.vue')
        },
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
            path: '/walkinggroups/:id/edit',
            component: () => import('@/walkinggroup/views/WalkingGroupEdit.vue')
        },
        {
            path: '/registerwalkinggroups',
            component: () => import('@/walkingGroupApplication/views/RegisterWalkingGroupList.vue')
        },
        {
            path: '/registerwalkinggroups/:id',
            component: () => import('@/walkingGroupApplication/views/RegisterWalkingGroupDetail.vue')
        },
        {
            path: '/walkinggroupapplications',
            component: () => import('@/walkingGroupApplication/views/WalkingGroupApplicationList.vue')
        },
        {
            path: '/walkinggrouprecords/:id',
            component: () => import('@/walkingGroupApplication/views/WalkingGroupRecordList.vue')
        },
        {
            path: '/walkinggrouprecords/:id/create',
            component: () => import('@/WalkingGroupApplication/views/WalkingGroupRecordCreate.vue')
        },
        {
            path: '/walkinggrouprecords/:id/edit',
            component: () => import('@/walkingGroupApplication/views/WalkingGroupRecordEdit.vue')
        }
    ]
})

export default router;