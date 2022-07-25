<template>
  <div>
    <navBar :title="'惊喜'"></navBar>
    <img src="@/assets/img/8137cc6a5e03dd4713d7aeca91e2952e.jpg" alt="" />
  </div>
</template>

<script>
import navBar from '@/components/navBar'
export default {
  components: {
    navBar
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
