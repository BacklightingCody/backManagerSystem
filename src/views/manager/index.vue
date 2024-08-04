<template>
  <el-card hover shadow="never" class="border-0">
    <template #header>
      <div class="flex justify-between">
        <el-form :model="searchForm" ref="searchRef" label-width="auto" style="min-width: 500px" class="mb-3">
          <el-form-item label="关键词" aria-placeholder="输入管理员名称" width="100%">
            <el-input v-model="searchForm.keyword" width="800px" />
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="warning" @click="handleReset">重置</el-button>
        </div>
      </div>
      <ListHeader @add="handleAdd" @refresh="getManager(1)"></ListHeader>
    </template>
    <el-table :data="managerList" style="width: 100%" lazy v-loading="loading" class="cursor-pointer">
      <el-table-column label="管理员" width="200" align="center">
        <template #default="scope">
          <div class="flex">
            <span>
              <el-avatar :size="60" :src="scope.row.avatar?scope.row.avatar:'~'">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
            </span>
            <div class="flex flex-col truncate ml-3 justify-center items-start">
              <span>{{ scope.row.username }}</span>
              <span>ID:{{scope.row.id}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="role.name" label="所属管理员" align="center"></el-table-column>
      <el-table-column prop="create_time" label="发布时间" align="center" />
      <el-table-column label="状态" align="center">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" :disabled="scope.row.super===1" class="ml-2" @click="handleUpdateStatus(scope.row.id,scope.row.status)" />
        </template>

      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            修改
          </el-button>
          <el-popconfirm title="你确定要删除吗?" @confirm="handleDel(scope.row.id)" confirm-button-text="确定" cancel-button-text="取消" icon-color="red" width="200">
            <template #reference>
              <el-button size="small" type="danger">
                删除
              </el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <div class="flex justify-center">
        <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" layout="total, prev, pager, next" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </template>
    <DrawerComponent size="35%" direction="rtl" :title="drawerTitle" confirm-text="确认" ref="drawerRef" @submit="handleSubmit">
      <el-form style="max-width: 600px" :model="ruleForm" ref="formRef" :rules="rules" label-width="auto" status-icon>
        <el-form-item label="用户名" prop="username" placeholder="请输入用户名">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password" placeholder="请输入密码">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ChooseImage v-model="ruleForm.avatar" @change="handleAvatarChange" />
        </el-form-item>
        <el-form-item label="所属管理员" prop="role_id">
          <el-select v-model="ruleForm.role_id" placeholder="请选择所属管理员" style="width: 240px">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="ruleForm.status" :active-value="1" :inactive-text="0" />
        </el-form-item>
      </el-form>
    </DrawerComponent>
  </el-card>
</template>

<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import LisHeader from '@/components/ListHeader.vue'
import DrawerComponent from '@/components/DrawComponent.vue'
import ChooseImage from '@/components/ChooseImage.vue'
// 获取管理员列表
import {
  getManagerList,
  updateManagerStatus,
  addManager,
  updateManager,
  deleteManager
} from '@/api/manager'

interface Role {
  id: number
  name: string
}
interface ManagerList {
  avatar: string
  create_time: string
  id: number
  role: Role
  role_id: number
  status: number //开关状态
  super: number
  update_time: string
  username: string
}
const managerList = ref<ManagerList[]>([])
const roleList = ref<Role[]>([])
const total = ref(0)
const loading = ref(false)
// 分页部分
const currentPage = ref(1)
const pageSize = ref(10)
const size = ref('large')
async function getManager(
  page: number = 1,
  limit: number = 10,
  keyword: string = ''
) {
  loading.value = true
  await getManagerList(page, { limit, keyword })
    .then((res) => {
      console.log(res)
      managerList.value = res.data.list
      roleList.value = res.data.roles
      total.value = res.data.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}
getManager()

// 搜索栏
const searchForm = reactive({
  keyword: ''
})
const searchRef = ref('')
const formRef = ref<FormInstance>()
async function handleSearch() {
  await getManager(1, 10, searchForm.keyword)
}
function handleReset() {
  searchForm.keyword = ''
  getManager(1)
}

function handleSizeChange(val: number) {}
function handleCurrentChange(val: number) {
  currentPage.value = val
  getManager(currentPage.value)
}
// 编辑状态
async function handleUpdateStatus(id: number, status: number) {
  console.log(id, status)
  await updateManagerStatus(id, status).then((res) => {
    console.log(res)
    ElNotification({
      title: '修改状态成功',
      type: 'success'
    })
  })
}
// 新增公告
async function handleAdd() {
  resetForm({
    username: '',
    password: '',
    role_id: null,
    status: 0,
    avatar: ''
  })
  editId.value = 0
  openDrawer(0)
}
function resetForm(row?: Partial<RuleForm>) {
  if (formRef.value) {
    formRef.value.clearValidate()
  }

  if (row) {
    for (const key in ruleForm) {
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        ruleForm[key as keyof RuleForm] = row[key as keyof RuleForm] as never
      } else {
        ruleForm[key as keyof RuleForm] = '' as never
      }
    }
  } else {
    for (const key in ruleForm) {
      ruleForm[key as keyof RuleForm] = '' as never
    }
  }
}
// 编辑公告
async function handleEdit(row: ManagerList) {
  openDrawer(1)
  console.log(row)
  ruleForm.username = row.username
  ruleForm.role_id = row.role_id
  ruleForm.status = row.status
  ruleForm.avatar = row.avatar
  editId.value = row.id
}
function handleAvatarChange(): void {}
// 删除管理员
async function handleDel(id: number) {
  loading.value = true
  await deleteManager(id)
    .then((res) => {
      ElMessage.success('删除成功')
      getManager(1)
    })
    .finally(() => {
      loading.value = false
    })
}
// 抽屉相关

const drawerRef = ref<InstanceType<typeof DrawerComponent>>()
const drawerTitle = ref('新增')
const editId = ref(0)
interface RuleForm {
  username: String
  password: String
  role_id: number | null
  status: number
  avatar?: String
}
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
  role_id: 0,
  status: 0,
  avatar: ''
})
const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role_id: [{ required: true, message: '请选择角色', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
}
function openDrawer(number: number) {
  drawerRef.value?.showDrawer()
  if (number === 1) {
    drawerTitle.value = '修改'
    return
  }
  drawerTitle.value = '新增'
}

async function handleSubmit() {
  formRef.value?.validate((valid: boolean) => {
    if (!valid) return
    if (editId.value === 0) {
      addManager(ruleForm).then((res) => {
        ElMessage.success('添加成功')
        drawerRef.value?.hideDrawer()
        getManager(1)
      })
    } else {
      updateManager(editId.value, ruleForm).then((res) => {
        console.log(res)
        ElMessage.success('修改成功')
        drawerRef.value?.hideDrawer()
        getManager(currentPage.value)
      })
    }
  })
}
</script>

<style scoped>
</style> 