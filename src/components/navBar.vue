<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      class="nav-bar"
    />
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  },
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  background-color: #21b97a;
  /deep/.van-nav-bar__title {
    color: #fff;
    font-size: 18px;
  }
  /deep/.van-icon {
    color: #fff;
    font-size: 16px;
  }
}
</style>
