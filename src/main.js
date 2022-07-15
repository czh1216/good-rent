import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'amfe-flexible'
import '@/assets/download/iconfont.css'
import router from '@/router'
import 'vant/lib/index'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
