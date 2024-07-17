<template>
  <div>
    <el-card class="bg-gray-100">
      <template #header>
        <div class="flex justify-between items-center">
          <span>
            {{ props.title }}
          </span>
          <el-tag :key="props.tip" type="warning" effect="light" size="large">
            {{ props.tip }}
          </el-tag>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6" :offset="0" class="flex" v-for="item in props.cardValues" :key="item.label">
          <el-card shadow="hover" class="border-0! bg-gray-100! cursor-pointer">
            <div class="flex flex-col items-center justify-center">
              <span class=" text-xl mb-2">{{item.value}}</span>
              <span class="text-gray-400 text-sm">{{item.label}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface CardValue {
  label: String
  value: number
}
const props = defineProps<{
  title: string
  tip: string
  cardValues: CardValue[]
}>()
// console.log(props.cardValues)
</script>

<style scoped>
</style>