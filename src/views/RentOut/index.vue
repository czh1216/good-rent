<template>
  <div>
    <NavBar :title="'房屋管理'"></NavBar>
    <!-- 收藏列表部分 -->
    <div class="favorate-list">
      <TheCityList :List="rentList" />
    </div>

  </div>
</template>

<script>
import NavBar from '@/components/navBar.vue'
import TheCityList from '@/components/TheCityList.vue'
import { houses } from '@/api/uaer'
export default {
  data () {
    return {
      rentList: []
    }
  },
  async created () {
    // const { data } = await houses()
    // console.log(data)
    try {
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      const { data } = await houses()
      data.body.forEach((item) => {
        item.houseImg = `http://liufusong.top:8080${item.houseImg}`
      })
      this.rentList = data.body
      this.$toast.loading({
        message: '加载中',
        duration: 1
      })
    } catch (error) {
      this.$toast.fail('加载失败')
    }
  },
  components: {
    NavBar,
    TheCityList
  }
}
</script>

<style>

</style>