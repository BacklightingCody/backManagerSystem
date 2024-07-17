<script setup lang="ts">
import gsap from 'gsap'
import { reactive, watch } from 'vue'
const count = reactive({ num: 0 })
const props = defineProps({
  numvalue: {
    type: Number,
    default: 0
  }
})

function countTo() {
  gsap.to(count, {
    duration: 1,
    num: props.numvalue
  })
}
countTo()
watch(
  () => props.numvalue,
  () => {
    countTo()
  }
)
</script>
<template>
  <span>
    {{ count.num.toFixed(2) }}
  </span>
</template>



<style scoped>
</style>