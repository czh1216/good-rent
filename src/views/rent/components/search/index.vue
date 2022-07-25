<template>
  <div>
    <div class="search">
      <div class="left">
        <div class="transition">
          <van-icon name="search" size="16px" />
          <input
            type="text"
            placeholder="请输入小区或地址"
            v-model="value"
            @input="getCommunity"
          />
        </div>
      </div>
      <p class="right" @click="onCancel">取消</p>
    </div>

    <van-cell
      :value="`${item.communityName}`"
      :clickable="true"
      v-for="(item, index) in community"
      :key="index"
      @click="searchSetCommunity(item)"
    />
  </div>
</template>

<script>
import { getCommunity } from '@/apis/area'
import { mapMutations } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      timer: null,
      community: []
    }
  },
  methods: {
    onCancel () {
      this.$router.back()
    },
    //获取小区
    getCommunity () {
      //添加防抖
      clearTimeout(this.timer)
      //为空不执行
      if (!this.value.trim()) {
        this.community = []
        return
      }
      this.timer = setTimeout(async () => {
        const { data } = await getCommunity(this.value)
        this.community = data.body
      }, 1000)
    },
    ...mapMutations(['setCommunity']),
    //修改state中community数据
    searchSetCommunity (val) {
      this.setCommunity(val)
      //修改完之后进行跳转
      this.onCancel()
    }
  }
}
</script>

<style lang="less" scoped>
.transition:hover {
  transform: translateX(-85px);
}
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 44px;
  background-color: #f6f5f6;
  .left {
    border-radius: 5px;
    width: 314px;
    height: 30px;
    background-color: #fff;
    padding-left: 100px;
    .transition {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: 0.2s cubic-bezier(0, 0.48, 1, 0.51);
      input {
        border: none;
        flex: 1;
        height: 24px;
        color: #323233;
        font-size: 14px;
        padding-left: 3px;
      }
    }
  }
  .right {
    color: #6b7072;
    font-size: 14px;
  }
}
</style>
