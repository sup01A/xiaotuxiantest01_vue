import {createRouter} from "vue-router";
import {createWebHistory} from "vue-router";
import {userRoleInfoStore} from "@/store/userRole.js";
import {userPageInfoStore} from "@/store/pageInfo.js";

const routes = [
    {
        path: '/',
        component: ()=> import('@/views/login.vue'),
        meta: {roleId : -1},
    },
    {
        path: '/adminHome',
        component: ()=> import('@/views/admin/home.vue'),
        meta: {roleId : 0},
    },
    {
        path: '/manageHome',
        component: ()=>import('@/views/manage/home.vue'),
        meta: {roleId : 1},
        children: [
            {
                path:'',
                component: ()=>import('@/views/manage/default.vue')
            },
            {
                path: 'majorManage',
                component: ()=> import('@/views/manage/major/majorManage.vue')
            },
            {
                path: 'documentCheck',
                component: ()=> import('@/views/manage/document/documentCheck.vue')
            },
            {
                path: 'loanCheck',
                component: ()=> import('@/views/manage/loan/loanCheck.vue')
            },
        ]
    },
    {
        path: '/financeHome',
        component: ()=> import('@/views/finance/home.vue'),
        meta: {roleId : 2},
    },
    {
        path: '/dormitoryHome',
        component: ()=> import('@/views/dormitory/home.vue'),
        meta: {roleId : 3},
    },
    {
        path: '/secretaryHome',
        component: ()=> import('@/views/secretary/home.vue'),
        meta: {roleId : 4},
    },
    {
        path: '/studentHome',
        component: ()=> import('@/views/student/home.vue'),
        meta: {roleId : 5},
        children: [
            {
                path:'',
                component: ()=>import('@/views/student/default.vue')
            },
            {
                path:'documentUpload',
                component: ()=>import('@/views/student/document/documentUpload.vue')
            },
            {
                path: 'documentCheck',
                component: ()=> import('@/views/student/document/documentCheck.vue')
            },
            {
                path: 'loanHandle',
                component: ()=> import('@/views/student/loan/loanHandle.vue')
            },
            {
                path: 'loanStatus',
                component: ()=> import('@/views/student/loan/loanStatus.vue')
            },
        ]
    },
    {
        path: '/upload',
        component: ()=>import('@/views/common/uploadTest.vue')
    },
    {
        path: '/test',
        component: ()=> import('@/views/test.vue'),
        meta: {roleId : -1},
    },

]
export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
router.beforeEach( (to, from, next)=>{
    const roleInfoStore = userRoleInfoStore();
    const pageInfoStore = userPageInfoStore();
    // const {userRoleData} = storeToRefs(roleInfoStore)
    if (to.meta.roleId !== roleInfoStore.userRoleData.roleId && to.meta.roleId !== -1 && to.meta.roleId !== undefined){

        console.log("不一样to:" + to.meta.roleId)
        console.log("不一样have:" + roleInfoStore.userRoleData.roleId)
        next('/')
    }else if (to.meta.roleId === -1){
        next()
    }else if(to.meta.roleId === undefined){
        next()
    } else {
        console.log("一样to:" + to.meta.roleId)
        console.log("一样have:" + roleInfoStore.userRoleData.roleId)
        console.log(pageInfoStore.paginationData.currentPageNum)
        next();
    }
})
