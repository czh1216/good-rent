import request from '@/utils/request'

// 获取轮播图图片
export const bannerImg = () => {
  return request({
    method: 'GET',
    url: '/home/swiper'
  })
}

// 租房小组列表
export const groupList = () => {
  return request({
    method: 'GET',
    url: '/home/groups'
  })
}
