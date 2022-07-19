import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/homepage'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout'),
    redirect: '/homepage',
    children: [
      {
        path: '/homepage',
        name: 'homepage',
        component: () => import('@/views/HomePage')
      },
      {
        path: '/house',
        name: 'house',
        component: () => import('@/views/House')
      },
      {
        path: '/information',
        component: () => import('@/views/Information')
      },
      { //登录页面
        path: '/mine',
        component: () => import('@/views/Mine')
      },
      { //收藏
        path: '/collect',
        component: () => import('@/views/collect')
      },
      {
        path: '/rentout',
        component: () => import('@/views/RentOut')
      }
    ]
  },
  {
    path: '/city',
    component: () => import('@/views/city')
  }
]

const router = new VueRouter({
  routes
})

export default router
