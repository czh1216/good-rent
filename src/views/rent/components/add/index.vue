<template>
  <div class="addIndex">
    <navBar :title="'发布房源'" />
    <van-form class="form">
      <div class="information informationtop">房源信息</div>
      <van-cell-group>
        <!-- 小区名称 -->
        <van-cell
          title="小区名称"
          is-link
          :value="community.communityName || '请输入小区名称'"
          to="/rent/search"
        />
        <!-- 小区名称 -->
        <!-- 租金 -->
        <van-field v-model.number="data.price" placeholder="请输入租金/月">
          <span slot="label">租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</span>
          <span slot="extra">￥/月</span>
        </van-field>
        <!-- 租金 -->
        <!-- 建筑面积 -->
        <van-field
          v-model.number="data.size"
          label="建筑面积"
          placeholder="请输入建筑面积"
        >
          <span slot="extra">㎡</span>
        </van-field>
        <!-- 建筑面积 -->
        <!-- 户型 -->
        <van-cell is-link :value="actionsText || '请选择'" @click="show = true">
          <span slot="title">户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</span>
        </van-cell>
        <!-- 弹出层 -->
        <van-action-sheet
          v-model="show"
          :actions="actions"
          @select="onSelect"
          cancel-text="取消"
        />
        <!-- 户型 -->
        <!-- 所在楼层 -->
        <van-cell
          title="所在楼层"
          is-link
          :value="floorText || '请选择'"
          @click="showFloor = true"
        />
        <!-- 楼层弹出层 -->
        <van-action-sheet
          v-model="showFloor"
          :actions="floor"
          @select="onSelectFloor"
          cancel-text="取消"
          :lazy-render="true"
        />
      </van-cell-group>
      <!-- 所在楼层 -->
      <!-- 朝向 -->
      <van-cell
        is-link
        :value="orientedText || '请选择'"
        :border="false"
        @click="showOriented = true"
      >
        <span slot="title">朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</span>
      </van-cell>
      <!-- 朝向弹出层 -->
      <van-action-sheet
        v-model="showOriented"
        :actions="actionsOriented"
        @select="onSelectOriented"
        cancel-text="取消"
      />
      <!-- 朝向 -->
      <div class="information">房屋标题</div>
      <!-- 用户名 -->
      <van-field
        v-model="data.title"
        placeholder="请输入标题(例如:整租小区名2室5000元)"
        :border="false"
      />
      <!-- 用户名 -->
      <div class="information">房屋图像</div>
      <!-- fileList用于绑定图片个数,固定写法 -->
      <!-- 图片上传 -->
      <van-uploader
        v-model="imgs"
        multiple
        :after-read="afterRead"
        @delete="delImg"
      />
      <!-- 图片上传 -->
      <div class="information">房屋配置</div>
      <!-- 房屋配置列表 -->
      <van-grid :column-num="5" :border="false">
        <van-grid-item
          v-for="item in furniture"
          :key="item.id"
          :class="{ active: item.isActive }"
          @click="item.isActive = !item.isActive"
        >
          <span slot="text" class="text">{{ item.furnitureList }}</span>

          <i slot="icon" class="iconfont" :class="item.iconList"></i>
        </van-grid-item>
      </van-grid>
      <!-- 房屋配置列表 -->
      <!-- 房屋描述 -->
      <div class="bgmask">
        <div class="information">房屋描述</div>
        <van-field
          rows="4"
          autosize
          type="textarea"
          placeholder="请输入房屋描述信息"
          show-word-limit
          v-model="data.description"
        />
      </div>
      <!-- 房屋描述 -->
      <div class="gobtn">
        <van-button plain type="primary" class="gobtn-btn" @click="noAdd"
          >取消</van-button
        >
        <van-button type="primary" class="gobtn-btn" @click="addRent"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import { addHouses } from '@/apis/user'
