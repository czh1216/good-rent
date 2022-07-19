import request from '@/utils/request'

//获取城市列表数据
export const city = () => {
  return request({
    url: '/area/city',
    params: {
      level: 1
    }
  })
}

//获取热门城市列表
export const hotCity = () => {
  return request({
    url: '/area/hot'
  })
}
