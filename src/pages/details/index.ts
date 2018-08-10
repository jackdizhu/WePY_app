import VueClass from '@/vueClass.ts'
import { Vue, Component } from 'vue-property-decorator'
import Mptoast from 'mptoast/index.vue'
// import base64 from '../../../static/images/base64'


const debug = require('debug')('log:Details')

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
export default class Details extends VueClass {
  detailsData: any = {}
  icon: string = ''
  // swiper
  // 是否显示面板指示点
  indicatorDots: boolean = true
  indicatorColor: string = '#eee'
  indicatorActiveColor: string = '#1178c4'
  autoplay: boolean = false
  interval: number = 5000
  // 滑动动画时长
  duration: number = 500

  onLoad() {
    // url 传参数
    // let id = this.$root.$mp.query.id
    // vuex 传参数
    let id: string = 'this.checkItem.id'
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // wx.hideLoading()
    // this.detailsData = this.checkItem
    // get 请求
    this.httpRequest.request({
      url: this.api.test_get_details,
      type: 'GET',
      params: {
        id: id
      }
    }).then((res: any) => {
      wx.hideLoading()
      if (res.data) {
        this.detailsData = res.data
      }
    })
  }
}
