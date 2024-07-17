<script setup lang="ts">
import { Help, HomeFilled, ShoppingBag, ShoppingCartFull,List,Grid ,Menu,Aim,Postcard,User,UserFilled,DataAnalysis,
  MessageBox,Reading,Comment,Management,Coordinate,Connection,Histogram,Setting,Baseball,CreditCard,Bicycle,ShoppingCart,
  SetUp,MostlyCloudy,PictureFilled,Notification
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore, useLayoutStore, useGlobalStore } from '@/stores'
// const route =useRoute()
const router = useRouter()
const userStore = useUserStore()
const layoutStore = useLayoutStore()
const globalStore = useGlobalStore()
interface MenuItem {
  name: string
  icon: string
  frontpath?: string | null
  child?: MenuItem[]
}
// 菜单详情
const asidemenu = computed((): MenuItem[] => {
  return (
    userStore.user?.menus.map((menu) => ({
      name: menu.name,
      icon: menu.icon,
      frontpath: menu.frontpath,
      child: menu.child?.map((child) => ({
        name: child.name,
        icon: child.icon,
        frontpath: child.frontpath
      }))
    })) || []
  )
})

// 创建图标映射表
const iconMap: Record<string, any> = {
  help: Help,
  "home-filled": HomeFilled,
  'shopping-bag': ShoppingBag,
  'shopping-cart-full': ShoppingCartFull,
  "menu":Menu,
  "aim":Grid,
  "postcard":Postcard,
  "user":User,
  "user-filled":UserFilled,
  "data-analysis":DataAnalysis,
  "message-box":MessageBox,
  "reading":Reading,
  "comment":Comment,
  "management":Management,
  "coordinate":Coordinate,
  "connection":Connection,
  "histogram":Histogram,
  "setting":Setting,
  "baseball":Baseball,
  "credit-card":CreditCard,
  "bicycle":Bicycle,
  "shopping-cart":ShoppingCart,
  "set-up":SetUp,
  "mostly-cloudy":MostlyCloudy,
  "picture-filled":PictureFilled,
  "notification":Notification,
}

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleSelect = (index: string, indexPath: string[]) => {
  // console.log(index)
  // console.log(indexPath)
  router.push(index)
}

</script>
<template>
  <div class="fixed top-[60px] left-0 bottom-0 transition-all duration-300 overscroll-y-auto overflow-x-hidden scrollbar"
       :style="{width:layoutStore.asideWidth}">
    <el-menu :default-active="globalStore.defaultActive"
             class="el-menu-vertical-demo border-0!"
             unique-opened
             :collapse="layoutStore.isCollapse"
             :collapse-transition="false"
             @open="handleOpen"
             @close="handleClose"
             @select="handleSelect">
      <template v-for="(item, index) in asidemenu"
                :key="index">
        <el-sub-menu :index="item.name"
                     v-if="item.child && item.child.length > 0">
          <template #title>
            <el-icon>
              <component :is="iconMap[item.icon]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <el-menu-item v-for="items in item.child"
                        :key="items.name"
                        :index="items.frontpath">
            <el-icon>
              <component :is="iconMap[items.icon]"></component>
            </el-icon>
            <span>{{ items.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu :index="item.frontpath ? item.frontpath : ''"
                     v-else>
          <template #title>
            <el-icon>
              <component :is="iconMap[item.icon]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar{
	width:0;
}
 


</style>
