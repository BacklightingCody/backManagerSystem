import request from '@/utils/request'

export function getImageClassList(page: number, limit: number) {
  // return request({
  //   url: `/image_class/${page}`,
  //   method: 'get',
  //   params: { limit }
  // });
  return request.get(`/image_class/` + page, { params: { limit } })
}
// 新添图片分类
export function addImageClass(data: any) {
  return request.post('/image_class', data)
}
// 更新图片分类
export function updateImageClass(id: number, data: any) {
  return request.post(`/image_class/` + id, data)
}
// 删除图片分类
export function deleteImageClass(id: number) {
  return request.post(`/image_class/${id}/delete`)
}
// 获取图片详细信息列表
export function getImageData(id: number, page: number = 1, limit: number = 10) {
  return request.get(`image_class/${id}/image/${page}`, { params: { limit } })
}
// 重名名图片name
export function renameImage(id: number, name: string) {
  return request.post(`/image/` + id, { name })
}

// 删除图片
export function deleteImage(ids: number[]) {
  return request.post(`image/delete_all`, { ids })
}
// 上传图片
export function uploadImage(image_class_id: number, img: File[]) {
  return request.post(
    `image/upload`,
    {
      image_class_id,
      img: img.map((item) => item.raw)
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
// 获取公告列表
export function getNotice(page: number) {
  return request.get(`/notice/${page}`)
}
// 增加公告
export function addNotice(data: { title: string; content: string }) {
  return request.post(`/notice`, data)
}
// 更新公告
export function updateNotice(
  id: number,
  data: { title: string; content: string }
) {
  return request.post(`/notice/${id}`, data)
}
// 删除公告
export function deleteNotice(id: number) {
  return request.post(`notice/${id}/delete`)
}
