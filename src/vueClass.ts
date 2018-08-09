import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator'

import Api from './utils/api.json'
export default class VueClass extends Vue {
  public api: any = Api

  // @Emit()
  // methods_test (): void {
  //   console.log('VueClass methods_test', 1)
  // }

  // private wxHasUpdate: any = function () {
  //   // 获取小程序更新机制兼容
  //   if (wx.canIUse('getUpdateManager')) {
  //     const updateManager = wx.getUpdateManager()
  //     updateManager.onCheckForUpdate(function (res: any) {
  //       // 请求完新版本信息的回调
  //       console.log(res, '版本信息')

  //       if (res.hasUpdate) {
  //         updateManager.onUpdateReady(function () {
  //           wx.showModal({
  //             title: '更新提示',
  //             content: '新版本已经准备好，是否重启应用？',
  //             success: function (res: any) {
  //               if (res.confirm) {
  //                 // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
  //                 updateManager.applyUpdate()
  //               }
  //             }
  //           })
  //         })
  //         updateManager.onUpdateFailed(function () {
  //           // 新的版本下载失败
  //           wx.showModal({
  //             title: '新版本已经上线',
  //             content: '已经有新版本了哟，请您删除当前小程序，重新搜索打开'
  //           })
  //         })
  //       }
  //     })
  //   } else {
  //     // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
  //     wx.showModal({
  //       title: '提示',
  //       content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
  //     })
  //   }
  // }
  // created () {
  //   console.log(this, 'VueClass created')
  //   // 检测版本更新 执行一次
  //   this.wxHasUpdate && this.wxHasUpdate()
  //   this.wxHasUpdate = null
  // }
  // onUnload () {
  //   if (this.$options.data) {
  //     // Object.assign(this.$data, this.$options.data)
  //     console.log(this.$data, 123456)
  //   }
  // }
  // onShareAppMessage (options: any): any {
  //   let shareObj = {
  //     title: '',
  //     path: '',
  //     imgUrl: '',
  //     success: function (res: any) {
  //       // 转发成功之后的回调
  //       if (res.errMsg === 'shareAppMessage:ok') {
  //       }
  //     },
  //     fail: function (res: any) {
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
}
