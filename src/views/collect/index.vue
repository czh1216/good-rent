<template>
  <div>
    <!-- 头部 -->
    <NavBar :title="'收藏列表'"></NavBar>
    <!-- 收藏列表 -->
    <div class="favorate-list">
      <!-- 列表渲染 -->
      <TheCityList :List="favorateLists"></TheCityList>
    </div>
  </div>
</template>

<script>
import TheCityList from '@/components/TheCityList.vue'
import NavBar from '@/components/navBar.vue'
import { favorateList } from '@/api/uaer'
export default {
  data () {
    return {
      favorateLists: []
    }
  },
  components: {
    TheCityList,
    NavBar
  },
  async created () {
    try {
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      const { data } = await favorateList()
      // console.log(data)
      data.body.forEach((item) => {
        item.houseImg = `http://liufusong.top:8080${item.houseImg}`
      })
      this.favorateLists = data.body
      this.$toast.loading({
        message: '加载中',
        duration: 1
      })
    } catch (e) {
      this.$toast.fail('加载失败')
    }
  }
}
</script>

<style lang="less" scoped></style>
