<template>
  <div>
    <!-- 搜索框区域 -->
    <div class="home-search">
      <van-search
        v-model="value"
        placeholder="请输入小区或地址"
        class="home-search-list"
        background="#f7f8fa"
      >
        <span slot="label" class="search-text" @click="goCity"
          >{{ $store.state.currentCityL.label }}
          <i class="iconfont icon-xiangxia"></i>
        </span>
      </van-search>
      <van-icon name="location-o" class="search-icon" @click="goMap" />
    </div>
    <!-- 搜索框区域 -->
    <!-- 轮播图区域 -->
    <div class="home-banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerImgs" :key="item.id">
          <img :src="item.imgSrc" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播图区域 -->
    <!-- 导航区域 -->
    <div class="home-nav">
      <van-grid :border="false" :clickable="true">
        <van-grid-item class="grid" @click="goHomeTrue">
          <div class="home-nav-img">
            <img src="@/assets/img/zhengzu.png" />
          </div>
          <div class="text">整租</div>
        </van-grid-item>
        <van-grid-item class="grid" @click="goHomeFalse">
          <div class="home-nav-img">
            <img src="@/assets/img/hezu.png" />
          </div>
          <div class="text">合租</div>
        </van-grid-item>
        <van-grid-item class="grid" @click="goMap">
          <div class="home-nav-img">
            <img src="@/assets/img/ditu.png" />
          </div>
          <div class="text">地图找房</div>
        </van-grid-item>
        <van-grid-item class="grid" @click="goAdd">
          <div class="home-nav-img">
            <img src="@/assets/img/chuzu.png" />
          </div>
          <div class="text">去出租</div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 导航区域 -->
    <!-- 租房小组 -->
    <div class="group">
      <div class="top">
        <h3>租房小组</h3>
        <div>更多</div>
      </div>
      <div class="bottom">
        <van-grid
          direction="horizontal"
          :column-num="2"
          :gutter="10"
          :clickable="true"
        >
          <van-grid-item v-for="item in groupList" :key="item.id">
            <div slot="default" class="default">
              <div class="left">
                <img :src="item.imgSrc" alt="" />
              </div>
              <div class="right">
                <p>{{ item.title }}</p>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 租房小组 -->
  </div>
</template>

<script>
import { bannerImg, groupList } from '@/apis/home'
import { mapMutations } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      bannerImgs: [],
      value: '',
      groupList: []
    }
  },
  async created () {
    // 请求banner图片
    try {
      const { data } = await bannerImg()
      // 将url拼接完整
      data.body.forEach((item) => {
        item.imgSrc = `http://liufusong.top:8080${item.imgSrc}`
      })
      this.bannerImgs = data.body
    } catch (e) {
      this.$toast.fail(e.message)
    }
    // 请求租房小组
    const res = await groupList()
    res.data.body.forEach((item) => {
      item.imgSrc = `http://liufusong.top:8080${item.imgSrc}`
    })
    this.groupList = res.data.body
  },
  methods: {
    // 点击去出租跳转发布房源页
    goAdd () {
      this.$router.push({
        path: '/rent/add'
      })
    },
    //点击跳转城市列表
    goCity () {
      this.$router.push({
        path: '/city'
      })
    },
    //跳转整租页面
    goHomeTrue () {
      this.setParameters(['true', 4])
      this.$router.push({
        path: '/HomePage/goHome'
      })
    },
    //跳转合租页面
    goHomeFalse () {
      this.setParameters(['false', 4])
      this.$router.push({
        path: '/HomePage/goHome'
      })
    },
    //跳转地图
    goMap () {
      this.$router.push({
        path: '/map'
      })
    },
    ...mapMutations(['setParameters'])
  }
}
</script>

<style lang="less" scoped>
.home-banner {
  width: 375px;
  height: 212px;
  img {
    width: 100%;
    height: 100%;
  }
}
.home-search {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  height: 35px;
  z-index: 99;
  .home-search-list {
    flex: 1;
    border-radius: 5px;
    .search-text {
      margin-left: -18px;
      padding-right: 5px;
      border-right: 1px solid #e5e5e5;
      .iconfont {
        font-size: 12px;
        color: #7f7f80;
      }
    }
  }
  .search-icon {
    width: 25px;
    height: 34px;
    font-size: 25px;
    color: #fff;
    text-align: center;
    line-height: 34px;
    margin-left: 15px;
  }
}
.home-nav {
  height: 112px;
  background-color: pink;
  .grid {
    height: 112px;
    .home-nav-img {
      img {
        width: 60px;
        height: 60px;
      }
    }
    .text {
      font-size: 14px;
      margin-top: 8px;
    }
  }
}
.group {
  height: 188px;
  width: 375px;
  background-color: #f6f5f6;
  text-align: center;
  padding-top: 15px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 345px;
    height: 18px;
    margin: 0 15px 15px 15px;
    h3 {
      font-size: 15px;
      color: #333;
    }
    div {
      font-size: 14px;
      color: #787d82;
    }
  }
  /deep/.van-grid-item__content {
    padding: 5px;
    border-radius: 8px;
  }
  .bottom {
    .default {
      display: flex;
      padding: 0;
      .left {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        margin-top: 5px;
        p {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
