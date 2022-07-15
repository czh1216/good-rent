import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
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
        name: 'information',
        component: () => import('@/views/Information')
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/Mine')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
