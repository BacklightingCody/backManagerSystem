// composables/useDrawer.ts
import { ref, type Ref } from 'vue'
interface UseDrawer {
  isDrawerShow: Ref<boolean>
  drawerWidth: Ref<string>
  drawerHeight: Ref<string>
  drawerFix: Ref<boolean>
  drawerDirection: Ref<string>
  toggleDrawer: () => void
  showDrawer: () => void
  hideDrawer: () => void
}

export function useDrawer(): UseDrawer {
  const isDrawerShow = ref(false)
  const drawerWidth = ref('40%')
  const drawerHeight = ref('100%')
  const drawerFix = ref(true)
  const drawerDirection = ref('rtl')

  const toggleDrawer = () => {
    isDrawerShow.value = !isDrawerShow.value
  }

  const showDrawer = () => {
    isDrawerShow.value = true
  }

  const hideDrawer = () => {
    isDrawerShow.value = false
  }

  return {
    isDrawerShow,
    drawerWidth,
    drawerHeight,
    drawerFix,
    drawerDirection,
    toggleDrawer,
    showDrawer,
    hideDrawer
  }
}
