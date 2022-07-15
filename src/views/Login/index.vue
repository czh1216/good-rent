<template>
  <div>
      <van-nav-bar class="info" title="账号登录" left-arrow @click-left="background">
      <template #left><van-icon name="arrow-left" color="#fff" /></template>
      </van-nav-bar>

      <van-form @submit="login" class="fine">
        <van-field
          v-model="username"
          name="username"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
        />
        <van-field
          v-model="password"
          name="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <div style="margin: 16px;" class="dle">
          <van-button block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>

      <van-form class="ass">
          <a href="#">还没有账号，去注册~</a>
      </van-form>
  </div>
</template>
<script>
// 账号:hzhmqd密码:123456
import { login } from '@/api/uaer'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        const res = await login(this.username, this.password)
        console.log('登录成功', res)
      } catch (e) {
        if (e.response.status === 400) {
          console.log('登录失败', e)
        } else {
          console.log('登录事变,请稍后重试', e)
        }
      }
    },
    background () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang='less'>
.info{
    background-color:#21B97A;
    :deep(.van-nav-bar__title){
        color:#fff;
        font-size: 35px;
    }
}
.fine{
    :deep(.van-cell){
        height: 140px;
        line-height: 140px;
        font-size: 35px;
        font-weight: 320;
        color: #C0C0C4;
    }
}
.dle{
    :deep(.van-button){
        background-color: #1CB676;
        font-size: 35px;
    }
}
.ass{
    margin-top: 60px;
    font-size: 29px;
    text-align: center;
    a {
        color: rgb(131, 127, 127)
    }
}
</style>