import request from '@/utils/request'

export const login = (username: string, password: string) => {
  return request.post('/login', {
    username,
    password
  })
}
export const getInfo = () => {
  return request.post('/getinfo')
}

export const logout = () => {
  return request.post('/logout')
}

export const changePassword = (data: {
  oldpassword: string
  newpassword: string
  repassword: string
}) => {
  return request.post('/updatepassword', data)
}

// 获取管理员列表
export const getManagerList = (
  page: number = 1,
  query: { limit?: number; keyword?: string } = {}
) => {
  const queryString = new URLSearchParams(query).toString()
  return request.get(`/manager/${page}?${queryString}`)
}
// 增加管理员
export const addManager = (data: {
  username: string
  password: string
  role_id: number
  status: number
  avatar?: string
}) => {
  return request.post('/manager', data)
}

// 修改管理员
export const updateManager = (
  id: number,
  data: {
    username: string
    password: string
    role_id: string
    status: string
    avatar?: string
  }
) => {
  return request.post('/manager/' + id, data)
}
// 删除管理员
export const deleteManager = (id: number) => {
  return request.post(`manager/${id}/delete`)
}
// 修改管理员状态
export const updateManagerStatus = (id: number, status:number) => {
  return request.post(`manager/${id}/update_status`, { status })
}
// 配置角色权限
