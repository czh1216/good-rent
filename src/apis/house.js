import request from '@/utils/request'

//获取房屋数据
export const getHouses = () => {
  return request({
    method: 'GET',
    url: '/houses/params'
  })
}

//获取房屋查询条件
export const getCondition = (id) => {
  return request({
    method: 'GET',
    url: '/houses/condition',
    params: {
      id
    }
  })
}

//根据条件查询房屋 /houses
export const getHousesAll = (params) => {
  return request({
    method: 'GET',
    url: '/houses',
    params
  })
}

//获取具体房源数据
export const getMap = (id) => {
  return request({
    method: 'GET',
    url: `/houses/${id}`
  })
}

//获取地图最后一级房源
export const getMapEnd = (id) => {
  return request({
    method: 'GET',
    url: '/houses',
    params: {
      cityId: id
    }
  })
}
