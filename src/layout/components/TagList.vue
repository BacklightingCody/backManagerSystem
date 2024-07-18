<script lang="ts" setup>
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
const cookie = useCookies()
const route = useRoute()
const router = useRouter()
// 标签相关
const activeTab = ref(route.path)
const tabList = ref([
  {
    title: '后台首页',
    path: '/'
  }
])
// 添加
interface Tab {
  title: string
  path: string
}
function addTabList(tab: Tab) {
  const noTab = tabList.value.find((item) => item.path === tab.path)
  if (!noTab) {
    tabList.value.push({
      title: tab.title,
      path: tab.path
    })
    cookie.set('tabList', tabList.value)
  }
}
// 初始化标签页
function initTabList() {
  const tabs = cookie.get('tabList')
  if (tabs) {
    tabList.value = tabs
  }
}
initTabList()
function tabChange(targetName: string) {
  router.push(targetName)
  activeTab.value = targetName
}
//to---fullPath,meta:{title:''}
onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.fullPath
  addTabList({
    title: to.meta.title as string,
    path: to.fullPath
  })
})

const handleTabsEdit = (
  targetName: TabPaneName | undefined,
  action: 'remove' | 'add'
) => {
  let tabs = tabList.value
  if (action === 'remove') {
    if (targetName === activeTab.value) {
      tabs.forEach((item, index) => {
        if (item.path === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeTab.value = nextTab.path
            router.push(nextTab.path)
          }
        }
      })
    }
    tabList.value = tabs.filter((tab) => tab.path !== targetName)
    cookie.set('tabList', tabList.value)
  } else if (action === 'add') {
    const newTabName = `new-tab-${tabs.length + 1}`
    const newTab = {
      title: `New Tab ${tabs.length + 1}`,
      path: newTabName
    }
    tabList.value.push(newTab)
    activeTab.value = newTabName
    router.push(newTabName)
    cookie.set('tabList', tabList.value)
  }
}
// 下拉菜单处理
const handleCommand = (command: string) => {
  switch (command) {
    case 'closeAll':
      activeTab.value = '/'
      tabList.value = [
        {
          title: '后台首页',
          path: '/'
        }
      ]
      router.push('/')
      break
    case 'closeOther':
      tabList.value = tabList.value.filter(
        (item) => item.path === activeTab.value || item.path === '/'
      )
      break
    default:
      cookie.set('tabList', tabList.value)
      break
  }
}
</script>


<template>
  <div class="fixed top-[60px] bg-gray-100 h-[40px] flex text-gray-50 w-[1300px] z-999">
    <el-tabs v-model="activeTab" type="card" class="demo-tabs rounded" style="min-width:100px;" @edit="handleTabsEdit" @tab-change="tabChange">
      <el-tab-pane v-for="item in tabList" :closable="item.path!=='/'" :key="item.path" :label="item.title" :name="item.path" class="border-0 mx-1">
      </el-tab-pane>
    </el-tabs>
    <span class="flex items-center justify-cente w-[32px] h-[40px] z-999">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link ">
          <el-icon class="el-icon--right" size="20px">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
            <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div class="w-full h-[30px]"></div>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  background-color: white;
  margin: 0 5px;
  border-radius: 10px;
}
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  font-size: 16px;
}
</style>
