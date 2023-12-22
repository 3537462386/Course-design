import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',   // 根路径   login 
            // http 状态码  302 跳转 浏览器 
            redirect: '/login'  // 跳转
        },
        {
            path: '/student',
            name: 'student',
            component: () => import('@/views/student.vue')    
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue')    
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/register.vue')    
        }

    ]
})

export default router