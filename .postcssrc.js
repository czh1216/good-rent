module.exports = {
    plugins: {
    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem

    //   'postcss-pxtorem': {
    //       //vant组件库是根据37.5适配
    //     rootValue: 37.5,
    //     //适配的属性，*代表所有
    //     propList: ['*']
    //   }

    //只能转换样式表里的尺寸
    'postcss-pxtorem': {
        rootValue ({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75
        },
        propList: ['*']
      }
    }
  }
  // 移动端适配
// 1. rem动态
//   - amfe-flexible
//   - 不管处于什么分辨率, 1rem始终是 1/10视口大小

// 2. 将px --> rem
//  - postcss-pxtorem
//  - vant官网
//  - 版本是5.1.1