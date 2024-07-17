<template>
  <el-row :gutter="20">
    <el-col :span="3" v-for="item in iconNavs" :key="item.path">
      <el-card shadow="hover">
        <div class="flex flex-col items-center justify-center">
          <el-icon :class="item.color" :size="20" @click="router.push(item.path)" class="cursor-pointer">
            <component :is="iconMap[item.icon]"></component>
          </el-icon>
          <span class="mt-2">{{item.title}}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  User,
  ShoppingCart,
  Tickets,
  ChatDotSquare,
  Picture,
  Bell,
  SetUp,
  Files
} from '@element-plus/icons-vue'
const router = useRouter()
const iconNavs = [
  {
    icon: 'user',
    color: 'text-light-blue-500',
    title: '用户',
    path: '/user/list'
  },
  {
    icon: 'shopping-cart',
    color: 'text-violet-500',
    title: '商品',
    path: '/goods/list'
  },
  {
    icon: 'tickets',
    color: 'text-fuchsia-500',
    title: '订单',
    path: '/order/list'
  },
  {
    icon: 'chat-dot-square',
    color: 'text-teal-500',
    title: '评价',
    path: '/comment/list'
  },
  {
    icon: 'picture',
    color: 'text-rose-500',
    title: '图库',
    path: '/image/list'
  },
  {
    icon: 'bell',
    color: 'text-green-500',
    title: '公告',
    path: '/notice/list'
  },
  {
    icon: 'set-up',
    color: 'text-grey-500',
    title: '配置',
    path: '/setting/base'
  },
  {
    icon: 'files',
    color: 'text-yellow-500',
    title: '优惠券',
    path: '/coupon/list'
  }
]
const iconMap = {
  user: User,
  'shopping-cart': ShoppingCart,
  tickets: Tickets,
  'chat-dot-square': ChatDotSquare,
  picture: Picture,
  bell: Bell,
  'set-up': SetUp,
  files: Files
}
</script>

<style scoped>
</style>