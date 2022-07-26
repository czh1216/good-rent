<template>
  <div class="detail">
    <!-- navbar区域 -->
    <navBar :title="data.community" />
    <!-- navbar区域 -->
    <!-- 轮播图区域 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      :height="250"
    >
      <van-swipe-item v-for="(item, index) in data.houseImg" :key="index">
        <img :src="`http://liufusong.top:8080${item}`" />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图区域 -->
    <!-- 描述部分 -->
    <div class="describe">
      <div class="item title">
        <div>{{ data.description }}</div>
        <span v-for="obj in data.tags" :key="obj">{{ obj }}</span>
      </div>
      <div class="item conter">
        <div class="HouseDetail">
          <h2>{{ data.price }} <span>/月</span></h2>
          <p>租金</p>
        </div>
        <div class="HouseDetail">
          <h2>{{ data.roomType }}</h2>
          <p>房型</p>
        </div>
        <div class="HouseDetail">
          <h2>{{ data.size }}平米</h2>
          <p>面积</p>
        </div>
      </div>
      <div class="item info">
        <div>装修:<span>精装</span></div>
        <div>
          朝向:<span v-for="obj in data.oriented" :key="obj">{{ obj }}</span>
        </div>
        <div>
          楼层:<span>{{ data.floor }}</span>
        </div>
        <div>类型:<span>普通住宅</span></div>
      </div>
    </div>
    <!-- 描述部分 -->
    <!-- 地图区域 -->
    <div class="map-top">小区:{{ data.community }}</div>
    <div class="map-bottom">
      <baidu-map class="map" :center="center" :zoom="15">
        <bm-label
          :content="data.community"
          :position="conterChildren"
          :labelStyle="style"
          v-if="conterChildren"
        >
        </bm-label>
        <bm-label
          :content="''"
          :position="conterChildren"
          :labelStyle="style1"
          v-if="conterChildren"
        >
        </bm-label>
      </baidu-map>
    </div>
    <!-- 地图区域 -->
    <!-- 房屋配套 -->
    <div class="about">
      <div class="one">房屋配置</div>
      <div class="flag" v-if="!newList[0]">暂无数据~</div>
      <van-grid :column-num="5" :border="false" v-else>
        <van-grid-item
          :square="true"
          icon="photo-o"
          :text="item.furnitureList"
          v-for="item in newList"
          :key="item.id"
        >
          <i slot="icon" class="iconfont" :class="item.iconList"></i>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 房屋配套 -->
    <div class="bg"></div>
    <div class="about">
      <div class="one">房源概述</div>
    </div>
    <div class="summary">
      <div class="top">
        <div><img src="@/assets/img/avatar (1).png" /></div>
        <div class="people">
          <p>王女士</p>
          <span>
            <van-icon name="passed" />
            已认证房东
          </span>
        </div>
        <div class="summary-btn">发消息</div>
      </div>
      <div class="bottom">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </div>
    </div>
    <div class="bg"></div>
    <!-- 猜你喜欢 -->
    <div class="like about">
      <div class="one">猜你喜欢</div>
      <div class="favorate-list">
        <ListCell :List="list" />
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <!-- 底部资讯部分-->
    <footer>
      <div class="one" @click="isLike">
        <i
          class="iconfont"
          :class="{
            'icon-xingxing1': isFavorite,
            'icon-xingxing2': !isFavorite
          }"
        ></i>
        收藏
      </div>
      <div>在线咨询</div>
      <div class="phone">电话预约</div>
    </footer>
    <!-- 底部咨询部份 -->
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import { getMap } from '@/apis/house'
import { getFavorites, addFavorites, removeFavorites } from '@/apis/user'
import ListCell from '@/components/ListCell.vue'
export default {
  data () {
    return {
      center: { lng: 116.404, lat: 39.915 },
      conterChildren: '',
      zoom: 11,
      data: {},
      //房屋配置
      furniture: [
        {
          iconList: 'icon-shimuyigui',
          furnitureList: '衣柜',
          id: 1
        },
        {
          iconList: 'icon-xiyiji',
          furnitureList: '洗衣机',
          id: 2
        },
        {
          iconList: 'icon-kongtiao',
          furnitureList: '空调',
          id: 3
        },
        {
          iconList: 'icon-meiqitianranqi',
          furnitureList: '天然气',
          id: 4
        },
        {
          iconList: 'icon-bingxiang',
          furnitureList: '冰箱',
          id: 5
        },
        {
          iconList: 'icon-nuanqi',
          furnitureList: '暖气',
          id: 6
        },
        {
          iconList: 'icon-dianshiji',
          furnitureList: '电视',
          id: 7
        },
        {
          iconList: 'icon-linyu',
          furnitureList: '热水器',
          id: 8
        },
        {
          iconList: 'icon-wifi',
          furnitureList: '宽带',
          id: 9
        },
        {
          iconList: 'icon-shafa',
          furnitureList: '沙发',
          id: 10
        }
      ],
      isFavorite: false,
      list: [
        {
          houseImg: 'http://liufusong.top:8080/img/message/1.png',
          title: '安贞西里3室1厅',
          tags: ['随时看房'],
          price: 4500,
          desc: '72.32m/南北/低楼层',
          houseCode: 'f12e5910-dcb3-1460'
        },
        {
          houseImg: 'http://liufusong.top:8080/img/message/2.png',
          title: '天居园2室1厅',
          tags: ['近地铁'],
          price: 7200,
          desc: '83m/南/高楼层',
          houseCode: '215316c2-1303-5b2e'
        },
        {
          houseImg: 'http://liufusong.top:8080/img/message/3.png',
          title: '角门甲4号院1室1月',
          tags: ['集中供暖'],
          price: 4300,
          desc: '52mf/西南/低楼层',
          houseCode: '48691d67-9512-f54c'
        }
      ],
      style: {
        display: 'inline',
        backgroundColor: '#ee5d5b',
        padding: '5px 10px',
        color: '#fff'
      },
      style1: {
        width: '0px',
        height: '0px',
        border: '5px solid',
        borderColor: '#ee5d5b transparent transparent #ee5d5b ',
        marginTop: '28px',
        marginLeft: '20px',
        backgroundColor: 'transparent'
      }
    }
  },
  created () {
    //获取数据
    this.getMap(this.$route.query.id)
    //获取是否收藏
    this.getFavorites(this.$route.query.id)
  },
  methods: {
    //获取数据
    async getMap (id) {
      // const data = await getMap(id)
      // console.log(data)
      try {
        const data = await getMap(id)
        this.data = data.data.body //获取返回来的数据
        console.log(this.data)
        //如果该房源有位置则修改位置,没有取默认值
        if (this.data.coord.latitude) {
          this.center.lng = this.data.coord.longitude
          this.center.lat = this.data.coord.latitude
          //修改标签位置
          const obj = {
            lng: this.data.coord.longitude,
            lat: this.data.coord.latitude
          }
          this.conterChildren = obj
        } else {
          console.log(this.data)
        }
      } catch (err) {
        console.log(err)
      }
    },
    //获取用户收藏状态
    async getFavorites (id) {
      try {
        const { data } = await getFavorites(id)
        this.isFavorite = data.body.isFavorite
      } catch (error) {}
    },
    //修改客户收藏状态()
    async isLike () {
      console.log(1)
      if (this.isFavorite) {
        this.$toast.loading({
          message: '加载中',
          duration: 0
        })
        await removeFavorites(this.$route.query.id)
        this.$toast.success({
          message: '已取消收藏',
          duration: 1
        })
      } else {
        this.$toast.loading({
          message: '加载中',
          duration: 0
        })
        await addFavorites(this.$route.query.id)
        this.$toast.success({
          message: '收藏成功',
          duration: 1
        })
      }
      this.isFavorite = !this.isFavorite
    }
  },
  components: {
    navBar,
    ListCell
  },
  computed: {
    //判断房屋配置，并返回
    newList () {
      const a = []
      if (this.data.supporting) {
        const data = this.data.supporting.join('')
        this.furniture.forEach((item) => {
          if (data.includes(item.furnitureList)) {
            a.push(item)
          }
        })
      }
      return a
    }
  }
}
</script>

