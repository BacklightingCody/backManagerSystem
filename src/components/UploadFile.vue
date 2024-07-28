<template>
  <DrawerComponent size="35%" direction="rtl" title="上传文件" confirm-text="确认" ref="drawerRef" @submit="handleSubmit">
    <el-upload class="upload-demo" drag v-model:file-list="fileList" :auto-upload="false" multiple name="img" list-type="picture" :on-preview="handlePreview" :on-success="uploadSuccess" :on-error="uploadError" :on-progress="uploadProgress" :before-upload="beforeUpload">
      <el-icon class="el-icon--upload">
        <UploadFilled />
      </el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload>
  </DrawerComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import DrawerComponent from '@/components/DrawComponent.vue'

const drawerRef = ref<InstanceType<typeof DrawerComponent>>()
const fileList = ref<UploadUserFile[]>([])
const emit = defineEmits(['uploadFile'])

function handleSubmit() {
  console.log(fileList.value)
  emit('uploadFile', fileList.value)
}

function handlePreview(file: UploadUserFile) {
  console.log('Preview', file)
}

function uploadSuccess(response: any, file: UploadUserFile) {
  console.log('Upload success', response, file)
}

function uploadError(error: any, file: UploadUserFile) {
  console.error('Upload error', error, file)
}

function uploadProgress(event: any, file: UploadUserFile) {
  console.log('Upload progress', event, file)
}

function beforeUpload(file: File) {
  console.log('Before upload', file)
  // Return true to continue the upload process, or a Promise
  return true
}

defineExpose({
  drawerRef
})
</script>

<style scoped>
</style>
