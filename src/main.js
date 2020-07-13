import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 axios
// import 'lib-flexible'
import axios from 'axios'
// 导入 vue-axios
import VueAxios from 'vue-axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'
// 导入全局样式
import '@/styles/index.less'
// 导入 echarts
import echarts from 'echarts'
import dayjs from 'dayjs'
import BaiduMap from 'vue-baidu-map'
// 在man.js中引入 weixin-jsapi
import wx from 'weixin-js-sdk'
// 在man.js中注册 weixin-jsapi
Vue.prototype.wx = wx
Vue.use(Vant)
Vue.use(BaiduMap, {
  ak: 'T2m1HPUGp8yOUEp3DAT3kLluIznaIWaa'
})
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.filter('dateFilter', function (value, farmatter = 'YYYY-MM-DD HH:mm:ss') {
  if (!value) return ''
  return dayjs(value).format(farmatter)
})
axios.defaults.baseURL = 'http://xf.padssz.com:9265'
// axios.defaults.baseURL = 'http://192.168.0.2:9265'
Vue.use(VueAxios, axios)
Vue.prototype.echarts = echarts
Vue.prototype.$EventBus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
