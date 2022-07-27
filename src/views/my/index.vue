<template>
  <div class="my">
    <!-- 头部部分  未登录-->
    <div class="myheader" v-if="!$store.state.token">
      <!-- 背景图 -->
      <div class="headerimg">
        <img src="@/assets/img/bg.png" alt="" />
      </div>
      <!-- 头像 -->
      <div class="imgbg">
        <img src="@/assets/img/avatar.png" alt="" />
      </div>
      <div class="maskheader">
        <div class="header-username">游客</div>
        <van-button type="primary" class="van_btn" @click="goLogin"
          >去登陆</van-button
        >
      </div>
    </div>
    <!-- 头部部分  未登录-->

    <!-- 头部部分  已登录-->
    <div class="myheader" id="myheader" v-else>
      <!-- 背景图 -->
      <div class="headerimg">
        <img src="@/assets/img/avatar (1).png" alt="" />
      </div>
      <!-- 头像 -->
      <div class="imgbg">
        <img :src="userImg" alt="" />
      </div>
      <div class="maskheader">
        <div class="header-username">{{ userInfo.nickname }}</div>
        <van-button type="primary" class="van_btn" @click="noLogin"
          >退出</van-button
        >
        <div class="loginmy" @click="smessage">编辑个人资料<van-icon name="arrow" /></div>
      </div>
    </div>
    <!-- 头部部分  已登录-->

    <!-- 列表 -->
    <van-grid
      :column-num="3"
      class="my-list"
      :border="false"
      :clickable="true"
      icon-size="20px"
    >
      <van-grid-item
        icon="star-o"
        text="我的收藏"
        class="my-list-item"
        to="/favorate"
      />
      <van-grid-item
        icon="wap-home-o"
        text="我的出租"
        class="my-list-item"
        to="/rent"
      />
      <van-grid-item icon="clock-o" text="看房记录" class="my-list-item" />
      <van-grid-item icon="debit-pay" text="成为房主" class="my-list-item" />
      <van-grid-item icon="manager-o" text="个人资料" class="my-list-item" />
      <van-grid-item icon="service-o" text="联系我们" class="my-list-item" />
    </van-grid>

    <!-- 图片 -->
    <div class="data-img">
      <img src="@/assets/img/join.png" />
    </div>
  </div>
</template>

<script>
import { userInfo, logout } from '@/apis/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    // 跳转登录页面
    goLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    smessage () {
      this.$router.push('/smessage')
    },
    // 退出登录
    noLogin () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确定退出'
        })
        .then(async () => {
          try {
            const { data } = await logout()
            this.$toast.loading('退出中')
            this.$store.commit('addToken', null)
            this.$toast.success(data.description)
          } catch (error) {
            this.$toast.fail('登出失败')
          }
        })
    }
  },
  async created () {
    try {
      //判断token是否有效或者存在
      if (this.token) {
        const { data } = await userInfo()
        if (!data.body) {
          throw 'Error'
        }
        this.userInfo = data.body
      }
    } catch (e) {
      this.$toast.fail('用户认证失败或已过期')
      this.$store.commit('addToken', null)
    }
  },
  computed: {
    userImg () {
      return `http://liufusong.top:8080${this.userInfo.avatar}`
    },
    ...mapState(['token'])
  }
}
</script>

<style lang="less" scoped>
.my {
  padding-bottom: 50px;
}
.myheader {
  position: relative;
  height: 300px;
  width: 375px;
  .headerimg {
    img {
      width: 100%;
    }
  }
  .maskheader {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 320px;
    height: 165px;
    background-color: #fff;
    text-align: center;
    box-shadow: 1px 3px 5px 3px #ebebeb;
    .header-username {
      margin-top: 54px;
      font-size: 14px;
    }
    .van_btn {
      width: 70px;
      height: 30px;
      font-size: 12px;
      background-color: #21b97a;
      border-radius: 5px;
      margin-top: 20px;
    }
  }
  .imgbg {
    position: absolute;
    bottom: 130px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 70px;
    height: 70px;
    padding: 5px;
    background-color: #f6f6f6;
    border-radius: 50%;
    text-align: center;
    box-shadow: 0px 1px 1px 1px #c7c7c7;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
#myheader {
  height: 375px;
  .maskheader {
    height: 208px;
  }
  .imgbg {
    position: absolute;
    bottom: 175px;
  }
  .van_btn {
    width: 56px;
    height: 20px;
    font-size: 12px;
    border-radius: 10px;
    margin-top: 5px;
  }
  .loginmy {
    font-size: 12px;
    color: #999;
    margin-top: 20px;
  }
}
.my-list {
  .van-grid-item__text {
    font-size: 13px;
  }
  .my-list-item {
    margin-top: 18px;
  }
}
.data-img {
  width: 345px;
  height: 85px;
  margin-left: 15px;
  margin-top: 10px;
  img {
    width: 100%;
  }
}
</style>
