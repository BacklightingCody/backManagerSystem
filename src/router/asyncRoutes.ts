
// 动态路由
export const asyncRoutes: any = [
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
    path: '/setting/buy',
    name: 'settingbuy',
    meta: {
      title: '交易设置',
      roles: ['超级管理员']
    },
    component: () => import('@/views/system/trade/index.vue')
  },
  {
    path: '/setting/ship',
    name: 'settingship',
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
  },
  {
    path: '/image/list',
    name: 'imagelist',
    meta: {
      title: '图片管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/other/index.vue')
  },
  {
    path: '/notice/list',
    name: 'noticelist',
    meta: {
      title: '公告管理',
      roles: ['超级管理员']
    },
    component: () => import('@/views/other/bell/index.vue')
  }
]
