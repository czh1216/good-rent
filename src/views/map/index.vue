<template>
  <div class="my-map">
    <navBar title="地图找房" />
    <baidu-map
      class="map"
      :center="number === 1 ? currentCityL.label : center"
      :zoom="zoom"
      @ready="handler"
    >
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <!-- 缩放控件 -->
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>

      <!-- 自定义遮盖物 -->
      <bm-overlay :center="center">
        <!-- 开始渲染成圆形 -->
        <div v-if="number < 3">
          <bm-label
            :content="`<p style='margin-top: 16px;'>${item.label}</p><p>${item.count}套</p>`"
            :position="{ lng: item.coord.longitude, lat: item.coord.latitude }"
            :labelStyle="style"
            v-for="item in label"
            :key="item.value"
            @click="nextLabel(item)"
          >
          </bm-label>
        </div>
        <!-- 点击两次之后渲染成横条 -->
        <div v-else>
          <div v-for="item in label" :key="item.value">
            <bm-label
              :content="`<span>${item.label} ${item.count}套</span>`"
              :position="{
                lng: item.coord.longitude,
                lat: item.coord.latitude
              }"
              :labelStyle="style1"
              @click="nextLabelEnd(item)"
            >
            </bm-label>
            <bm-label
              :content="''"
              :position="{
                lng: item.coord.longitude,
                lat: item.coord.latitude
              }"
              :labelStyle="style2"
            ></bm-label>
          </div>
        </div>
      </bm-overlay>
      <!-- 自定义遮盖物 -->
    </baidu-map>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <div class="top">
        <h3>房屋列表</h3>
        <span @click="goHome">更多房源</span>
      </div>
      <div class="favorate-list">
        <!-- 列表渲染 -->
        <ListCell :List="endLsit" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import ListCell from '@/components/ListCell.vue'
import navBar from '@/components/navBar.vue'
import { getMapCoordinate } from '@/apis/area'
// import { getMapEnd } from '@/apis/house' //最后一级获取所有房源
import { mapState } from 'vuex'
export default {
  name: 'Map',
  data () {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 11,
      active: false,
      style: {
        color: '#fff',
        fontSize: '24px',
        height: '70px',
        textAlign: 'center',
        width: '70px',
        fontSize: '12px',
        borderRadius: '50%',
        border: '1px solid #fff',
        backgroundColor: '#24ba72'
      },
      style1: {
        color: '#fff',
        fontSize: '24px',
        height: '20px',
        textAlign: 'center',
        fontSize: '12px',
        backgroundColor: '#24ba72',
        border: 'none',
        borderRadius: '3px',
        padding: '4px'
      },
      style2: {
        width: '0',
        height: '0',
        border: '5px solid',
        borderColor: '#24ba72 transparent transparent #24ba72',
        marginTop: '20px',
        marginLeft: '20px',
        backgroundColor: 'transparent'
      },
      label: [],
      number: 1,
      show: false,
      endLsit: []
    }
  },
  created () {
    //获取城市地图坐标
    this.getMapCoordinate()
  },
  methods: {
    handler ({ BMap, map }) {
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 11
    },
    //获取城市地图坐标
    async getMapCoordinate () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      try {
        const { data } = await getMapCoordinate(this.currentCityL.value)
        this.label = data.body
        this.$toast.loading({
          duration: 1, // 持续展示 toast
          forbidClick: true,
          message: '加载中'
        })
      } catch (error) {
        this.$toast.fail({
          message: '加载失败,请稍后重试'
        })
      }
    },
    //点击获取下一级城市
    async nextLabel (label) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      try {
        const { data } = await getMapCoordinate(label.value)
        this.label = data.body
        this.number += 1
        this.center.lng = this.label[0].coord.longitude
        this.center.lat = this.label[0].coord.latitude
        this.zoom += 2
        this.$toast.loading({
          duration: 1, // 持续展示 toast
          forbidClick: true,
          message: '加载中'
        })
      } catch (error) {
        this.$toast.fail({
          message: '加载失败,请稍后重试'
        })
      }
    },
    //点击最后一级时触发
    async nextLabelEnd (label) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      try {
        const { data } = await label.value
        this.endLsit = data.body.list
        this.show = true
        this.$toast.loading({
          duration: 1, // 持续展示 toast
          forbidClick: true,
          message: '加载中'
        })
      } catch (error) {
        this.$toast.fail({
          message: '加载失败,请稍后重试'
        })
      }
    },
    //点击更多跳转找房页面
    goHome () {
      this.$router.push({
        path: '/HomePage/goHome'
      })
    }
  },
  components: {
    navBar,
    ListCell
  },
  computed: {
    //当前城市
    ...mapState(['currentCityL'])
  }
}
</script>

<style lang="less" scoped>
// 标签
.BMapLabel {
  p {
    margin-top: 90px !important;
  }
}
.favorate-list {
  padding: 0 15px;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  height: 65px;
  background-color: #c0c0c2;
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-left: 15px;
  }
  span {
    margin-right: 15px;
    font-size: 13px;
    margin-bottom: 20px;
  }
}

.my-map {
  height: 621px;
}
.map {
  width: 100%;
  height: 100%;
}
</style>
