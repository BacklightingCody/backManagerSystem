import { defineStore } from 'pinia'
import { computed } from 'vue'
export const useLayoutStore = defineStore('layout', () => {
  // 是否折叠
  const isCollapse = ref(false)
  const asideWidth = computed(() => {
    return isCollapse.value ? '64px': '200px'
  })
  function toggleCollapse() {
    isCollapse.value = !isCollapse.value
  }
  return {
    isCollapse,
    asideWidth,
    toggleCollapse
  }
})
