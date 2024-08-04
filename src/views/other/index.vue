<template>
  <el-container class="bg-white rounded px-[0px] py-0" :style="{ height: (h + 'px') }">
    <el-header class="image-header">
      <el-button type="primary" plain @click="openAddDarwer">
        新增图片分类
      </el-button>
      <el-button type="warning" plain @click="openUploadDarwer">
        上传图片
      </el-button>
    </el-header>
    <el-container>
      <ImageAside ref="imageAsideRef" @change-active="handleActiveId" />
      <ImageMain ref="imageMainRef" :showCheck="props.checked" @choosed="handleChoosed" />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import ImageAside from './ImageAside.vue'
import ImageMain from './ImageMain.vue'

const props = defineProps({
  checked: Boolean
})
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 50

// ImageAside
const imageAsideRef = ref<InstanceType<typeof ImageAside>>()
// 点击头部按钮打开弹窗
const openAddDarwer = () => {
  imageAsideRef.value!.showInitDrawer()
}
const openUploadDarwer = () => {
  imageMainRef.value?.openUploadDrawer()
}
const handleActiveId = (id: number) => {
  imageMainRef.value?.changeId(id)
}
// ImageMain
const imageMainRef = ref<InstanceType<typeof ImageMain>>()
// 处理关于图片选中的emit事件
const emits = defineEmits(['choosedImage'])
const handleChoosed = (value: any) => {
  emits('choosedImage', value)
}
</script>

<style scoped lang="scss">
.image-header {
  border-bottom: solid 1px #eee;
  @apply bg-white flex items-center;
}
</style>

<style scoped>
</style>