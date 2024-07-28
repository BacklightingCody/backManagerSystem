import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'
import { startProgress, closeProgress } from '@/utils/progressBar'
import { useUserStore } from '@/stores'
// 单独提出来加上type类型
import type { RouterOptions, Router, RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from './asyncRoutes'
// 自定义的 RouteRecordRaw 类型，将 redirect 属性设为可选的
// interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, 'redirect'> {
//   redirect?: RouteRecordRaw['redirect'];
// }
// 默认路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    // meta: {
    //   title: '',
    //   roles: ['超级管理员']
    // },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'index',
        meta: {
          title: '首页',
          roles: ['超级管理员']
        },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  // 登录和404
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页',
      roles: ['超级管理员']
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404',
      roles: ['超级管理员']
    },
    component: () => import('@/views/404.vue')
  }
]

// RouterOptions是路由选项类型
const options: RouterOptions = {
  history: createWebHistory(),
  routes
}

// Router是路由对象类型
export const router: Router = createRouter(options)
router.beforeEach(async (to, from, next) => {
  startProgress()
  const userStore = useUserStore()
  const token = getToken()
  //  先进行权限校验，然后判断有无token进行登录
  if (!token && to.path !== '/login') {
    ElNotification({
      title: '请先登录',
      type: 'warning'
    })
    return next({ path: '/login' })
  }
  //  如果已经登录，则防止重复登录
  if (token && to.path === '/login') {
    ElNotification({
      title: '请勿重新登录！',
      type: 'warning'
    })
    return next({ path: from.path || '/' })
  }
  // 如果 token 存在且用户信息未获取，则获取用户信息
  let hasNewRoutes = false
  if (token) {
    // console.log(userStore.isGetedInfo, 'kxc')
    if (!userStore.isGetedInfo) {
      await userStore.getUserInfo()
    }
    hasNewRoutes = addRouteDynamical(userStore.user!.menus)
  }
  // 设置页面标题
  const title = (to.meta.title ? to.meta.title : '') + '-Vite'
  document.title = title
  console.log(to)
  hasNewRoutes ? next(to.fullPath) : next()
  // hasNewRoutes ? next() : next(to.fullPath)
  // next()
})

router.afterEach((to, from, next) => {
  closeProgress()
})
// 动态添加路由export const addRouteDynamical = (routes: RouteRecordRaw[]) => {
export const addRouteDynamical = (menus: any) => {
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutes = (routes: any) => {
    routes.forEach((route: any) => {
      // console.log(asyncRoutes.find((item) => item.path === '/goods/list'),"find")  能找到没问题
      const item = asyncRoutes.find((item: any) => {
        return item.path === route.frontpath
      })

      if (item && !router.hasRoute(item.name!)) {
        // console.log('已加入')
        router.addRoute('home', item)
        hasNewRoutes = true
        // console.log(item)
      }
      if (route.child && route.child.length > 0) {
        findAndAddRoutes(route.child)
      }
    })
  }
  findAndAddRoutes(menus)
  // console.log(router.getRoutes(), 'getRoutes')
  return hasNewRoutes
}
