<template>
  <div>
    <!-- 头部 -->
    <NavBar :title="'收藏列表'"></NavBar>
    <!-- 头部 -->
    <!-- 收藏列表部分 -->
    <div class="favorate-list">
      <!-- 列表渲染 -->
      <ListCell :List="favorateLists" />
      <!-- 列表渲染 -->
    </div>
    <!-- 收藏列表部分 -->
  </div>
</template>

<script>
import { favorateList } from '@/apis/user'
import ListCell from '@/components/ListCell.vue'
import NavBar from '@/components/navBar.vue'
export default {
  name: 'Favorate',
  data () {
    return {
      favorateLists: []
    }
  },
  components: {
    NavBar,
    ListCell
  },
  async created () {
    try {
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      const { data } = await favorateList()
      data.body.forEach((item) => {
        item.houseImg = `http://liufusong.top:8080${item.houseImg}`
      })
      this.favorateLists = data.body
      this.$toast.loading({
        message: '加载中',
        duration: 1
      })
    } catch (error) {
      this.$toast.fail('加载失败')
    }
  }
}
</script>

<style lang="less" scoped></style>
