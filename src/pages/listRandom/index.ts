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
  defImg: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAD8ElEQVR4nO3UsQ0AIRDAsOf3X/dqWIEORbInSJU1M/sDCPhfBwDcMiwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsICMAyvfBjZwy5yCAAAAAElFTkSuQmCC'
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

  navigatorToDetails(item: any) {
    // store.commit('SET_CHECKITEM', item)
    store.dispatch('set_checkItem', item)
    // this.setCheckItem(item)
    wx.navigateTo({
      url: '/pages/details/main?id=' + item.id
    })
  }

  navigatorToList() {
    wx.navigateTo({
      url: '/pages/list/main'
    })
  }

  // scroll-view 事件
  upper(e: any) {
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

  lower(e: any) {
    this.page++
    // 滚动到底部 加载更多数据
    this.httpRequest.request({
      url: this.api.get_list,
      type: 'GET',
      params: {
        page: this.page
      }
    }).then((res: any) => {
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].data = JSON.parse(res.data[i].data)
        }
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
      url: this.api.get_listRandom,
      type: 'GET',
      params: {
      }
    }).then((res: any) => {
      wx.hideLoading()
      if (res.data) {
        this.listData = res.data
        for (let i = 0; i < this.listData.length; i++) {
          this.listData[i].data = JSON.parse(this.listData[i].data)
        }
      }
    })
  }

  onReachBottom(e: any) {
    this.page++
    // 滚动到底部 加载更多数据
    this.httpRequest.request({
      url: this.api.get_list,
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

  onShareAppMessage(options?: any) {
    this.shareAppMessage(options)
  }

  onUnload() {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data)
    }
  }
}
