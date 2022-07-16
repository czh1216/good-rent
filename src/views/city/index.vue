<template>
  <div>
      <div class="head">
          <span class="iconfont icon-zuojiantou arrow" @click="returna"></span>
          <div class="headline">城市列表</div>
      </div>

      <div>
        <van-index-bar>
          <van-index-anchor index="A" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />

          <van-index-anchor index="B" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />

          ...
        </van-index-bar>
      </div>
  </div>
</template>

<script>
import { city } from '@/api/city'
export default {
  created () {
    this.city()
  },
  methods: {
    returna () {
      this.$router.back()
    },
    async city () {
      console.log(await city())
    }
  }
}
</script>

<style  scoped lang="less">
.head {
  background-color: #21B97A;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  color: #fff;
  .arrow {
    flex: 1;
    font-size: 40px;
    font-weight: bold;
    margin: 36px 20px;
  }
  .headline{
    background-color: rgb(201, 63, 63);
    font-size: 45px;
  }
}
</style>