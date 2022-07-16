<template>
  <div>
    <div>
       <!--头部 -->
    <div class="nav-title">
      <!-- 搜索 -->
      <van-search placeholder="请输入搜索关键词" background="0">
        <template slot="label">
          <div @click="city">
            <span>上海</span>
            <van-icon name="play" color="#7F7F80" />
          </div>
        </template>
      </van-search>
      <!-- 地图 -->
      <div class="ditu-nav">
        <i class="iconfont icon-ditu1"></i>
      </div>
    </div>
    <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="http://liufusong.top:8080/img/swiper/1.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="http://liufusong.top:8080/img/swiper/2.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="http://liufusong.top:8080/img/swiper/3.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--合租 -->
    <van-grid clickable :column-num="4" :border="false">
      <van-grid-item text="整租">
        <template #icon>
          <div class="background">
            <van-icon name="wap-home-o" color="#0EB36F" size="40px" />
          </div>
        </template>
      </van-grid-item>
      <van-grid-item text="合租">
        <template #icon>
          <div class="background">
            <van-icon name="friends-o" color="#0EB36F" size="40px" />
          </div>
        </template>
      </van-grid-item>
      <van-grid-item text="地图找房">
        <template #icon>
          <div class="background">
            <van-icon name="location-o" color="#0EB36F" size="40px" />
          </div>
        </template>
      </van-grid-item>
      <van-grid-item text="去出租">
        <template #icon>
          <div class="background">
            <van-icon name="newspaper-o" color="#0EB36F" size="40px" />
          </div>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 租房小组 -->
    <div class="group">
      <div class="lgroups">
        <h4 class="group-title">租房小组</h4>
        <span class="more">更多</span>
      </div>
      <van-grid
        :column-num="2"
        direction="horizontal"
        :gutter="8"
        class="picture"
      >
        <van-grid-item>
          <template>
            <van-image
              width="50"
              height="50"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="huilongguan">家住回龙观<br/>归属的感觉</div>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template>
            <van-image
              width="50"
              height="50"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="huilongguan">宜居四五环<br/>大都市生活</div>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template>
            <van-image
              width="50"
              height="50"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="huilongguan">喧嚣三里屯<br/>繁华的背后</div>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template>
            <van-image
              width="50"
              height="50"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="huilongguan">比邻十号线<br/>地铁心连心</div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    city () {
      this.$router.push('/city')
    }
  }
}
</script>

<style scoped lang="less">
// 头部
// 搜索
.nav-title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  right: 35px;
  z-index: 999;
  .van-search__label {
    font-size: 30px;
    margin-right: 10px;
    border-right: 1px solid #e5e5e5;
  }
  .ditu-nav {
    width: .625rem;
    height: .625rem;
    border: 5px solid rgb(255, 255, 255);
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin-left: 6px;
    .iconfont {
      line-height: 50px;
      font-size: 37px;
      color: rgb(255, 254, 254);
    }
  }
  .van-icon{
    transform: rotate(90deg);
  }
}

// 轮播图
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 412px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  img {
    width: 100%;
    height: 100%;
  }
}

// 合租
.background {
  display: flex;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: #f2fbf7;
  justify-content: center;
  align-items: center;
}

// 租房小组
.group {
  background-color: #f6f5f6;
  // position: relative;
  padding: 18px 10px;
  // 更多
  .lgroups {
    display: flex;
    justify-content: space-between;
    flex: 1;
    .group-title {
      margin: 15px 0 15px 10px;
      font-size: 30px;
    }
    .more {
      font-size: 30px;
      margin: 10px 20px;
      color: #787d82;
    }
  }
  //图片
  .van-image {
    margin: 0 10px;
  }
  .huilongguan {
    font-size: 26px;
      margin: 0;
      letter-spacing: 1px;
  }
}
</style>
