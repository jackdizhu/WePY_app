import VueClass from '@/vueClass.ts'
import { Vue, Component } from 'vue-property-decorator'
import Mptoast from 'mptoast/index.vue'


const debug = require('debug')('log:Index')

declare module 'vue/types/vue' {
  interface Vue {
    $mptoast: any
  }
}

// 必须使用装饰器的方式来指定component
@Component({
  components: {
    Mptoast
  }
})
export default class Home extends VueClass {
  getOpenid(e) {
    let _this = this
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; // 返回code
        _this.httpRequest.request({
          url: _this.api.get_openId,
          type: 'GET',
          params: {
            code: res.code
          }
        }).then((res: any) => {
          if (res.data) {
            console.log(res.data, 111)
          }
        })
      }
    })
  }
  getUserInfo(res) {
    let detail = (res && res.mp && res.mp.detail) || {}
    if (detail.userInfo) {
      this.getOpenid(res)
    } else if (detail.errMsg) {
      console.log('授权失败', 111)
    }
  }
  created() {
    // 执行一次
    console.log(this, 'page index created')
  }

  mounted() {
    console.log(this, 'mounted')
  }

  onLoad() {
    // 页面切换 会重新执行
    console.log(this, 'page index onLoad')
  }

  onShow() {
    console.log(this, 'onShow')
  }

  onUnload() {
    console.log(this, 'onUnload')
  }

  onHide() {
    console.log(this, 'onHide')
  }
}
