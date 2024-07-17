import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = 'admin-token'
const cookies = useCookies()
// 获取Token
export function getToken(){
    return cookies.get(TokenKey)
}
// 设置Token
export function setToken(token:string|undefined){
    return cookies.set(TokenKey,token)
}
// 删除Token
export function delToken(){
    return cookies.remove(TokenKey)
}