import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import { Toast } from 'vant'

Vue.use(Toast)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  // 重定向
  {
    path: '/',
    redirect: '/HomePage/home'
  },
  // 主页面
  {
    path: '/HomePage', // 主界面
    component: () => import('@/views/HomePage'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'goHome',
        component: () => import('@/views/goHome')
      },
      {
        path: 'info',
        component: () => import('@/views/info')
      },
      {
        path: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  // 登陆页面
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  // 收藏
  {
    path: '/favorate',
    component: () => import('@/views/favorate'),
    beforeEnter: (to, from, next) => {
      if (store.state.token) {
        next()
      } else {
        return next('/login')
      }
    }
  },
  // 出租1级路由
  {
    path: '/rent',
    component: () => import('@/views/rent'),
    children: [
      // 我的出租
      {
        path: '',
        component: () => import('@/views/rent/components/rentIndex'),
        beforeEnter: (to, from, next) => {
          if (store.state.token) {
            next()
          } else {
            return next('/login')
          }
        }
      },
      // 添加房源
      {
        path: 'add',
        component: () => import('@/views/rent/components/add'),
        beforeEnter: (to, from, next) => {
          if (store.state.token) {
            next()
          } else {
            Toast.fail('暂无权限,请先登录')
          }
        }
      },
      // 房源搜索区域
      {
        path: 'search',
        component: () => import('@/views/rent/components/search')
      }
    ]
  },
  // 城市列表
  {
    path: '/city',
    component: () => import('@/views/city')
  },
  // 具体商品内容
  {
    path: '/detail',
    component: () => import('@/views/detail'),
    beforeEnter: (to, from, next) => {
      if (to.query.id) {
        next()
      } else {
        Toast.fail('哥么哥么,这里直接可不兴直接跳转啊~~~')
      }
    }
  },
  {
    path: '/map',
    component: () => import('@/views/map')
  },
  // 编辑个人资料
  {
    path: '/smessage',
    component: () => import('@/views/my/smessage')
  }
]

const router = new VueRouter({
  routes
})

export default router
