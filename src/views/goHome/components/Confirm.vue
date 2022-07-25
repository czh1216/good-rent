<template>
  <div>
    <van-dropdown-menu>
      <!-- 区域 -->
      <van-dropdown-item ref="item">
        <span slot="title">区域</span>
        <van-picker
          ref="picker"
          show-toolbar
          :columns="columns"
          @confirm="areaFn"
          @cancel="areaOut"
        />
      </van-dropdown-item>
      <!-- 区域 -->
      <!-- 方式和租金 -->
      <van-dropdown-item
        v-model="value2"
        :options="option2"
        @change="value2Change"
      >
        <span slot="title">方式</span>
      </van-dropdown-item>
      <van-dropdown-item
        v-model="value3"
        :options="option3"
        @change="value3Change"
      >
        <span slot="title">租金</span>
      </van-dropdown-item>
      <!-- 方式和租金 -->
      <!-- 筛选 -->
      <van-dropdown-item
        ref="dropdown"
        :options="option"
        @open="show = true"
        :overlay="false"
      >
        <span slot="title">筛选</span>
      </van-dropdown-item>
      <van-popup
        class="popup"
        v-model="show"
        position="right"
        :style="{ height: '100%', width: '80%' }"
        @close="closeFn"
        :lazy-render="true"
      >
        <!-- 赛选内容区域 -->
        <Btn title="户型" :data="roomType" />
        <Btn title="朝向" :data="oriented" />
        <Btn title="楼层" :data="floor" />
        <Btn title="朝向" :data="characteristic" />
      </van-popup>
      <transition name="fade">
        <div class="popup-btn" v-show="show">
          <van-button type="default" class="vanbtn vanbtn-yes" @click="empty"
            >清空
          </van-button>
          <van-button
            type="primary"
            class="vanbtn vanbtn-no"
            @click="show = false"
            >确认
          </van-button>
        </div>
      </transition>
      <!-- 筛选 -->
    </van-dropdown-menu>
  </div>
</template>

<script>
import { getCondition, getHousesAll } from '@/apis/house'
import { mapMutations, mapState } from 'vuex'

