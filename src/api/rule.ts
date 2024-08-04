import request from '@/utils/request'
export const getRuleList = (page:number) => {
  return request.get('/rule/'+page)
}
