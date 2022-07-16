<template>
  <div>
    <!-- 搜索框 -->
      <div class="head">
        <span class="iconfont icon-zuojiantou arrow"></span>
           <!--头部 -->
        <div class="nav-title">
          <!-- 搜索 -->
          <van-search placeholder="请输入搜索关键词" background="0">
            <template slot="label">
              <div>
                <span>上海</span>
                <van-icon name="play" color="#7F7F80" />
              </div>
            </template>
          </van-search>
          <!-- 地图 -->
          <div class="ditu-nav">
            <i class="iconfont icon-ditu1"></i>
          </div>
        </div>
      </div>

      <!-- 导航栏 -->
      <div>
        <van-tabs>
          <van-tab title="标签 1">
            <template></template>
          </van-tab>
          <van-tab title="标签 2">内容 2</van-tab>
          <van-tab title="标签 3">内容 3</van-tab>
          <van-tab title="标签 4">内容 4</van-tab>
        </van-tabs>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
// 搜索框
.head {
  background-color: #21B97A;
  position: relative;
  width: 100%;
  height: 120px;
  .arrow {
    position: absolute;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    margin: 36px 10px;
  }
  // 搜索
  .nav-title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 5px;
    right: 35px;
    z-index: 999;
    .van-search__label {
      font-size: 30px;
      margin-right: 10px;
      border-right: 1px solid #e5e5e5;
    }
    .ditu-nav {
      width: .625rem;
      height: .625rem;
      border: 5px solid rgb(255, 255, 255);
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      margin-left: 6px;
      .iconfont {
        line-height: 50px;
        font-size: 37px;
        color: rgb(255, 254, 254);
      }
    }
    .van-icon{
      transform: rotate(90deg);
    }
  }
}
</style>