import request from '@/utils/request'

export const city = () => {
  return request({
    url: '/area/city'
  })
}
