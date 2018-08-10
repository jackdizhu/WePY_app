import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator'

import Api from './utils/api.json'
import httpRequest from './utils/http'
// import Store from '@/store/index'

export default class VueClass extends Vue {
  public api: any = Api
  // public store: any = Store
  public httpRequest = new httpRequest()

  methods_test (): void {
    console.log('VueClass methods_test', 1)
  }

  public unload: any = function () {
    console.log('unload', 1)

    // if (this.$options.data) {
    //   Object.assign(this.$data, this.$options.data)
    // }
  }
  public shareAppMessage: any = function (options?: any): any {
    let shareObj = {
      title: '',
      path: '',
      imgUrl: '',
      success: function (res: any) {
        // 转发成功之后的回调
        if (res.errMsg === 'shareAppMessage:ok') {
        }
      },
      fail: function (res: any) {
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
}
