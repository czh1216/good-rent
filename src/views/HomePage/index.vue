<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>

    <!-- 底部导航栏 -->
    <van-tabbar class="HomePagefooter" route>
      <van-tabbar-item icon="wap-home-o" to="/HomePage/home">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/HomePage/goHome">
        找房
      </van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" to="/HomePage/info"
        >资讯
      </van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/HomePage/my">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.HomePagefooter {
  /deep/.van-tabbar-item--active {
    color: #28BB87;
  }
}
</style>
