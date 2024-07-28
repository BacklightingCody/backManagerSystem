<template>
  <el-main class="image-main relative">
    <div class="top" v-loading="loading">
      <el-row :gutter="15">
        <el-col :span="6" v-for="item in imageList" :key="item.id">
          <el-card class="relative w-full h-[200px] mb-3" hover :body-style="{padding:0}">
            <el-image :src="item.url" :key="item.url" lazy fit="cover" class="w-full h-[150px]" :preview-src-list="[item.url]" :initial-index="4" />
            <div class="absolute bottom-[50px] text-white w-full bg-black bg-opacity-40 flex justify-center">{{ item.name }}</div>
            <div class="flex justify-end m-3">
              <el-button type="warning" size="small" plain @click="rename(item.id,item.name)">重命名</el-button>
              <el-popconfirm title="你确认要删除吗？" @confirm="delImage([item.id])" width="250px" :icon="WarningFilled" icon-color="red" confirm-button-text="确认" cancel-button-text="取消">
                <template #reference>
                  <el-button type="danger" size="small" plain>删除</el-button>
                </template>
              </el-popconfirm>

            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-pagination class="mt-4" background layout="total,prev,pager,next" :total="total" :current-page="currentPgae" :page-size="pageSize" @current-change="handlePageChange" @size-change="handleSizeChange" />
    </div>
  </el-main>
  <upload-file ref="uploadRef" @upload-file="handleUpload"></upload-file>
</template>

<script setup lang="ts">
import {
  getImageData,
  renameImage,
  deleteImage,
  uploadImage
} from '@/api/image'
import { Picture, WarningFilled } from '@element-plus/icons-vue'
import UploadFile from '@/components/UploadFile.vue'
import { get } from 'http'
interface ImageList {
  create_time: string
  id: number
  image_class_id: number
  name: string
  path: string
  update_time: string
  url: string
}
const total = ref(0)
const imageClassId = ref(168)
const currentPgae = ref(1)
const pageSize = ref(10)
const imageList = ref<ImageList[]>([])
const loading = ref(false)
// 分页
function handlePageChange(page: number) {
  currentPgae.value = page
  getImage(imageClassId.value, page)
}
function handleSizeChange(size: number) {
  pageSize.value = size
}
// 图片相关
const changeId = (id: number) => {
  imageClassId.value = id
}
watch(
  () => imageClassId.value,
  () => {
    getImage(imageClassId.value, currentPgae.value)
  }
)

const getImage = async (id: number, page: number) => {
  loading.value = true
  await getImageData(id, page)
    .then((res: any) => {
      console.log(res, 1111111111111111)
      imageList.value = res.data.list
      total.value = res.data.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}
onMounted(() => {
  getImage(imageClassId.value, currentPgae.value)
})
const rename = async (id: number, name: string) => {
  ElMessageBox.prompt('重命名', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: name
  }).then(async (value) => {
    console.log(value)
    await renameImage(id, value.value).then((res) => {
      ElMessage.success('succes')
      getImage(imageClassId.value, currentPgae.value)
    })
  })
}
const delImage = async (ids: number[]) => {
  loading.value = true
  await deleteImage(ids)
    .then((res) => {
      ElMessage.success(res.data.msg)
    })
    .finally(() => {
      loading.value = false
      getImage(imageClassId.value, 1)
    })
}
// 上传文件
const uploadRef = ref<InstanceType<typeof UploadFile>>()
const handleUpload = async (file: File[]) => {
  await uploadImage(imageClassId.value, file).then((res) => {
    console.log(res)
  })
}
function openUploadDrawer(): void {
  uploadRef.value?.drawerRef?.showDrawer()
}
defineExpose({
  changeId,
  openUploadDrawer
})
</script>

<style scoped>
.top {
  @apply absolute top-0 left-0 right-0 overflow-hidden bottom-[50px] overflow-y-auto;
}
.bottom {
  @apply absolute bottom-0 left-0 right-0 h-[50px] flex justify-center;
  line-height: 50px;
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