import { createApp } from 'vue'
import pinia from '@/stores'
import permission from '@/directive/permission'
import '@/assets/reset.css'
import 'nprogress/nprogress.css'
import 'virtual:uno.css'
import App from '@/App.vue'
import {router} from '@/router'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(permission)
app.mount('#app')
