<template>
  <el-card class="box-card">
    <template #header>
      <ListHeader></ListHeader>
    </template>
    <el-tree style="max-width: 100%" :data="treeData" :props="{label:'name',children:'child'}" @node-click="handleNodeClick" v-loading="loading" node-key="id" :default-expanded-keys="defaultExpandKeys" />
  </el-card>
</template>

<script setup lang="ts">
import ListHeader from '@/components/ListHeader.vue'
import { getRuleList } from '@/api/rule'

const treeData = ref([])
const defaultExpandKeys = ref([])
async function getRule(page: number) {
  await getRuleList(page).then((res) => {
    console.log(res)
    treeData.value = res.data.list
    defaultExpandKeys.value = treeData.value.map((item) => item.id)
  })
}
getRule(1)
</script>

<style scoped>
</style>