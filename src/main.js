/* eslint-disable */
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

import mpvueToastRegistry from 'mptoast/src/registry'
mpvueToastRegistry(Vue)

let wxHasUpdate = function () {
  // 获取小程序更新机制兼容
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res, '版本信息')

      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新的版本下载失败
          wx.showModal({
            title: '新版本已经上线',
            content: '已经有新版本了哟，请您删除当前小程序，重新搜索打开'
          })
        })
      }
    })
  } else {
    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

// 同一路由切换时，上一次的页面数据会保留
const somePlugin = {
  install: function () {
    Vue.mixin({
      created () {
        // 检测版本更新 执行一次
        wxHasUpdate && wxHasUpdate()
        wxHasUpdate = null
      },
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
