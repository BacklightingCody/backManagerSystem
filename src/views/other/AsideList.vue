<template>
  <div class="px-[10px] h-[50px] flex justify-between items-center cursor-pointer hover:bg-blue-50 hover:text-gray-600" :class="{'active':props.active}">
    <span class="flex items-center h-[32px] truncate">{{props.title}}</span>
    <span>
      <el-button type="primary" :icon="Edit" px-1 text @click.stop="$emit('edit')">
      </el-button>
      <span @click.stop="()=>{}">
        <el-popconfirm title="确定删除吗？" confirm-button-text="确定" @confirm="$emit('delete')" width="200px">
          <template #reference>
            <el-button type="danger" :icon="Delete" px-1 text>
            </el-button>
          </template>
        </el-popconfirm>
      </span>
    </span>
  </div>
</template>

<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: String,
  active: Boolean
})
const emits = defineEmits(['edit', 'delete']);


</script>

<style lang="scss" scoped>
.active {
  @apply bg-blue-50;
}
</style>