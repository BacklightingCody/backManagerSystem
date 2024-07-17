import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { getInfo, logout,changePassword} from '@/api/manager'
import { delToken } from '@/utils/auth'
interface Role {
  id: number
  name: string
}

interface MenuChild {
  id: number
  rule_id: number
  status: number
  create_time: string
  update_time: string
  name: string
  desc: string
  frontpath: string | null
  condition: string | null
  menu: number
  order: number
  icon: string
  method: string
  child: MenuChild[] // 如果 `child` 可以嵌套更多的 `MenuChild`
}

interface Menu {
  id: number
  rule_id: number
  status: number
  create_time: string
  update_time: string
  name: string
  desc: string
  frontpath: string | null
  condition: string | null
  menu: number
  order: number
  icon: string
  method: string
  child: MenuChild[]
}

interface UserInfo {
  id: number
  username: string
  avatar: string
  super: number
  role: Role
  menus: Menu[]
  ruleNames: string[]
}
export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<UserInfo | undefined>(undefined)
    const ruleNames = ref<string[]>([])
    const isGetedInfo = ref(false)
    const router = useRouter()
    // 定义关于用户信息的函数
    function getedInfo() {
      isGetedInfo.value = true
    }
    function setUserInfo(info: UserInfo) {
      user.value = info
      ruleNames.value = info.ruleNames
    }

    function getUserInfo() {
      getInfo().then((res) => {
        getedInfo()
        setUserInfo(res.data)
        console.log(user.value)
        ElNotification({
          title: '获取信息成功',
          type: 'success'
        })
      })
    }

    // 用户登录相关
    function userLogout() {
      ElMessageBox.confirm('你确定要退出吗？', 'Warning', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          logout()
          ElNotification({
            title: '退出登录成功',
            type: 'success'
          })
          delToken()
          isGetedInfo.value = false
          user.value = undefined
          router.push('/login')
        })
        .catch(() => {
          ElMessage({
            type: 'success',
            message: '已取消退出'
          })
        })
    }
    // 用户修改密码
    function updatePassword({oldpassword,newpassword,repassword}:{oldpassword:string,newpassword:string,repassword:string}) {
      const data = {
        oldpassword,
        newpassword,
        repassword
      }
      console.log(data)
      changePassword(data).then((res) => {
        console.log(res)
        ElNotification({
          title: '修改成功',
          type: 'success'
        })
        userLogout()
        router.push('/login')
      }).catch(()=>{
        ElMessage.error('修改失败')
      })

    }
    return {
      user,
      ruleNames,
      isGetedInfo,
      getedInfo,
      getUserInfo,
      setUserInfo,
      userLogout,
      updatePassword
    }
  },
  {
    persist: true
  }
)
