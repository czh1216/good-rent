<template>
  <div>
    <!-- 头部 -->
    <NavBar :title="'房屋管理'"></NavBar>

    <!-- 收藏列表部分 -->
    <div class="favorate-list" v-if="rentList[0]">
      <!-- 列表渲染 -->
      <ListCell :List="rentList" />
    </div>

    <div v-else class="none">
      <van-icon name="newspaper-o" size="150px" />
      <div class="issue">
      您还没有房源,
      <a href="/#/rent/add">请去发布房源</a>吧~
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navBar.vue'
import ListCell from '@/components/ListCell.vue'
import { housesList } from '@/apis/user'
export default {
  name: 'Rent',
  data () {
    return {
      rentList: []
    }
  },
  async created () {
    try {
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      const { data } = await housesList()
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
    ListCell
  }
}
</script>

<style lang="less" scoped>
.issue{
  margin: 10px 20px 0;
  text-align: center;
  font-size: 18px;
  a {
    color: #21B97A;
  }
}
.van-icon{
  color: #21B97A;
  margin: 20px 120px 0;
}
</style>
