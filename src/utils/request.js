import axios from 'axios'
import store from '@/store/index'

const request = axios.create({
  baseURL: 'http://liufusong.top:8080/'
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const { token } = store.state
    // 请求发起会经过这里
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  function (error) {
    // 请求还没有发出去就出错了
    return Promise.reject(error)
  }
)

export default request
