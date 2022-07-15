<template>
  <div>
      <router-view></router-view>
    <van-tabbar route>
  <van-tabbar-item to="/homepage" name="wap-home-o" icon="wap-home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/house" name="search" icon="search">找房</van-tabbar-item>
  <van-tabbar-item to="/information" name="friends" icon="comment-o">资讯</van-tabbar-item>
  <van-tabbar-item to="/mine" name="setting" icon="manager-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">

</style>