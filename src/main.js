import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vantConfig from './vant.config'
import './assets/css/color.css'
import BaiduMap from 'vue-baidu-map'

Vue.use(vantConfig)
Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: 'kD1GWk7uCW0Kp92jCNyDdsIDLmRQhhXt'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
