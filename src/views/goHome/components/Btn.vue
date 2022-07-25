<template>
  <div class="btn">
    <div class="title">{{ title }}</div>
    <div class="option">
      <span
        v-for="(item, index) in data"
        :key="item.value"
        :class="{ selection: selectionIndex == index }"
        @click="clickFn(index, item.value)"
      >
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Btn',
  data () {
    return {
      selectionIndex: -1
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    //点击赛选中的每一项进行vuex中数据的修改
    clickFn (index, val) {
      if (this.selectionIndex === index) {
        this.selectionIndex = -1
        if (val.includes('ROOM')) {
          this.setParameters(['', 4])
        } else if (val.includes('ORIEN')) {
          this.setParameters(['', 8])
        } else if (val.includes('FLOOR')) {
          this.setParameters(['', 10])
        } else if (val.includes('CHAR')) {
          this.setParameters(['', 9])
        }
        return
      }
      this.selectionIndex = index
      if (val.includes('ROOM')) {
        this.setParameters([val, 4])
      } else if (val.includes('ORIEN')) {
        this.setParameters([val, 8])
      } else if (val.includes('FLOOR')) {
        this.setParameters([val, 10])
      } else if (val.includes('CHAR')) {
        this.setParameters([val, 9])
      }
    },
    ...mapMutations(['setParameters'])
  }
}
</script>

<style lang="less" scoped>
.btn {
  padding: 20px;
  padding-bottom: 0;
  .title {
    font-size: 15px;
  }
  .option {
    margin: 20px 0 0 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
    span {
      display: inline-block;
      font-size: 14px;
      color: #888888;
      width: 72px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-right: 18px;
      margin-bottom: 12px;
      border: 1px solid #dddddd;
      border-radius: 5px;
    }
    .selection {
      border: 1px solid #21b97a;
      background-color: #defaef;
      color: #21b97a;
    }
  }
}
</style>
