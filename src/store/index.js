import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: JSON.parse(localStorage.getItem('hometoken')) || null,
    searchList: [],
    //当前地区
    currentCityL: JSON.parse(localStorage.getItem('currentCityL')) || {
      label: '北京',
      pinyin: 'beijing',
      short: 'bj',
      value: 'AREA|88cff55c-aaa4-e2e0'
    },
    //search搜索点击结果
    community: '',
    //根据条件查询房屋的条件存储
    parameters: {
      id: '', //地区id
      area: '', //地区
      subway: '', //地铁
      rentType: true, //整租
      price: null, //价格
      more: '', //复合查询,
      roomType: '', //房屋类型
      oriented: '', //朝向
      characteristic: '', //标签
      floor: '', //楼层
      start: 1, //开始项目
      end: 20 //结束项目
    }
  },
  getters: {},
  mutations: {
    //修改开始项目和结束项目
    setStartEnd (state) {
      state.parameters.end += 20
      state.parameters.start += 20
      console.log(state.parameters)
    },
    setParameters (state, val) {
      if (val[1] === 1) {
        state.parameters.id = val[0]
      } else if (val[1] === 2) {
        state.parameters.area = val[0]
      } else if (val[1] === 3) {
        state.parameters.subway = val[0]
      } else if (val[1] === 4) {
        state.parameters.rentType = val[0]
      } else if (val[1] === 5) {
        state.parameters.price = val[0]
      } else if (val[1] === 6) {
        state.parameters.more = val[0]
      } else if (val[1] === 7) {
        state.parameters.roomType = val[0]
      } else if (val[1] === 8) {
        state.parameters.oriented = val[0]
      } else if (val[1] === 9) {
        state.parameters.characteristic = val[0]
      } else if (val[1] === 10) {
        state.parameters.floor = val[0]
      }
      state.parameters.end = 20
      state.parameters.start = 1
      console.log(state.parameters)
    },
    //修改搜索出来的数据列表
    setSearchList (state, val) {
      state.searchList = val
      state.searchList.forEach((item, index) => {
        state.searchList[
          index
        ].houseImg = `http://liufusong.top:8080${item.houseImg}`
      })
    },
    //添加token
    addToken (state, val) {
      state.token = val
      localStorage.setItem('hometoken', JSON.stringify(val) || null)
    },
    //添加当前城市
    addCurrentCityL (state, val) {
      state.currentCityL = val
      localStorage.setItem('currentCityL', JSON.stringify(val) || null)
    },
    //修改community,用于发布房源小区地址数据
    setCommunity (state, val) {
      state.community = val
    }
    //修改parameters
  },
  actions: {},
  modules: {}
})
