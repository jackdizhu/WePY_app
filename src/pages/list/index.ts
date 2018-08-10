import VueClass from '@/vueClass.ts'
import { Vue, Component } from 'vue-property-decorator'
import Mptoast from 'mptoast/index.vue'
// vuex 需要重新 引入
import store from '@/store/index'

const debug = require('debug')('log:List')

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
export default class List extends VueClass {
  goodsSorts: string[] = [
    '川菜',
    '湘菜',
    '粤菜',
    '东北菜',
    '鲁菜',
    '浙菜',
    '苏菜',
    '清真菜',
    '闽菜',
    '沪菜',
    '京菜',
    '湖北菜',
    '徽菜',
    '豫菜',
    '西北菜',
    '云贵菜',
    '江西菜',
    '山西菜',
    '广西菜',
    '港台菜',
    '其它菜'
  ]
  page: number = 1
  thisTime_upper: any = null
  thisTime_lower: any = null
  // scroll-view 属性
  toView: string = 'red'
  scrollTop: number = 100
  listData: any[] = [
    // {
    //   id: '0010',
    //   img: 'http://dummyimage.com/14400',
    //   name: '炸鸡汉堡(北京店)',
    //   praise: '99.6%',
    //   evaluate: '666',
    //   price: '30',
    //   distribution: '5',
    //   distance: '795m',
    //   time: '48分钟'
    // }
  ]

  getGoodsList () {
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
      }
    })
  }

  navigatorToDetails (item: any) {
    // store.commit('SET_CHECKITEM', item)
    store.dispatch('set_checkItem', item)
    // this.setCheckItem(item)
    wx.navigateTo({
      url: '/pages/details/main?id=' + item.id
    })
  }

  // scroll-view 事件
  upper (e: any) {
    // if (this.thisTime_lower) {
    //   return false
    // }
    // clearTimeout(this.thisTime_upper)
    // this.thisTime_upper = setTimeout(() => {
    //   if (this.current > 0) {
    //     this.current--
    //   }
    //   setTimeout(() => {
    //     this.thisTime_upper = null
    //   }, 1200)
    // }, 100)
    console.log(e, 'upper')
  }

  lower (e: any) {
    this.page++
    // 滚动到底部 加载更多数据
    this.httpRequest.request({
      url: this.api.test_get_list,
      type: 'GET',
      params: {
        page: this.page
      }
    }).then((res: any) => {
      if (res.data) {
        this.listData.push(...res.data)
      }
    })
    // if (this.thisTime_upper) {
    //   return false
    // }
    // clearTimeout(this.thisTime_lower)
    // this.thisTime_lower = setTimeout(() => {
    //   if (this.current < 1) {
    //     this.current++
    //   }
    //   setTimeout(() => {
    //     this.thisTime_lower = null
    //   }, 2200)
    // }, 100)
    console.log(e, 'lower')
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
      }
    })
  }

  onReachBottom (e: any) {
    this.page++
    // 滚动到底部 加载更多数据
    this.httpRequest.request({
      url: this.api.test_get_list,
      type: 'GET',
      params: {
        page: this.page
      }
    }).then((res: any) => {
      if (res.data) {
        this.listData.push(...res.data)
      }
    })
    console.log(e, 'onReachBottom')
  }

  onShareAppMessage (options?: any) {
    this.shareAppMessage(options)
  }

  onUnload () {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data)
    }
  }
}
