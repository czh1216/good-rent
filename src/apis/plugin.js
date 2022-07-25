import request from '@/utils/request'

//发布图片
export const plugin = (file) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    data: file
  })
}
