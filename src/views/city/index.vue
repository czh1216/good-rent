<template>
  <div class="cityIndex">
    <div class="navbar">
      <navBar :title="'城市列表'" />
    </div>
    <van-index-bar
      :index-list="indexList"
      highlight-color="#fff"
      :sticky="false"
    >
      <van-index-anchor>当前城市</van-index-anchor>
      <van-cell :title="$store.state.currentCityL.label" :clickable="true" />

      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        :title="item.label"
        v-for="item in hotCity"
        :key="item.label"
        :clickable="true"
        @click="setCurrentCityL(item)"
      />
      <!-- 字母排序城市 -->
      <div v-for="(item, index) in cityList" :key="index">
        <van-index-anchor :index="item[0]" />
        <van-cell
          :title="obj.label"
          v-for="obj in item[1]"
          :key="obj.value"
          :clickable="true"
          @click="setCurrentCityL(obj)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import { getCity, hotCity } from '@/apis/area'
import { mapMutations } from 'vuex'
export default {
  name: 'City',
  data () {
    return {
      cityList: [],
      hotCity: [],
      indexList: ['热']
    }
  },
  components: {
    navBar
  },
  async created () {
    // 获取热门城市
    try {
      // 进入开启加载提示
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      const res = await hotCity()
      //城市列表分类
      const { data } = await getCity()
      const obj = {}
      // 获取所有数据,并且通过首字母进行分类
      data.body.forEach((item) => {
        const letter = item.short.charAt(0).toUpperCase()
        if (!obj[letter]) {
          obj[letter] = []
          obj[letter][0] = item.short.charAt(0).toUpperCase()
          obj[letter][1] = []
        }
        obj[letter][1].push(item)
      })
      //将key值进行排序并且把数据全部转化为数组方便渲染页面
      const newkey = Object.keys(obj).sort()
      newkey.forEach((item) => {
        this.cityList.push(obj[item])
        this.indexList.push(item)
        this.hotCity = res.data.body
      })
      // 加载完毕 关闭加载提示
      this.$toast.loading({
        message: '加载中',
        duration: 1
      })
    } catch (error) {
      this.$toast.fail('数据加载失败')
    }
  },
  methods: {
    //修改当前城市
    setCurrentCityL (item) {
      this.addCurrentCityL(item)
      this.$store.commit('setCommunity', {})
      this.$router.back()
    },
    ...mapMutations(['addCurrentCityL'])
  }
}
</script>

<style lang="less" scoped>
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
