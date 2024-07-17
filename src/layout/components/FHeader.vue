<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

import { useUserStore, useLayoutStore } from '@/stores'
import {
  ElementPlus,
  Fold,
  Refresh,
  VideoCamera,
  FullScreen,
  Aim,
  SwitchButton,
  EditPen,
  Expand
} from '@element-plus/icons-vue'
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, enter, exit, toggle } = useFullscreen() //vueuse 全屏
const userStore = useUserStore()
const layoutStore = useLayoutStore()
import DrawerComponent from '@/components/DrawComponent.vue'
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case 'logout':
      userStore.userLogout()
      break
    case 'editPassword':
      editPassword()
      break
  }
}
// 处理刷新
const handleRefresh = () => {
  location.reload()
}
const editPassword = () => {
  isDrawerShow.value = true
}
// 抽屉
const isDrawerShow = ref(false)
const drawerRef = ref()
const confirmClick = async (formEl: FormInstance | undefined) => {
  drawerRef.value.loading = true
  if (!formEl) return
  try {
    await formEl.validate()
    await userStore.updatePassword(formModel)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    drawerRef.value = false // 无论成功或失败，都会在最后设置加载状态为 false
  }
}
// 修改密码
const triggerMethod: string = 'blur'
const formModel = reactive({
  oldpassword: '',
  newpassword: '',
  repassword: ''
})
const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  oldpassword: [
    { required: true, message: '请输入旧密码', trigger: triggerMethod },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: triggerMethod }
  ],
  newpassword: [
    { required: true, message: '请输入新密码', trigger: triggerMethod },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: triggerMethod }
  ],
  repassword: [
    { required: true, message: '请输入确认密码', trigger: triggerMethod },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== formModel.newpassword) {
          return callback(new Error('两次密码不一致'))
        } else {
          return callback()
        }
      },
      trigger: triggerMethod
    }
  ]
})
</script>
<template>
  <div class="flex bg-indigo-500 text-light-50 fixed top-0 right-0 left-0 items-center lay-header h-[60px] z-999">
    <div class="logo w-[200px] flex justify-center items-center">
      <el-icon :size="30"
               class="icon-btn">
        <ElementPlus />
      </el-icon>
      后台管理
    </div>

    <el-tooltip class="box-item"
                effect="dark"
                content="展开"
                placement="top"
                v-if="layoutStore.isCollapse">
      <el-icon :size="20"
               class="icon-btn" @click="layoutStore.toggleCollapse">
        <Fold />
      </el-icon>
    </el-tooltip>
    <el-tooltip class="box-item"
                effect="dark"
                content="折叠"
                placement="top"
               v-else>
      <el-icon :size="20"
               class="icon-btn" @click="layoutStore.toggleCollapse">
        <Expand />
      </el-icon>
    </el-tooltip>
    <el-tooltip class="box-item"
                effect="dark"
                content="刷新"
                placement="top">
      <el-icon :size="20"
               @click="handleRefresh"
               class="icon-btn">
        <Refresh />
      </el-icon>
    </el-tooltip>

    <div class="header-right ml-auto flex items-center mx-10">
      <el-tooltip class="box-item"
                  effect="dark"
                  content="视频"
                  placement="top">
        <el-icon :size="20"
                 class="icon-btn">
          <VideoCamera />
        </el-icon>
      </el-tooltip>
      <el-tooltip class="box-item"
                  effect="dark"
                  content="全屏"
                  placement="top">
        <el-icon :size="20"
                 class="icon-btn"
                 @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>

      <el-dropdown trigger="click"
                   class="mx-3"
                   @command="handleCommand">
        <span class="el-dropdown-link flex items-center text-light-50 cursor-pointer">
          <el-avatar v-if="userStore.user && userStore.user.avatar"
                     :size="50"
                     :src="userStore.user.avatar"
                     class="mx-2" />
          {{ userStore.user?.username }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="editPassword"><el-icon>
                <EditPen />
              </el-icon>修改密码</el-dropdown-item>
            <el-dropdown-item command="logout"><el-icon>
                <SwitchButton />
              </el-icon>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <DrawerComponent v-model="isDrawerShow"
                     size="30%"
                     direction="rtl"
                     title="修改密码"
                     confirm-text="确认"
                     ref="drawerRef"
                     @submit="confirmClick(formRef)">
      <template #header>
      </template>
      <template #default>
        <div class="text-black">
          <el-form label-width="100px"
                   :model="formModel"
                   :rules="rules"
                   ref="formRef"
                   style="max-width: 600px">
            <el-form-item label="旧密码"
                          prop="oldpassword">
              <el-input v-model.trim="formModel.oldpassword" />
            </el-form-item>
            <el-form-item label="新密码"
                          prop="newpassword">
              <el-input v-model.trim="formModel.newpassword" />
            </el-form-item>
            <el-form-item label="再次输入"
                          prop="repassword">
              <el-input v-model.trim="formModel.repassword" />
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
      </template>
    </DrawerComponent>
  </div>
</template>


<style scoped lang="scss">
.lay-header {
  .icon-btn {
    @apply cursor-pointer w-[50px] h-[60px];
    &:hover {
      @apply bg-indigo-600;
    }
  }
}
</style>