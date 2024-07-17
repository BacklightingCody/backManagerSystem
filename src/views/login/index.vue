<script setup lang="ts">
import { useRouter } from 'vue-router'
import { setToken } from '@/utils/auth'
import { useUserStore } from '@/stores'
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/manager'
import type { FormRules, FormInstance } from 'element-plus'
// import { en } from 'element-plus/es/locale/index.mjs'
import { reactive, ref, onMounted, onBeforeMount } from 'vue'
// const labelPosition = ref<FormProps['labelPosition']>('right')
const userStore = useUserStore()
const router = useRouter()
const formRef = ref<FormInstance>()
// 定义表单输入类型
interface RuleForm {
  username: string
  password: string
}
const formModel = reactive<RuleForm>({
  username: '',
  password: ''
})
// 定义表单校验规则
const triggerMethod = 'blur'
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '必须输入用户名', trigger: triggerMethod },
    { min: 1, message: '用户名长度必须大于3位', trigger: triggerMethod }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: triggerMethod },
    { min: 1, message: '密码大于6位', trigger: triggerMethod }
  ]
})
// 定义提交表单后的loading效果
const loading = ref(false)
// 定义提交函数
function enterKeyUp(e: any) {
  if (e.key === 'Enter') {
    submit(formRef.value)
  }
}
onMounted(() => {
  document.addEventListener('keyup', enterKeyUp)
})
onBeforeMount(() => {
  document.removeEventListener('keyup', enterKeyUp)
})
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fileds) => {
    if (valid) {
      loading.value = true
      login(formModel.username, formModel.password)
        .then((res) => {
          console.log(res)
          ElNotification({
            title: 'Success',
            message: '登录成功',
            type: 'success',
            duration: 3000
          })
          // 添加token
          setToken(res.data.token)
          // 获取设置相关用户信息
          userStore.getUserInfo()

          // 跳转路由
          router.push('/')
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.log('someing error', fileds)
      // ElMessage.error()
    }
  })
}
</script>

<template>
  <el-row class="min-h-screen min-w-screen">
    <el-col :lg="16" :md="12" class="!flex justify-center items-center bg-blue-300">
      <div>
        <p class="text-light-300 text-5xl mb-4">欢迎光临</p>
        <p class="text-2xl">爬虫后台管理</p>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="!flex bg-light-100 justify-center items-center">
      <div>
        <p class="text-3xl my-4 text-center">欢迎回来</p>
        <div class="text-gray-300 flex justify-center items-center my-5">
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span class="mx-2">账号密码登录</span>
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <el-form
          label-width="auto"
          :model="formModel"
          style="max-width: 600px"
          ref="formRef"
          :rules="rules"
        >
          <el-form-item prop="username">
            <el-input v-model="formModel.username" placeholder="请输入账号" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formModel.password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              type="password"
            />
          </el-form-item>

          <el-button
            type="primary"
            round
            class="!bg-purple-500 text-gray-800 w-full"
            :loading="loading"
            @click="submit(formRef)"
            >登录</el-button
          >
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>


<style scoped></style>