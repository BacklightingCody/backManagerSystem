import request from '@/utils/request'

export const getStatistics1 = () => {
  return request.get('/statistics1')
}

export const getStatistics2 = () => {
  return request.get('/statistics2?')
}

export const getStatistics3 = (type: string) => {
  return request.get('/statistics3?type=' + type)
}
