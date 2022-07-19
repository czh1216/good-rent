<template>
  <div>
    <div class="list-item" v-for="item in List" :key="item.houseCode">
      <div class="left">
        <img :src="item.houseImg" />
      </div>
      <div class="right">
        <h2 class="title">{{ item.title }}</h2>
        <div class="desc">{{ item.desc }}</div>
        <div class="tags">
          <span v-for="(obj, index) in item.tags" :key="index">
            {{ obj }}
          </span>
        </div>
        <div class="price">
          <span>{{ item.price }}</span
          >元/月
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListCell',
  props: {
    List: Array,
    required: true
  }
}
</script>

<style lang="less" scoped>
.favorate-list {
  .goods-card {
    border-bottom: 1px solid #e5e5e5;
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 240px;
    padding-top: 36px;
    border-bottom: 2px solid #e5e5e5;
    .left {
      width: 212px;
      height: 160px;
      margin-right: 16px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 1;
      .title {
        height: 30px;
        font-size: 30px;
      }
      .desc {
        height: 30px;
        font-size: 24px;
        color: #afb2b3;
      }
      .tags {
        position: relative;
        height: 44px;
        line-height: 30px;
        span {
          position: absolute;
          top: 2px;
          display: inline-block;
          width: 92px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          background-color: #e1f5f8;
          color: #39becd;
          font-size: 24px;
          border-radius: 8px;
          margin-right: 6px;
        }
      }
      .price {
        height: 46px;
        color: #fa5741;
        font-size: 28px;
        margin-top: 4px;
        span {
          font-weight: 700;
          font-size: 32px;
        }
      }
    }
  }
}
</style>
