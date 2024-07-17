<template>
  <el-drawer v-model="isDrawerShow"
             :direction="drawerDirection"
             :size="drawerSize">
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
  title:string,
  confirmText?: string,
  size?: string,
  fixed?: boolean
  direction?: string,
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue','submit'])
const isDrawerShow = ref(props.modelValue)
const drawerSize = ref(props.size || '40%')
const drawerDirection = ref(props.direction || 'rtl')
const loading = ref()
watch(
  () => props.modelValue,
  (newVal) => {
    isDrawerShow.value = newVal
  }
)

watch(isDrawerShow, (newVal) => {
  if (newVal !== props.modelValue) {
    emit('update:modelValue', newVal)
  }
})

const cancelClick = () => {
  isDrawerShow.value = false
}

const confirmClick = () => {
  // 确认逻辑
  emit('submit')
}
defineExpose({
  loading,
  showDrawer: () => {
    isDrawerShow.value = true
  },
  hideDrawer: () => {
    isDrawerShow.value = false
  },
  toggleDrawer: () => {
    isDrawerShow.value = !isDrawerShow.value
  }
})
</script>

<style scoped>
</style>
