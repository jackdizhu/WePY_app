import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { VueConstructor } from "vue";
// import store from '@/store/index'

import '@/weui/weui.css'
import '@/weui/weui_theme.css'
import '@/css/app.css'
// import '@/weui/weui_theme.less'

interface IMpVue extends VueConstructor {
  mpType: string,
  $store: any
}

// 添加小程序hooks http://mpvue.com/mpvue/#_4
Component.registerHooks([
  // app
  'onLaunch', // 初始化
  'onShow', // 当小程序启动，或从后台进入前台显示
  'onHide', // 当小程序从前台进入后台
  // pages
  'onLoad', // 监听页面加载
  'onShow', // 监听页面显示
  'onReady', // 监听页面初次渲染完成
  'onHide', // 监听页面隐藏
  'onUnload', // 监听页面卸载
  'onPullDownRefresh', // 监听用户下拉动作
  'onReachBottom', // 页面上拉触底事件的处理函数
  'onShareAppMessage', // 用户点击右上角分享
  'onPageScroll', // 页面滚动
  'onTabItemTap', //当前是 tab 页时， 点击 tab 时触发 （mpvue 0.0.16 支持）
])

Vue.config.productionTip = false
// Vue.config.$store = store

let wxHasUpdate: any = function () {
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
      }
      // ,onUnload () {
      //   if (this.$options.data) {
      //     Object.assign(this.$data, this.$options.data())
      //   }
      // },
      // onShareAppMessage: function (options) {
      //   // let _this = this
      //   // 设置菜单中的转发按钮触发转发事件时的转发内容
      //   let shareObj = {
      //     title: '',        // 菜系菜谱小程序 默认是小程序的名称
      //     path: '',        // /pages/list/list 默认是当前页面，必须是以/开头的完整路径
      //     imgUrl: '',     // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      //     success: function (res) {
      //       // 转发成功之后的回调
      //       if (res.errMsg === 'shareAppMessage:ok') {
      //       }
      //     },
      //     fail: function (res) {
      //       // 转发失败之后的回调
      //       // 用户取消转发
      //       if (res.errMsg === 'shareAppMessage:fail cancel') {
      //       // 转发失败，其中 detail message 为详细失败信息
      //       } else if (res.errMsg === 'shareAppMessage:fail') {
      //       }
      //     }
      //   }
      //   return shareObj
      // }
    })
  }
}
// 使用插件
Vue.use(somePlugin)

// 在这个地方引入是为了registerHooks先执行
const MyApp = require('./App.vue').default as IMpVue

import mpvueToastRegistry from 'mptoast/registry'
mpvueToastRegistry(Vue)

const app = new Vue(MyApp)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      // '^pages/index/main',
      '^pages/list/main',
      // '^pages/details/main',
    ], // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
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
