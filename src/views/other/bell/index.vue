<template>
  <el-card hover shadow="never" class="border-0">
    <template #header>
      <div class="card-header flex justify-between">
        <el-button type="success" @click="handleAdd">新增</el-button>

        <el-tooltip class="box-item" effect="dark" content="刷新" placement="top">
          <el-button text @click="getNoticeList(1)"><el-icon>
              <RefreshRight />
            </el-icon></el-button>
        </el-tooltip>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%" lazy v-loading="loading" class="cursor-pointer">
      <el-table-column prop="title" label="公告标题" width="200" align="center" />
      <el-table-column prop="create_time" label="发布时间" align="center" />
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
        <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize" :size="size" layout="total, prev, pager, next" :total="totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </template>
    <DrawerComponent size="35%" direction="rtl" :title="drawerTitle" confirm-text="确认" ref="drawerRef" @submit="handleSubmit">
      <el-form style="max-width: 600px" :model="ruleForm" ref="noticeRef" :rules="rules" label-width="auto"  status-icon>
        <el-form-item label="公告标题" prop="title" placeholder="请输入公告标题">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="ruleForm.content" style="width: 100%" :rows="5" type="textarea" placeholder="请输入公告内容" />
        </el-form-item>
      </el-form>
    </DrawerComponent>
  </el-card>
</template>

<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { RefreshRight } from '@element-plus/icons-vue'
import { getNotice, addNotice, updateNotice, deleteNotice } from '@/api/other'
import DrawerComponent from '@/components/DrawComponent.vue'
// table部分
interface Notice {
  content: string
  create_time: string
  id: number
  order: number
  title: string
  update_time: string
}
const tableData = ref<Notice[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const size = ref('large')
const totalCount = ref(0)

async function getNoticeList(page: number = 1) {
  loading.value = true
  await getNotice(page)
    .then((res) => {
      console.log(res)
      tableData.value = res.data.list
      totalCount.value = res.data.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}
getNoticeList()

function handleSizeChange(val: number) {}
function handleCurrentChange(val: number) {
  currentPage.value = val
  getNoticeList(currentPage.value)
}
// 新增公告
async function handleAdd() {
  ruleForm.title = ''
  ruleForm.content = ''
  editId.value = 0
  openDrawer(0)
}
// 编辑公告
async function handleEdit(row: Notice) {
  openDrawer(1)
  console.log(row)
  ruleForm.title = row.title
  ruleForm.content = row.content
  editId.value = row.id
}
// 删除公告
async function handleDel(id: number) {
  loading.value = true
  await deleteNotice(id)
    .then((res) => {
      ElMessage.success('删除成功')
      getNoticeList(1)
    })
    .finally(() => {
      loading.value = false
    })
}
// 抽屉相关

const drawerRef = ref<InstanceType<typeof DrawerComponent>>()
const drawerTitle = ref('新增')
const editId = ref(0)
const noticeRef = ref<FormInstance>()
interface RuleForm {
  title: String
  content: String
}
const ruleForm = reactive<RuleForm>({
  title: '',
  content: ''
})
const rules: FormRules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
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
  noticeRef.value?.validate((valid: boolean) => {
    if (!valid) return
    if (editId.value === 0) {
      addNotice(ruleForm).then((res) => {
        ElMessage.success('添加成功')
        drawerRef.value?.hideDrawer()
        getNoticeList(1)
      })
    } else {
      updateNotice(editId.value, ruleForm).then((res) => {
        console.log(res)
        ElMessage.success('修改成功')
        drawerRef.value?.hideDrawer()
        getNoticeList(currentPage.value)
        
      })
    }
  })
}
</script>

<style scoped>
</style>