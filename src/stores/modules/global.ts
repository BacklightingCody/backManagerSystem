import { defineStore } from 'pinia'
import { computed} from 'vue'
import {useRoute} from 'vue-router'

export const useGlobalStore = defineStore('global', () => {
  const route = useRoute()

  const defaultActive =computed(()=>{
    return route.path
  })

  return{
    defaultActive,
  }
})