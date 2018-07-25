import Vue from 'vue'
import App from './App'
import './css/app.css'
import store from './store'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store

import { request, requestAll } from './utils/http.js'
import api from './utils/api.js'

Vue.prototype.$request = request
Vue.prototype.$requestAll = requestAll
Vue.prototype.$api = api

import '../static/weui/weui.css'
import '../static/weui/weui_theme.less'

import mpvueToastRegistry from 'mptoast/registry'
mpvueToastRegistry(Vue)

const app = new Vue({
  App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      '^pages/index/index',
      'pages/list/list',
      'pages/details/details'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '菜谱 商品展示 DEMO',
      navigationBarTextStyle: 'black',
      onReachBottomDistance: true,
      enablePullDownRefresh: false
    }
  }
}
