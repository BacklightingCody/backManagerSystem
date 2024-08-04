<template>
  <div class="flex">
    <div v-if="props.modelValue" class="h-[100px] w-[100px] cursor-pointer mr-3">
      <el-image style="width: 100px; height: 100px" :src="props.modelValue" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="urls" :initial-index="4" fit="cover" />
    </div>
    <div class="image w-[100px] h-[100px] rounded b b-dashed b-gray  flex justify-center items-center cursor-pointer hover:(bg-gray-100)" @click="showDialog">
      <el-icon class="text-gray-500 text-2xl">
        <Plus />
      </el-icon>
    </div>

    <el-dialog v-model="showdialog" title="请选择图片" width="80%" top="20px">
      <Index checked @choosed-image="handleImage" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="hideDialog">Cancel</el-button>
          <el-button type="primary" @click="handleConfirm">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import Index from '@/views/other/index.vue'

const showdialog = ref(false)
const props = defineProps({
  modelValue: [String, Array]
})
const emits = defineEmits(['update:modelValue'])
function showDialog() {
  showdialog.value = true
}
function hideDialog() {
  showdialog.value = false
}
const urls = ref<string[]>([])
function handleConfirm() {
  if (urls.value.length) {
    emits('update:modelValue', urls.value[0])
  }
  hideDialog()
}

function handleImage(e: { url: string }[]) {
  urls.value = e.map((o) => o.url)
}
</script>

<style scoped>
</style>
