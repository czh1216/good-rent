<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="http://liufusong.top:8080/img/swiper/1.png" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://liufusong.top:8080/img/swiper/2.png" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://liufusong.top:8080/img/swiper/3.png" alt="">
      </van-swipe-item>
    </van-swipe>
    <van-grid clickable :column-num="4" :border="false">
      <van-grid-item text="整租">
        <template #icon>
          <div class="background">
            <van-icon name="wap-home-o" color="#0EB36F" size="40px" />
          </div>
        </template>
      </van-grid-item>
      <van-grid-item text="合租">
        <template #icon>
          <div class="background">
            <van-icon name="friends-o" color="#0EB36F" size="40px" />
          </div>
        </template>
      </van-grid-item>
      <van-grid-item text="地图找房">
        <template #icon>
          <div class="background">
            <van-icon name="location-o" color="#0EB36F" size="40px" />
          </div>
        </template>
      </van-grid-item>
      <van-grid-item text="去出租">
        <template #icon>
          <div class="background">
            <van-icon name="newspaper-o" color="#0EB36F" size="40px" />
          </div>
        </template>
      </van-grid-item>
    </van-grid>

    <div class="group">
      <div class="lgroups">
        <h4 class="group-title">租房小组</h4>
        <span class="more">更多</span>
      </div>
      <van-grid :column-num="2" direction="horizontal" :gutter="8" class="picture">
        <van-grid-item icon="photo-o" text="家住回龙观归属的感觉" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 412px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
.my-swipe .van-swipe-item img{
  width: 100%;
  height: 100%;
}
.background{
  display: flex;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: #F2FBF7;
  justify-content: center;
    align-items: center;
}
.group{
  background-color: #F6F5F6;
  padding: 18px 10px;
}
.lgroups{
  display: flex;
  justify-content: space-between;
  flex: 1;
}
.lgroups .group-title{
  margin: 15px 0 15px 10px;
  font-size: 30px;
}
.lgroups .more{
  font-size: 30px;
  margin: 10px 20px;
  color: #787d82;
}
</style>