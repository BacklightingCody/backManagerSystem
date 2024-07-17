import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'
import { startProgress, closeProgress } from '@/utils/progressBar'
import { useUserStore } from '@/stores'
// 单独提出来加上type类型
import type { RouterOptions, Router, RouteRecordRaw } from 'vue-router'

// 自定义的 RouteRecordRaw 类型，将 redirect 属性设为可选的
// interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, 'redirect'> {
//   redirect?: RouteRecordRaw['redirect'];
// }
// 默认路由
const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    meta: {
      title: '首页',
      roles: ['超级管理员']
    },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          title: '后台首页',
          roles: ['超级管理员']
        },
        component: () => import('@/views/home/index.vue')
      },
      // 商品
      {
        path: '/goods/list',
        name: 'goods',
        meta: {
          title: '商品管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/goods/index.vue')
      },
      {
        path: '/category/list',
        name: 'category',
        meta: {
          title: '分类管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/goods/category/index.vue')
      },
      {
        path: '/skus/list',
        name: 'skus',
        meta: {
          title: '规格管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/goods/skus/index.vue')
      },
      {
        path: '/coupon/list',
        name: 'coupon',
        meta: {
          title: '优惠券管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/goods/coupon/index.vue')
      },
      // 用户
      {
        path: '/user/list',
        name: 'user',
        meta: {
          title: '用户管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/user/index.vue')
      },
      {
        path: '/level/list',
        name: 'member',
        meta: {
          title: '会员等级',
          roles: ['超级管理员']
        },
        component: () => import('@/views/user/member/index.vue')
      },
      // 订单
      {
        path: '/order/list',
        name: 'order',
        meta: {
          title: '订单管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/order/index.vue')
      },
      {
        path: '/comment/list',
        name: 'comment',
        meta: {
          title: '评论管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/order/comment/index.vue')
      },
      // 管理员
      {
        path: '/manager/list',
        name: 'manager',
        meta: {
          title: '管理员管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/manager/index.vue')
      },
      {
        path: '/access/list',
        name: 'access',
        meta: {
          title: '权限管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/manager/access/index.vue')
      },
      {
        path: '/role/list',
        name: 'role',
        meta: {
          title: '角色管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/manager/role/index.vue')
      },
      // 系统设置
      {
        path: '/setting/base',
        name: 'setting',
        meta: {
          title: '基础设置',
          roles: ['超级管理员']
        },
        component: () => import('@/views/system/base/index.vue')
      },
      {
        path: '/settting/buy',
        name: 'settingbuy',
        meta: {
          title: '交易设置',
          roles: ['超级管理员']
        },
        component: () => import('@/views/system/trade/index.vue')
      },
      {
        path: '/setting/logistics',
        name: 'settinglogistics',
        meta: {
          title: '物流设置',
          roles: ['超级管理员']
        },
        component: () => import('@/views/system/logistics/index.vue')
      },
      // 分销模块
      {
        path: '/distribution/index',
        name: 'distribution',
        meta: {
          title: '分销员管理',
          roles: ['超级管理员']
        },
        component: () => import('@/views/distribution/distributor/index.vue')
      },
      {
        path: '/distribution/setting',
        name: 'distributionsettting',
        meta: {
          title: '分销设置',
          roles: ['超级管理员']
        },
        component: () => import('@/views/distribution/index.vue')
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

// 动态路由
const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/goods/list',
    name: 'goods',
    meta: {
      title: '商品管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/goods/index.vue')
  },
  {
    path: '/category/list',
    name: 'category',
    meta: {
      title: '分类管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/goods/category/index.vue')
  },
  {
    path: '/skus/list',
    name: 'skus',
    meta: {
      title: '规格管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/goods/skus/index.vue')
  },
  {
    path: '/coupon/list',
    name: 'coupon',
    meta: {
      title: '优惠券管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/goods/coupon/index.vue')
  },
  // 用户
  {
    path: '/user/list',
    name: 'user',
    meta: {
      title: '用户管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/level/list',
    name: 'member',
    meta: {
      title: '会员等级',
      roles: ['超级管理员']
    },
    component: () => import('@/views/user/member/index.vue')
  },
  // 订单
  {
    path: '/order/list',
    name: 'order',
    meta: {
      title: '订单管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/order/index.vue')
  },
  {
    path: '/comment/list',
    name: 'comment',
    meta: {
      title: '评论管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/order/comment/index.vue')
  },
  // 管理员
  {
    path: '/manager/list',
    name: 'manager',
    meta: {
      title: '管理员管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/manager/index.vue')
  },
  {
    path: '/access/list',
    name: 'access',
    meta: {
      title: '权限管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/manager/access/index.vue')
  },
  {
    path: '/role/list',
    name: 'role',
    meta: {
      title: '角色管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/manager/role/index.vue')
  },
  // 系统设置
  {
    path: '/setting/base',
    name: 'setting',
    meta: {
      title: '基础设置',
      roles: ['超级管理员']
    },
    component: () => import('@/views/system/base/index.vue')
  },
  {
    path: '/settting/buy',
    name: 'settingbuy',
    meta: {
      title: '交易设置',
      roles: ['超级管理员']
    },
    component: () => import('@/views/system/trade/index.vue')
  },
  {
    path: '/setting/logistics',
    name: 'settinglogistics',
    meta: {
      title: '物流设置',
      roles: ['超级管理员']
    },
    component: () => import('@/views/system/logistics/index.vue')
  },
  // 分销模块
  {
    path: '/distribution/index',
    name: 'distribution',
    meta: {
      title: '分销员管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/distribution/distributor/index.vue')
  },
  {
    path: '/distribution/setting',
    name: 'distributionsettting',
    meta: {
      title: '分销设置',
      roles: ['超级管理员']
    },
    component: () => import('@/views/distribution/index.vue')
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
  if (token && userStore.isGetedInfo === false) {
    await userStore.getUserInfo()
    userStore.isGetedInfo = true
    // if (userStore.user && userStore.user.menus) {
    //   addRouteDynamical(userStore.user?.menus)
    // }
  }
  // 设置页面标题
  const title = (to.meta.title ? to.meta.title : '') + '-Vite'
  document.title = title
  next()
})

router.afterEach((to, from, next) => {
  closeProgress()
})
// 动态添加路由export const addRouteDynamical = (routes: RouteRecordRaw[]) => {
export const addRouteDynamical = (routes: RouteRecordRaw[]) => {
  const findAndAddRoutes = (routes: RouteRecordRaw[]) => {
    routes.forEach((route) => {
      if (!router.hasRoute(route.name!)) {
        router.addRoute(route)
      }
      if (route.children && route.children.length > 0) {
        findAndAddRoutes(route.children)
      }
    })
  }
  findAndAddRoutes(routes)
}
