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

// 同一路由切换时，上一次的页面数据会保留
const somePlugin = {
  install: function () {
    Vue.mixin({
      onUnload () {
        if (this.$options.data) {
          Object.assign(this.$data, this.$options.data())
        }
      },
      onShareAppMessage: function (options) {
        // let _this = this
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        let shareObj = {
          title: '',        // 菜系菜谱小程序 默认是小程序的名称
          path: '',        // /pages/list/list 默认是当前页面，必须是以/开头的完整路径
          imgUrl: '',     // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
          success: function (res) {
            // 转发成功之后的回调
            if (res.errMsg === 'shareAppMessage:ok') {
            }
          },
          fail: function (res) {
            // 转发失败之后的回调
            // 用户取消转发
            if (res.errMsg === 'shareAppMessage:fail cancel') {
            // 转发失败，其中 detail message 为详细失败信息
            } else if (res.errMsg === 'shareAppMessage:fail') {
            }
          }
        }
        return shareObj
      }
    })
  }
}
// 使用插件
Vue.use(somePlugin)

const app = new Vue({
  App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      // '^pages/index/index',
      '^pages/list/list',
      // '^pages/test/test',
      'pages/details/details'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '菜系菜谱',
      navigationBarTextStyle: 'black',
      onReachBottomDistance: true,
      enablePullDownRefresh: false
    }
  }
}
