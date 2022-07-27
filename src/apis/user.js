import request from '@/utils/request'
import store from '@/store/index'

//登录
export const login = (username, password) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}

// 登出
export const logout = () => {
  return request({
    method: 'POST',
    url: '/user/logout'
  })
}

//获取用户资料
export const userInfo = () => {
  return request({
    method: 'GET',
    url: '/user'
  })
}

// 查看用户收藏列表
export const favorateList = () => {
  return request({
    method: 'GET',
    url: '/user/favorites'
  })
}

// 获取房屋出租列表
export const housesList = () => {
  return request({
    method: 'GET',
    url: '/user/houses'
  })
}

//发布房源
export const addHouses = (data) => {
  data.community = store.state.community.community
  console.log(data)
  return request({
    method: 'POST',
    url: '/user/houses',
    data
  })
}

//获取用户是否收藏
export const getFavorites = (id) => {
  return request({
    method: 'GET',
    url: `/user/favorites/${id}`
  })
}

//添加收藏
export const addFavorites = (id) => {
  return request({
    method: 'POST',
    url: `/user/favorites/${id}`
  })
}

//取消收藏
export const removeFavorites = (id) => {
  return request({
    method: 'DELETE',
    url: `/user/favorites/${id}`
  })
}
