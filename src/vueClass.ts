import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator'
import {data, cookingType} from '@/data/data.ts'

import Api from './utils/api.json'
import httpRequest from './utils/http'
// import Store from '@/store/index'

export default class VueClass extends Vue {
  constructor() {
    super()
    // onShareAppMessage (options?: any) {
    //   this.shareAppMessage(options)
    // }
    // console.log(this.shareAppMessage, 1)
  }

  public api: any = Api

  public data: any = data
  public cookingType: any = cookingType

  // public store: any = Store
  public httpRequest = new httpRequest()

  methods_test (): void {
    console.log('VueClass methods_test', 1)
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
