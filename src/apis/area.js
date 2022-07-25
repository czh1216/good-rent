import request from '@/utils/request'
import store from '@/store/index'

//获取小区名
export const getCommunity = (name) => {
  return request({
    method: 'GET',
    url: '/area/community',
    params: {
      name,
      id: store.state.currentCityL.value
    }
  })
}

//获取城市列表数据 /area/city
export const getCity = () => {
  return request({
    method: 'GET',
    url: '/area/city',
    params: {
      level: 1
    }
  })
}

//获取热门城市列表
export const hotCity = () => {
  return request({
    method: 'GET',
    url: '/area/hot'
  })
}

//获取地图坐标/area/map coordinate
export const getMapCoordinate = (id) => {
  return request({
    method: 'GET',
    url: '/area/map',
    params: {
      id
    }
  })
}

//获取
