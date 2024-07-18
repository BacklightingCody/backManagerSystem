<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
    <RouterView />

</template>

<style>
body{
  @apply bg-gray-100 z-0
}

/*::-webkit-scrollbar {
  display: none;
}
  */
#nprogress .bar{
  background-color:#29d;
  height: 3px;
}
#app{
  width:100%;
  height: 100%;
}

</style>
