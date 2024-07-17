import type { App } from 'vue'
import { useUserStore } from '@/stores'
export default {
  install(app: App): void {
    app.directive('permission', {
      mounted(el, bingding) {
        hasPermission(bingding.value, el)
      }
    })
  }
}
function hasPermission(rule: string[], el: HTMLElement | false = false) {
  if (!Array.isArray(rule)) {
    throw new Error('rule must be an array')
  }
  const userStore = useUserStore()
  const hasAuth = rule.find((item: string) =>
    userStore.ruleNames.includes(item)
  )
  if (el && !hasAuth) {
    el.parentNode && el.parentNode.removeChild(el)
  }
  return hasAuth
}
