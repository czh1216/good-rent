<template>
  <div>
      <div class="tp">
          <img src="http://liufusong.top:8080/img/profile/bg.png" alt="">
          <div class="ykdl">
              <div class="tourist">
                  <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="">
              </div>
              <div class="register">
                  <p>游客</p>
                  <van-button class="button" type="info" to="/login">去登录</van-button>
              </div>
          </div>
      </div>
      <van-grid class="qqq" clickable :column-num="3" :border="false">
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="wap-home-o" text="我的出租" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="idcard" text="成为房主" />
        <van-grid-item icon="manager-o" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
      <div class="advertising">
          <img src="http://liufusong.top:8080/img/profile/join.png" alt="">
      </div>
  </div>
</template>
<script>
export default {
}
</script>

<style scoped>
.tp{
    position: relative;
    width: 100%;
    height: 600px;
    background-color: #FFFFFF;
}
.tp img {
        width: 100%;
        height: 376px;
    }
.ykdl{
    position: absolute;
    bottom:0;
    left: 56px;
    background-color: rgb(255, 255, 255);
    width: 85%;
    height: 55%;
    box-shadow: 0 0 30px 9px #ddd;
}
.tourist{
    position: absolute;
    width: 160px;
    height: 160px;
    left: 40%;
    top:-25%;
    border-radius:50%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 30px 9px #ddd;
}
.tourist img{
    width: 80%;
    height: 80%;
    /* margin:50px; */
    transform: translate(13%, 11%);
}
.register{
    position: absolute;
    width: 450px;
    height: 190px;
    margin-top: 80px;
    left: 110px;
    /* background-color: rgb(160, 34, 34); */
}
.register p {
    text-align: center;
    font-size: 30px;
}
.register .button{
    width: 160px;
    height: 65px;
    font-size: 30px;
    margin: 10px 32%;
    background-color: #21B97A;
}
.advertising{
    position: absolute;
    left: 36px;
    width: 90%;
    height: 160px;
    margin-top: 40px;
    /* background-color: rgb(131, 21, 21); */
}
.advertising img{
    width: 100%;
    height: 100%;
}
.qqq{
    margin-top:20px;
    background-color: #fff;
}
</style>