<template>
  <el-drawer v-model="isDrawerShow" :direction="drawerDirection" :size="drawerSize" class="z-999">
    <template #header>
      <span class="text-black text-xl">{{props.title}}</span>
    </template>
    <template #default>
      <div>
        <slot></slot>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-start">
        <slot name="footer"></slot>
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick" :loading="loading">{{confirmText?confirmText:'确认'}}</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, defineEmits, defineExpose } from 'vue'

const props = defineProps<{
  title: string
  confirmText?: string
  size?: string
  fixed?: boolean
  direction?: string
}>()
const emit = defineEmits(['update:modelValue', 'submit'])
const isDrawerShow = ref(false)
const drawerSize = ref(props.size || '40%')
const drawerDirection = ref(props.direction || 'rtl')
const loading = ref()

const cancelClick = () => {
  isDrawerShow.value = false
}

const confirmClick = () => {
  // 确认逻辑
  emit('submit')
}
const showDrawer = () => {
  isDrawerShow.value = true
}
const hideDrawer = () => {
  isDrawerShow.value = false
}
const toggleDrawer = () => {
  isDrawerShow.value = !isDrawerShow.value
}
defineExpose({
  loading,
  showDrawer,
  hideDrawer,
  toggleDrawer,
})
</script>

<style scoped>
</style>
