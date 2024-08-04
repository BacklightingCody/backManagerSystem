<template>
  <el-aside width="200px" class="image-aside">
    <div class="top" v-loading="loading">
      <AsideList v-for="item in imagelist" :title="item.name" :key="item.id" :active="activeId===item.id" @click="changeActive(item.id)" @edit="handleEdit(item)" @delete="handleDelete(item.id)"></AsideList>
    </div>
    <div class="bottom flex justify-center">
      <el-pagination background layout="prev, next" :total="total" :current-page="currentPgae" :page-size="pageSize" class="mt-4" @current-change="handlePageChange" @size-change="handleSizeChange" />
    </div>
    <DrawerComponent size="40%" direction="rtl" :title="drawerTitle" confirm-text="确认" ref="drawerRef" @submit="handleSubmit">

      <el-form ref="newFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" status-icon>
        <el-form-item label="相册名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="ruleForm.order" :min="0" :max="1000" @change="handleChange" />
        </el-form-item>
      </el-form>
    </DrawerComponent>
  </el-aside>

</template>

<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import {
  getImageClassList,
  addImageClass,
  updateImageClass,
  deleteImageClass
} from '@/api/other'
import { getDate } from '@/utils/getTime'
import AsideList from './AsideList.vue'
import DrawerComponent from '@/components/DrawComponent.vue'
// 获取图片分类
interface ImageClass {
  id: number
  name: string
  order: number
  images_count: number
}

const imagelist = ref<ImageClass[]>([])
const loading = ref(false)
const activeId = ref(168)
const editId = ref(0) // 编辑id
const drawerTitle = computed(() => {
  return editId.value ? '编辑' : '新增'
})

async function getImageClass(page = 1, limit = 10) {
  loading.value = true
  await getImageClassList(page, limit ? limit : 10)
    .then((res) => {
      imagelist.value = res.data.list
      let item = imagelist.value[0]
      changeActive(item.id)
      console.log(res.data)
      total.value = res.data.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}
getImageClass()
const emit = defineEmits(['changeActive'])
function changeActive(id: number) {
  if (activeId.value === id) return
  activeId.value = id
  emit('changeActive', id)
  // console.log(id)
}
// 列表分页
const currentPgae = ref(1)
const total = ref(0)
const pageSize = ref(10)
function handlePageChange(page: number) {
  currentPgae.value = page
  getImageClass(page, pageSize.value)
}
function handleSizeChange(size: number) {
  pageSize.value = size
}
// ImageAisde
const drawerRef = ref<InstanceType<typeof DrawerComponent>>()
const newFormRef = ref<FormInstance>()
// 对象接口
interface RuleForm {
  name: string
  order: number
}
interface ListObject {
  id: number
  images_count: number
  name: string
  order: number
}
const ruleForm = reactive<RuleForm>({
  name: '',
  order: 0
})
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  order: [{ required: true, message: '请输入数量', trigger: 'blur' }]
})
const handleChange = (value: number) => {
  ruleForm.order = value
}
// 编辑分类方法

const handleEdit = (row: ListObject) => {
  const { id, name, images_count, order } = row
  editId.value = id
  ruleForm.name = name
  ruleForm.order = order
  drawerRef.value?.showDrawer()
}
// 删除分类方法
const handleDelete = (id: number) => {
  deleteImageClass(id).then((res) => {
    // console.log(res)
    ElMessage.success(res.data.msg)
    getImageClass(1, 10)
  })
}
// 新增图片分类方法
const showInitDrawer = () => {
  editId.value = 0
  ruleForm.name = ''
  ruleForm.order = 50
  drawerRef.value?.showDrawer()
}
// 提交
const handleSubmit = (data: RuleForm) => {
  newFormRef.value?.validate((valid: boolean) => {
    if (!valid) {
      return
    }
    drawerRef.value!.loading = true
    const result = editId.value
      ? updateImageClass(editId.value, ruleForm)
      : addImageClass(ruleForm)
    result
      .then((res: any) => {
        ElMessage.success(drawerTitle.value + res.msg)
        getImageClass(editId.value ? currentPgae.value : 1, 10)
      })
      .finally(() => {
        drawerRef.value?.hideDrawer()
        drawerRef.value!.loading = false
      })
  })
}
// 对外暴露方法
defineExpose({
  showInitDrawer
})
</script>

<style scoped lang="scss">
.image-aside {
  border-right: solid 1px #eee;
  @apply relative;
}
.top {
  @apply absolute top-0 left-0 right-0 overflow-hidden bottom-[50px] overflow-y-auto;
}
.bottom {
  @apply absolute bottom-0 left-0 right-0 h-[50px];
}
</style>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner {
  display: block;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>