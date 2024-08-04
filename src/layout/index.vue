<script setup lang="ts">
import FHeader from './components/FHeader.vue'
import FAside from './components/FAside.vue'
import TagList from './components/TagList.vue'
import { useUserStore, useLayoutStore } from '@/stores'
const layoutStore = useLayoutStore()
const userStore = useUserStore()
onMounted(async () => {
  await userStore.getUserInfo()
})
</script>
<template>
  <div class="common-layout w-full h-full">
    <el-container class="w-full h-full flex flex-col">
      <el-header>
        <FHeader></FHeader>
      </el-header>
      <el-container class="flex-1 flex">
        <el-aside :style="{width:layoutStore.asideWidth}">
          <FAside></FAside>
        </el-aside>

        <el-main class="p-[20px] pb-0! flex-1">
          <TagList></TagList>
          <RouterView v-slot="{Component}">
            <Transition mode="out-in" name="fade">
            <keep-alive :max="10">
              <component :is="Component" class="p-[20px] pb-0 w-[1336] box-border"/>
            </keep-alive>
            </Transition>
          </RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-active {
  transition-delay: 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>