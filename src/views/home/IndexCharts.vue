<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <span>订单详情</span>
        <div class="flex">
          <el-check-tag :checked="currentValue===item.value" v-for="item in options" :key="item.value" @click="handleClick(item.value)">{{item.text}}
          </el-check-tag>
        </div>
      </div>
    </template>
    <div ref="chart" id="chartContainer" class="w-full h-[320px]">

    </div>
  </el-card>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 引入vueuse监听resize
import { useResizeObserver } from '@vueuse/core'
// 引入echarts
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption
} from 'echarts/charts'
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])
// 引入接口
import { getStatistics3 } from '@/api/index'
// tag标签切换

const currentValue = ref('week')
const options = [
  {
    text: '近一个月',
    value: 'month'
  },
  {
    text: '近一周',
    value: 'week'
  },
  {
    text: '近24小时',
    value: 'hour'
  }
]
function handleClick(value: string) {
  currentValue.value = value
  getChartData()
}
let myChart: echarts.ECharts
onMounted(() => {
  const chartContainer = document.getElementById('chartContainer')
  if (chartContainer) {
    myChart = echarts.init(chartContainer)
    getChartData()
  }
})
// 在页面销毁时，销毁图标，否则有时候会造成白屏
onBeforeUnmount(() => {
  if (myChart) {
    echarts.dispose(myChart)
  }
})
function getChartData() {
  const option: ECOption = {
    title: {
      text:
        currentValue.value === 'month'
          ? '近一个月的订单情况'
          : currentValue.value === 'week'
          ? '近一周的订单情况'
          : '近24小时的订单情况'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: [] as string[]
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [] as number[]
      }
    ]
  }
  myChart.showLoading()
  getStatistics3(currentValue.value)
    .then((res) => {
      console.log(res)
      option.xAxis!.data = res.data.x
      option.series![0].data = res.data.y
      myChart.setOption(option)
    })
    .finally(() => {
      myChart.hideLoading()
    })
}
// 监听窗口变化，重新渲染图表
const chart = ref(null)
useResizeObserver(chart, (entries) => {
  myChart.resize()
})
</script>

<style scoped>
</style>