import Btn from './Btn'
export default {
  name: 'Confirm',
  data () {
    return {
      show: false,
      condition: {}, //请求回来的所有查询条件
      columns: [], //存放地铁和区域数据内容
      newData: {},
      value: 0,
      value2: 0,
      value3: 0,
      option2: [],
      option3: [],
      option: [],
      roomType: [], //户型数据
      oriented: [], //朝向
      floor: [], //楼层
      characteristic: [] //房屋两点
    }
  },
  async created () {
    //根据当前地区获取查询条件
    try {
      // 开始加载
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      // 开始加载
      // 发起请求,获取所有查询要求条件
      const { data } = await getCondition(this.currentCityL.value)
      this.roomType = data.body.roomType
      this.oriented = data.body.oriented
      this.floor = data.body.floor
      this.characteristic = data.body.characteristic
      this.condition = data.body
      // 方式的数据整理
      data.body.rentType.forEach((item, index) => {
        this.option2[index] = {}
        this.option2[index].text = item.label
        this.option2[index].value = item.value
      })
      this.value2 = this.option2[0].value
      // 方式的数据整理
      //租金的数据整理
      data.body.price.forEach((item, index) => {
        this.option3[index] = {}
        this.option3[index].text = item.label
        this.option3[index].value = item.value
      })
      this.value3 = this.option3[0].value
      //租金的数据整理
      //区域数据调整
      this.forData(data.body.area, this.newData)
      this.columns.push(this.newData)
      this.newData = {}
      this.forData(data.body.subway, this.newData)
      this.columns.push(this.newData)
      //区域数据调整
    } catch (error) {
      console.log(error)
    }
    //进入时发起请求获取房屋
    this.getList()
  },
  methods: {
    async getList () {
      this.setParameters([this.currentCityL.value, 1]) //进入页面将城市id保存
      try {
        //将查询出来的列表数据传给vuex
        const { data } = await getHousesAll(this.parameters)
        this.setSearchList(data.body.list)
        //   加载结束
        this.$toast.loading({
          message: '加载中',
          duration: 1
        })
        //   加载结束
      } catch (err) {
        console.log(err)
      }
    },
    //数据修改
    forData (val, newData) {
      for (const k in val) {
        if (k === 'children') {
          newData.children = []
          this.forData(val[k], newData.children)
        } else if (k === 'label') {
          newData.text = val[k]
        } else if (k === 'value') {
          if (val[k] === 'null') {
            newData.children = [{ text: '不限', value: 'null' }]
          }
          newData.value = val[k]
        } else {
          newData[k] = {}
          this.forData(val[k], newData[k])
        }
      }
    },
    // 关闭弹出层时触发
    async closeFn () {
      // 开始加载
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      // 开始加载
      this.$refs.dropdown.toggle() //双重遮罩,关闭第二重
      this.show = false
      this.$parent.finished = false
      //关闭遮罩进行查询
      try {
        //将查询出来的列表数据传给vuex
        const { data } = await getHousesAll(this.parameters)
        this.setSearchList(data.body.list)
        // 加载结束
        this.$toast.loading({
          message: '加载中',
          duration: 1
        })
        // 加载结束
      } catch (err) {
        console.log(err)
      }
    },
    //点击区域获取区域id并进行搜索
    async areaFn () {
      // 开始加载
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      // 开始加载
      this.setParameters([this.$refs.picker.getValues()[2].value, 2])
      this.$parent.finished = false
      this.$refs.item.toggle()
      try {
        const { data } = await await getHousesAll(this.parameters)
        this.setSearchList(data.body.list)
        // 加载结束
        this.$toast.loading({
          message: '加载中',
          duration: 1
        })
        // 加载结束
      } catch (error) {}
    },
    areaOut () {
      this.$refs.item.toggle()
    },
    //修改方式时候触发
    async value2Change (val) {
      // 开始加载
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      // 开始加载
      this.setParameters([val, 4])
      this.$parent.finished = false
      try {
        //将查询出来的列表数据传给vuex
        const { data } = await getHousesAll(this.parameters)
        this.setSearchList(data.body.list)

        // 加载结束
        this.$toast.loading({
          message: '加载中',
          duration: 1
        })
        // 加载结束
      } catch (err) {
        console.log(err)
      }
    },
    //修改租金时触发
    async value3Change (val) {
      // 开始加载
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      // 开始加载
      this.setParameters([val, 5])
      this.$parent.finished = false
      try {
        //将查询出来的列表数据传给vuex
        const { data } = await getHousesAll(this.parameters)
        this.setSearchList(data.body.list)
        // 加载结束
        this.$toast.loading({
          message: '加载中',
          duration: 1
        })
        // 加载结束
      } catch (err) {
        console.log(err)
      }
    },
    //清空btn
    empty () {
      this.setParameters(['', 4])
      this.setParameters(['', 8])
      this.setParameters(['', 10])
      this.setParameters(['', 9])
      this.$parent.finished = false
      this.$children[0].$children[4].$children.forEach((item) => {
        item.selectionIndex = -1
      })
    },
    ...mapMutations(['setParameters', 'setSearchList'])
  },
  computed: {
    ...mapState(['currentCityL', 'parameters']) //获取当前地区,和获取房屋列表的数据
  },
  components: {
    Btn
  }
}
</script>

<style lang="less" scoped>
.popup {
  padding-bottom: 45px;
}
.popup-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999999;
  width: 80%;
  height: 45px;

  transition: 0.13s;
  .vanbtn {
    height: 45px;
  }
  .vanbtn-no {
    right: 0;
    width: 65%;
  }
  .vanbtn-yes {
    left: 0;
    width: 35%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transform: translateX(100%);
}
</style>
