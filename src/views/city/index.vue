git
<template>
  <div class="cityIndex">
    <div class="navbar">
      <TheCityList :title="'城市列表'" />
    </div>

    <van-index-bar highlight-color="#fff" :sticky="false">
      <van-index-anchor>当前城市</van-index-anchor>
      <van-cell :clickable="true" />

      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell />
      <!-- 字母排序城市 -->
      <div>
        <van-index-anchor />
        <van-cell />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import TheCityList from '@/components/navBar.vue'
import { city, hotCity } from '@/api/city'
export default {
  data () {
    return {
      thecitylist: []
    }
  },
  created () {
    this.city()
  },
  methods: {
    returna () {
      this.$router.back()
    },
    async city () {
      console.log(await city())
      console.log(await hotCity())
      // 传进数组
    }
    // 传进数组
    // dataTreating (data) {
    //   for (let i = 0; i < 25; i++) {
    //     const zi = String.fromCharCode(65 + i) // 保存数据
    //     this.thecitylist[zi] = data.filter((itam) => {
    //       return itam.pinyin[0] === zi.toLowerCase()
    //     })
    //   }
    //   console.log(this.thecitylist)
    // }
  },
  components: {
    TheCityList
  }
}
</script>

<style scoped lang="less">
.cityIndex {
  padding-top: 45px;
}
.navbar {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 45px;
}
/deep/.van-index-bar__index--active {
  background-color: skyblue;
  border-radius: 50%;
}
/deep/.van-index-bar__index {
  font-size: 14px !important;
  padding: 6px !important;
  margin-right: 5px;
}
/deep/.van-index-anchor {
  color: #b5b5b5;
  font-size: 15px;
}
</style>
