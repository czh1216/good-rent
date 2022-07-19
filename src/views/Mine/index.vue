<template>
  <div>
    <!-- 登录页面 -->
    <div class="tpp" v-if="users">
      <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
      <div class="already">
        <div class="tourist-sos">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <div class="register-sos">
          <p>好客_845296</p>
          <van-button class="button-sos" round type="info" @click="logout"
            >退出</van-button
          >
          <span class="zll"
            ><a href="#">编辑个人资料  </a>
            <van-icon name="play" color="#999999" />
          </span>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div class="tp" v-else>
      <img src="http://liufusong.top:8080/img/profile/bg.png" alt="" />
      <div class="ykdl">
        <div class="tourist">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <div class="register">
          <p>qwerty</p>
          <van-button class="button" type="info" @click="goLogin">去登录</van-button>
        </div>
      </div>
    </div>
    <!--  -->
    <van-grid class="qqq" :clickable='true' :column-num="3" :border="false">
      <van-grid-item
      icon="star-o"
      text="我的收藏"
      @click="users ? $router.push('/collect') : $router.push('/login')" />

      <van-grid-item
      icon="wap-home-o"
      text="我的出租"
      @click="users ? $router.push('/rentout') : $router.push('/login')" />

      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="idcard" text="成为房主" />
      <van-grid-item icon="manager-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <div class="advertising">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>
<script>
import { favorateList, userInfo } from '@/api/uaer'
// import { mapState } from 'vuex'
export default {
  computed: {
    users () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    //跳转登录页面
    goLogin () {
      this.$toast.loading('加载中')
      this.$router.push({
        path: '/login'
      })
      this.$toast.success('加载成功')
    },
    //退出登录
    logout () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确认退出该账号'
        })
        .then(async () => {
          try {
            const { data } = await favorateList()
            this.$toast.loading('退出中')
            this.$store.commit('setUser', {})
            this.$toast.success(data.description)
          } catch (error) {
            this.$toast.fail('退出失败')
          }
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  async created () {
    try {
      if (this.token) {
        const { data } = await userInfo()
        if (!data.body) {
          throw 'Error'
        }
        this.userInfo = data.body
      }
      console.log(await userInfo())
    } catch (error) {
      this.$toast.fail('用户认证失败或已过期')
      this.$store.commit('setUser', {})
    }
  }
}
</script>

<style scoped lang="less">
.tpp {
  position: relative;
  width: 100%;
  height: 9.5rem;
  //   background-color: #a83a3a;
  img {
    width: 100%;
    height: 100%;
  }
  .already {
    position: absolute;
    bottom: 0;
    left: 56px;
    background-color: rgb(255, 255, 255);
    width: 85%;
    height: 55%;
    box-shadow: 0 0 30px 9px #ddd;
  }
  .tourist-sos {
    position: absolute;
    width: 1.75rem;
    height: 1.75rem;
    left: 40%;
    top: -18%;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 30px 9px #ddd;
    img {
      width: 80%;
      height: 80%;
      transform: translate(13%, 11%);
    }
  }
  .register-sos {
    position: absolute;
    width: 450px;
    height: 190px;
    margin-top: 60px;
    left: 100px;
    p {
      text-align: center;
      font-size: 0.345rem;
    }
    .button-sos {
      position: absolute;
      width: 1.5rem;
      height: 0.5rem;
      font-size: 20px;
      margin: -10px 2.1625rem;
      background-color: #21b97a;
    }
    .zll {
      position: absolute;
      // bottom: 10px;
      width: 200px;
      margin: 100px 117px 0;
      // background-color: rgb(161, 109, 109);
      font-size: 25px;
      a {
        color: rgb(158, 158, 158);
      }
    }
  }
}
.tp {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #ffffff;
  img {
    width: 100%;
    height: 376px;
  }
  .ykdl {
    position: absolute;
    bottom: 0;
    left: 56px;
    background-color: rgb(255, 255, 255);
    width: 85%;
    height: 55%;
    box-shadow: 0 0 30px 9px #ddd;
  }
  .tourist {
    position: absolute;
    width: 160px;
    height: 160px;
    left: 40%;
    top: -25%;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 30px 9px #ddd;
    img {
      width: 80%;
      height: 80%;
      transform: translate(13%, 11%);
    }
  }
}

.register {
  position: absolute;
  width: 450px;
  height: 190px;
  margin-top: 80px;
  left: 110px;
  p {
    text-align: center;
    font-size: 30px;
  }
  .button {
    width: 160px;
    height: 65px;
    font-size: 30px;
    margin: 10px 32%;
    background-color: #21b97a;
  }
}
.advertising {
  position: absolute;
  left: 36px;
  width: 90%;
  height: 160px;
  margin-top: 40px;
  img {
    width: 100%;
    height: 100%;
  }
}
.qqq {
  margin-top: 20px;
  background-color: #fff;
}
</style>
