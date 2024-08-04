<template>
  <div class="card-header flex justify-between">
    <el-button type="success" @click="$emit('add')">新增</el-button>

    <el-tooltip class="box-item" effect="dark" content="刷新" placement="top">
      <el-button text @click="$emit('refresh')"><el-icon>
          <RefreshRight />
        </el-icon></el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { RefreshRight } from '@element-plus/icons-vue'
const emit = defineEmits(['add', 'refresh'])
</script>

<style scoped>
</style>