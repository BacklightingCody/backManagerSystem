<template>
  <el-container class="bg-white rounded px-[20px] py-0" :style="{ height: (h + 'px') }">
    <el-header class="image-header">Header</el-header>
    <el-container>
      <el-aside width="200px" class="image-aside">
        <div class="top">
          <p v-for="i in 50" :key="i">i</p>
        </div>
        <div class="bottom">

        </div>

      </el-aside>
      <el-main class="image-main relative">
        <div class="top">
          <p v-for="i in 50" :key="i">i</p>
        </div>
        <div class="bottom">

        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 50
</script>

<style scoped lang="scss">
.image-header {
  border-bottom: solid 1px #eee;
  @apply bg-white flex items-center;
}
.image-aside {
  border-right: solid 1px #eee;
  @apply relative;
}
.top{
@apply absolute top-0 left-0 right-0 overflow-hidden bottom-[50px] overflow-y-auto
}
.bottom{
  @apply absolute bottom-0 left-0 right-0 h-[50px] bg-red-400;
}
</style>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner {
  display: block;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>