<template>
  <div>
    <div class="navbar">
      <navBar :title="'城市列表'" />
    </div>
    <div class="nav-content">
      <van-index-bar :index-list="indexList">
        <van-index-anchor index="#">当前城市</van-index-anchor>
        <van-cell :title="$store.state.currentCityL.label" :clickable="true" />

        <van-index-anchor index="热">热门城市</van-index-anchor>
        <van-cell
        :clickable="true"
        v-for="hot in hotCitys"
        :key="hot.label"
        :title="hot.label"
        @click="setCurrentCityL(hot)"
        />

        <div v-for="letter in letters" :key="letter">
          <van-index-anchor :index="letter">{{ letter }}</van-index-anchor>
          <van-cell
            v-for="(city, index) in filterCitys(letter)"
            :title="city.label"
            :key="index"
            :clickable="true"
            @click="setCurrentCityL(city)"
          />
        </div>
      </van-index-bar>
      <div style="width: 100%; height: 180px"></div>
    </div>
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
      citys: [],
      hotCitys: [],
      indexList: [
        '#',
        '热',
        'A',
        'B',
        'C',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ],
      letters: [
        'A',
        'B',
        'C',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ]
    }
  },
  components: {
    navBar
  },
  created () {
    this.getCity()
    this.hotCity()
  },
  methods: {
    async getCity () {
      try {
        this.citys = (await getCity()).data.body
      } catch (err) {
        // console.log(err)
      }
      console.log(this.citys)
    },
    async hotCity () {
      this.hotCitys = (await hotCity()).data.body
    },
    //修改当前城市
    setCurrentCityL (item) {
      this.addCurrentCityL(item)
      this.$store.commit('setCommunity', {})
      this.$router.back()
    },
    ...mapMutations(['addCurrentCityL'])
  },
  computed: {
    filterCitys () {
      return (letter) => {
        return this.citys.filter(
          (item) => item.short.substr(0, 1).toUpperCase() === letter
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 45px;
}
.nav-content {
  padding-top: 55px;
  width: 100%;
  height: 95vh;
  overflow-y: scroll;

  /deep/.van-nav-bar {
    background-color: #21b97a;

    .van-nav-bar__title {
      color: #fff;
      font-size: 18px;
    }

    .van-icon {
      color: #fff;
    }
  }

  .van-index-bar {
    /deep/.van-index-bar__sidebar {
      height: calc(100% - 110px);
      justify-content: space-between;
      .van-index-bar__index {
        font-size: 14px;
      }
    }

    /deep/.van-index-anchor {
      color: #a2a2a2;
    }
  }
  /deep/.van-index-bar__index {
    display: inline-block;
    height: 20px;
    width: 20px;
    padding: 0;
    margin-right: 10px;
    text-align: center;
    line-height: 20px;
  }
  /deep/.van-index-bar__index--active {
    color: #fff;
    font-weight: 700;
    background-color: #21b97a;
    border-radius: 10px;
  }
  /deep/.van-index-anchor--sticky {
    position: static;
  }
}
</style>
