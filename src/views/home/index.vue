<script setup lang="ts">
import { useUserStore } from '@/stores'
import { getStatistics1, getStatistics2 } from '@/api/index'
import CountTo from '@/components/CountTo.vue'
import IndexNavs from './IndexNavs.vue'
import IndexCharts from './IndexCharts.vue'
import IndexCard from './IndexCard.vue'
const userStore = useUserStore()
// 获取卡片数据
onMounted(() => {
  getStatistics1().then((res) => {
    // console.log(res.data.panels)
    panels.value = res.data.panels
  })
})

interface Panel {
  subTitle: string
  subunit: string
  subValue: number
  title: string
  unit: string
  unitColor: string
  value: number
}
const panels = ref<Panel[]>([])
// 获取子组件IndexCard的数据
interface CardValue {
  label: string
  value: number
}
const goods = ref<CardValue[]>([])
const orders = ref<CardValue[]>([])

function getStatistics2Data() {
  getStatistics2().then((res) => {
    // console.log(res.data)
    goods.value = res.data.goods
    orders.value = res.data.order
  })
}
getStatistics2Data()
// 组件卡片
</script>

<template>
  <div class="w-full">
    <el-row :gutter="20" v-permission="['getStatistics1,GET']">
      <el-col :span="6" v-for="index in 4" :key="index">
        <el-skeleton v-if="panels.length===0" animated loading>
          <template #template>
            <el-card shadow="hover">
              <template #header>
                <div class="flex justify-between items-align">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 20%" />
                </div>
              </template>
              <el-skeleton-item variant="text" style="width: 40%;height: 30%" />
              <template #footer>
                <div class="flex justify-between text-sm">
                  <el-skeleton-item variant="text" style="width: 60%" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                </div>
              </template>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
      <!-- 上面的代码是loading效果 -->
      <el-col v-for="item in panels" :key="item.title" :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="flex justify-between items-align">
              <span>
                {{ item.title }}
              </span>
              <el-tag effect="light" :type="item.unitColor">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl text-gray-600 font-bold">
            <CountTo :numvalue="item.value"></CountTo>
          </span>
          <template #footer>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">
                {{ item.subTitle }}
              </span>
              <span>
                {{ item.subValue }}
              </span>
            </div>
          </template>

        </el-card>
      </el-col>
    </el-row>
    <IndexNavs class="mt-5"></IndexNavs>
    <el-row :gutter="20" class="mt-5">
      <el-col :span="12"  v-permission="['getStatistics3,GET']">
        <IndexCharts></IndexCharts>
      </el-col>
      <el-col :span="12" class="flex! flex-col justify-between"  v-permission="['getStatistics2,GET']">
        <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :cardValues="goods"></IndexCard>
        <IndexCard title="交易提示" tip="需要立即处理的订单" :cardValues="orders"></IndexCard>
      </el-col>
    </el-row>
  </div>
</template>



<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>