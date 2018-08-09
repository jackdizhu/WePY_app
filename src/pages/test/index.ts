import VueClass from '@/vueClass.ts'
import { Vue, Component } from 'vue-property-decorator'
import { AppUrls } from '@/utils/consts.ts'
import Card from '@/components/card.vue' // mpvue目前只支持的单文件组件
import CompB from '@/components/compb.vue' // mpvue目前只支持的单文件组件
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
    Mptoast,
    Card,
    CompB, //注意，vue的组件在template中的用法，`CompB` 会被转成 `comp-b`
  }
})
class Index extends VueClass {
  AppUrls = AppUrls
  ver: number = 123
  page: number = 1
  listData: any[] = []

  methods_test2 (): void {
    let msg: string = '请输入正确的手机号码'
    this.$mptoast(msg)
    console.log('VueClass methods_test2', 2)
  }

  onLoad() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // get 请求
    this.httpRequest.request({
      url: this.api.test_get_list,
      type: 'GET',
      params: {
        page: this.page
      }
    }).then((res: any) => {
      wx.hideLoading()
      if (res.data) {
        this.listData = res.data
        console.log(this.listData, 2)
      }
    })
  }

  onShow() { // 小程序 hook
    // this.methods_test()
    console.log(this.api, 2)

    debug('onShow')
  }

  mounted() { // vue hook
    debug('mounted')
  }
}

export default Index
