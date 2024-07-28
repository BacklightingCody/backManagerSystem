// 动态路由
export const asyncRoutes: any = [
  {
    path: '/',
    name: 'home-home',
    meta: {
      title: '首页',
      roles: ['超级管理员']
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    meta: {
      title: '商品管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/goods/index.vue')
  },
  {
    path: '/category/list',
    name: '/category/list',
    meta: {
      title: '分类管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/goods/category/index.vue')
  },
  {
    path: '/skus/list',
    name: '/skus/list',
    meta: {
      title: '规格管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/goods/skus/index.vue')
  },
  {
    path: '/coupon/list',
    name: '/coupon/list',
    meta: {
      title: '优惠券管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/goods/coupon/index.vue')
  },
  // 用户
  {
    path: '/user/list',
    name: '/user/list',
    meta: {
      title: '用户管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/level/list',
    name: '/level/list',
    meta: {
      title: '会员等级',
      roles: ['超级管理员']
    },
    component: () => import('@/views/user/member/index.vue')
  },
  // 订单
  {
    path: '/order/list',
    name: '/order/list',
    meta: {
      title: '订单管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/order/index.vue')
  },
  {
    path: '/comment/list',
    name: '/comment/list',
    meta: {
      title: '评论管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/order/comment/index.vue')
  },
  // 管理员
  {
    path: '/manager/list',
    name: '/manager/list',
    meta: {
      title: '管理员管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/manager/index.vue')
  },
  {
    path: '/access/list',
    name: '/access/list',
    meta: {
      title: '权限管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/manager/access/index.vue')
  },
  {
    path: '/role/list',
    name: '/role/list',
    meta: {
      title: '角色管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/manager/role/index.vue')
  },
  // 系统设置
  {
    path: '/setting/base',
    name: '/setting/base',
    meta: {
      title: '基础设置',
      roles: ['超级管理员']
    },
    component: () => import('@/views/system/base/index.vue')
  },
  {
    path: '/setting/buy',
    name: '/setting/buy',
    meta: {
      title: '交易设置',
      roles: ['超级管理员']
    },
    component: () => import('@/views/system/trade/index.vue')
  },
  {
    path: '/setting/ship',
    name: '/setting/ship',
    meta: {
      title: '物流设置',
      roles: ['超级管理员']
    },
    component: () => import('@/views/system/logistics/index.vue')
  },
  // 分销模块
  {
    path: '/distribution/index',
    name: '/distribution/index',
    meta: {
      title: '分销员管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/distribution/distributor/index.vue')
  },
  {
    path: '/distribution/setting',
    name: '/distribution/setting',
    meta: {
      title: '分销设置',
      roles: ['超级管理员']
    },
    component: () => import('@/views/distribution/index.vue')
  },
  {
    path: '/image/list',
    name: '/image/list',
    meta: {
      title: '图片管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/other/index.vue')
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    meta: {
      title: '公告管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/other/bell/index.vue')
  }
]