import { mapMutations, mapState } from 'vuex'
import { getHouses } from '@/apis/house'
import { plugin } from '@/apis/plugin'
export default {
  name: 'Add',
  data () {
    return {
      // 发布房源的内容
      data: {
        title: '', //房屋标题
        description: '', //房屋描述
        houseImg: '', //图片
        oriented: '', //朝向
        supporting: [], //配置
        price: '', //租金
        roomType: '', //户型
        size: '', //面积
        floor: '', //楼层
        community: '' // 小区名称
      },
      // 房屋配置数据列表
      furniture: [
        {
          iconList: 'icon-shimuyigui',
          furnitureList: '衣柜',
          id: 1,
          isActive: false
        },
        {
          iconList: 'icon-xiyiji',
          furnitureList: '洗衣机',
          id: 2,
          isActive: false
        },
        {
          iconList: 'icon-kongtiao',
          furnitureList: '空调',
          id: 3,
          isActive: false
        },
        {
          iconList: 'icon-meiqitianranqi',
          furnitureList: '天然气',
          id: 4,
          isActive: false
        },
        {
          iconList: 'icon-bingxiang',
          furnitureList: '冰箱',
          id: 5,
          isActive: false
        },
        {
          iconList: 'icon-nuanqi',
          furnitureList: '暖气',
          id: 6,
          isActive: false
        },
        {
          iconList: 'icon-dianshiji',
          furnitureList: '电视',
          id: 7,
          isActive: false
        },
        {
          iconList: 'icon-linyu',
          furnitureList: '热水器',
          id: 8,
          isActive: false
        },
        {
          iconList: 'icon-wifi',
          furnitureList: '宽带',
          id: 9,
          isActive: false
        },
        {
          iconList: 'icon-shafa',
          furnitureList: '沙发',
          id: 10,
          isActive: false
        }
      ],
      // 户型弹出层
      show: false,
      actions: [],
      // 楼层弹出层
      showFloor: false,
      floor: [],
      // 朝向
      showOriented: false,
      actionsOriented: [],
      floorText: '', //楼层文本内容
      orientedText: '', //朝向文本内容
      actionsText: '', //户型文本内容
      imgs: [],
      image: [] //临时存储图片数组,用于转化为|分割的上传所需内容
    }
  },
  components: {
    navBar
  },
  methods: {
    //发布房源
    async addRent () {
      try {
        if (
          this.data.houseImg &&
          this.community &&
          this.data.size &&
          this.data.price
        ) {
          //将家具进行修改
          if (this.data.supporting.length >= 2) {
            this.data.supporting = this.data.supporting.join('|')
          }
          await addHouses(this.data)
          //发布完成,将所有数据清空
          this.setCommunity('')
          this.$dialog
            .confirm({
              title: '提示',
              message: '发布房源成功',
              confirmButtonText: '继续发布',
              confirmButtonColor: '#108ee9',
              cancelButtonText: '去查看'
            })
            .then(() => {
              history.go(0)
            })
            .catch(() => {
              this.$router.push('/HomePage/goHome')
            })
        } else {
          this.$toast.fail('请补全数据')
        }
      } catch (err) {
        this.$toast.fail('发布失败,请重试')
      }
    },
    // 退出添加
    noAdd () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '放弃发布房源？',
          confirmButtonText: '放弃',
          cancelButtonText: '继续编辑',
          cancelButtonColor: '#108ee9'
        })
        .then(() => {
          this.$router.back()
        })
    },
    // 弹出层
    onSelect (val) {
      this.data.roomType = val.value
      this.actionsText = val.name
      this.show = false
    },
    // 楼层弹出层
    onSelectFloor (val) {
      this.data.floor = val.value
      this.floorText = val.name
      this.showFloor = false
    },
    // 朝向弹出层
    onSelectOriented (val) {
      this.data.oriented = val.value
      this.orientedText = val.name
      this.showOriented = false
    },
    //遍历
    foreachData (val, dataName) {
      val.forEach((item, index) => {
        ;(dataName[index] = {}),
        (dataName[index].name = item.label),
        (dataName[index].value = item.value)
      })
    },
    //上传图片执行
    async afterRead (file) {
      const fromData = new FormData()
      fromData.append('file', file.file)
      try {
        const image = (await plugin(fromData)).data.body
        console.log(image)
        this.image.push(...image)
        this.data.houseImg = this.image.join('|')
      } catch (error) {
        console.log(error)
      }
    },
    //删除图片执行
    delImg (file, index) {
      this.image.splice(index.index, 1)
      if (this.image.length !== 0) {
        this.data.houseImg = this.image.join('|')
      } else if (this.image.length === 0) {
        this.data.houseImg = ''
      }
    },
    ...mapMutations(['setCommunity'])
  },
  watch: {
    furniture: {
      deep: true,
      handler () {
        // supporting
        this.data.supporting = []
        this.furniture.forEach((item) => {
          if (item.isActive) {
            this.data.supporting.push(item.furnitureList)
          }
        })
      }
    }
  },
  computed: {
    ...mapState(['community'])
  },
  async created () {
    try {
      const { data } = await getHouses()
      // 楼层遍历
      this.foreachData(data.body.floor, this.floor)
      //遍历朝向
      this.foreachData(data.body.oriented, this.actionsOriented)
      //遍历户型
      this.foreachData(data.body.roomType, this.actions)
    } catch (error) {
      this.$toast.fail('加载失败')
    }
  }
}
</script>

<style lang="less" scoped>
.addIndex {
  padding-bottom: 40px;
}
.informationtop {
  color: #21b97a;
}
.information {
  height: 44px;
  font-size: 15px;
  line-height: 44px;
  border-bottom: 1px solid #f5f6f7;
  padding-left: 12px;
  background-color: #fff;
}
.form {
  color: #888;
  .iconfont {
    font-size: 28px;
  }
  .active {
    color: #21b97a !important;
  }
  .text {
    font-size: 14px;
  }
}
.van-uploader {
  margin: 10px;
}
.bgmask {
  padding-top: 20px;
  height: 210px;
  background-color: #f5f5f9;
}
.gobtn {
  position: fixed;
  bottom: -1px;
  width: 375px;
  height: 45px;
  .gobtn-btn {
    width: 50%;
    border: none;
  }
}
</style>