<style lang="less" scoped>
.map-bottom[data-v-3316eea4] {
  margin-top: 0;
}
.map {
  width: 100%;
  height: 100%;
}
.map-top {
  height: 44px;
  background-color: #fff;
  line-height: 44px;
  font-size: 14px;
  padding-left: 15px;
  margin-top: 10px;
}
.about[data-v-3316eea4] {
  padding: 0;
}
.summary {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 8px 0;
    height: 80px;
    background-color: #fff;
    img {
      width: 52px;
      height: 52px;
      border-radius: 50%;
    }
    .people {
      flex: 1;
      margin-left: 5px;
      p {
        color: #333;
        font-size: 14px;
      }
      span {
        font-size: 13px;
        color: #fa5741;
      }
    }
    .summary-btn {
      width: 75px;
      height: 30px;
      color: #33be85;
      border: #33be85 1px solid;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
    }
  }
  .bottom {
    padding: 8px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
  }
}
footer {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  font-size: 17px;
  height: 45px;
  width: 100%;
  background-color: #fff;
  color: #999999;
  border-top: 1px solid #e8e8e9;
  div {
    height: 100%;
    line-height: 45px;
    text-align: center;
    flex: 1;
  }
  .one {
    border-right: 1px solid #e8e8e9;
    .icon-xingxing1 {
      color: red;
    }
  }
  .phone {
    background-color: #21b97a;
    color: #fff;
  }
}
.flag {
  font-size: 12px;
}
.detail {
  background-color: #f6f5f6;
  min-height: 100vh;
  padding-bottom: 45px;
}
// vant组件库轮播图样式
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
}
// 描述部分
.describe {
  height: 265px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  background-color: #fff;
  .item {
    flex: 1;
  }
  .title {
    div {
      font-weight: 400;
      font-size: 16px;
      color: #333;
      margin: 25px 0 8px;
    }
    span {
      color: #39becd;
      background: #e1f5f8;
      font-size: 12px;
      padding: 3px;
      border-radius: 3px;
      margin-right: 5px;
    }
  }
  .conter {
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    display: flex;
    text-align: center;
    line-height: 1;
    .HouseDetail {
      flex: 1;
      h2 {
        color: #fa5741;
        font-size: 18px;
        margin-top: 20px;
        margin-bottom: 10px;
        span {
          font-size: 12px;
          font-weight: 400;
        }
      }
      p {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  .info {
    margin-top: 15px;
    div {
      display: inline-block;
      width: 50%;
      font-size: 14px;
      color: #999999;
      span {
        color: #333333;
        margin-left: 10px;
      }
    }
  }
}
// 地图区域
.map-bottom {
  width: 100%;
  height: 145px;
  line-height: 190px;
  text-align: center;
  background-color: #fff;
  margin-top: 10px;
}

//房屋配套
.about {
  padding: 0 10px;
  background-color: #fff;
  .one {
    font-size: 15px;
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #cecece;
  }
}
.van-grid-item {
  margin-top: 20px;
  .iconfont {
    font-size: 25px;
  }
  /deep/.van-grid-item__text {
    font-size: 14px;
  }
}
//占位
.bg {
  height: 10px;
}
</style>
