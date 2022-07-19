import request from '@/utils/request'

/**
 * 登录
 * @param {String} username //账号
 * @param {String} password //密码
 * @returns Promise
 */
export const login = (username, password) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { username, password }
  })
}

// 查看用户收藏列表
export const favorateList = () => {
  return request({
    url: '/user/favorites'
  })
}
//获取用户的信息资料
export const userInfo = () => {
  return request({
    method: 'GET',
    url: '/user'
  })
}
//查看已发布房源列表
export const houses = () => {
  return request({
    url: '/user/houses'
  })
}