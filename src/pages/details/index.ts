import VueClass from '@/vueClass.ts'
import { Vue, Component } from 'vue-property-decorator'
import Mptoast from 'mptoast/index.vue'
// import base64 from '../../../static/images/base64'
// vuex 需要重新 引入
import store from '@/store/index'


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
  id: string = ''
  detailsData: any = {}
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
    // vuex getters
    this.id = store.getters.get_checkItem_id
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.hideLoading()
    // this.detailsData = this.checkItem
    this.detailsData = store.state.checkItem
    console.log(this.detailsData, this.id)

    // get 请求
    // this.httpRequest.request({
    //   url: this.api.test_get_details,
    //   type: 'GET',
    //   params: {
    //     id: id
    //   }
    // }).then((res: any) => {
    //   wx.hideLoading()
    //   if (res.data) {
    //     this.detailsData = res.data
    //   }
    // })
  }

  onShareAppMessage (options?: any) {
    this.shareAppMessage(options)
  }

  onUnload () {
    this.unload()
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data)
    }
  }
}
