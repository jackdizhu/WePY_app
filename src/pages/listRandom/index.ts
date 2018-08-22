import VueClass from '@/vueClass.ts'
import {data, cookingType} from '@/data/data.ts'
import { random } from '@/utils/consts.ts'
import { Vue, Component } from 'vue-property-decorator'
import Mptoast from 'mptoast/index.vue'
// vuex 需要重新 引入
import store from '@/store/index'

const debug = require('debug')('log:List')

import moment from 'moment'

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
  dateStr: string = moment().format('YYYY-MM-DD')
  defImg: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAD8ElEQVR4nO3UsQ0AIRDAsOf3X/dqWIEORbInSJU1M/sDCPhfBwDcMiwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsIAMwwIyDAvIMCwgw7CADMMCMgwLyDAsIMOwgAzDAjIMC8gwLCDDsICMAyvfBjZwy5yCAAAAAElFTkSuQmCC'
  page: number = 1
  thisTime_upper: any = null
  thisTime_lower: any = null
  // scroll-view 属性
  toView: string = 'red'
  scrollTop: number = 100
  listRandomData: any = {}
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
  // 生成 随机推荐数据
  async get_listRandom () {
    let arr: any[] = []
    for (let i = 0; i < cookingType.length; i++) {
      let type = cookingType[i].value
      let _data: any[] = data.filter((item) => {
        return item.type === type
      })
      let count = _data.length
      let page = random(0, count)
      let item: any = _data[page]
      arr.push(item)
    }
    return arr
  }
  async onLoad() {
    let _this = this
    this.listRandomData = store.state.listRandomData
    if (this.listRandomData[this.dateStr]) {
      _this.listData = this.listRandomData.data
      console.log(store.state.listRandomData, 111)
      return 0
    }

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
    }).then(async function (res: any) {
      console.log('listRandom then', 111)
      wx.hideLoading()
      if (res.data && res.data.length) {
        _this.listData = res.data
        for (let i = 0; i < _this.listData.length; i++) {
          _this.listData[i].data = JSON.parse(_this.listData[i].data)
        }
      } else {
        let data = await _this.get_listRandom()
        let item: any = {}
        item[_this.dateStr] = true
        item.data = data
        store.dispatch('set_listRandomData', item)
        _this.listData = data
      }
    })
    let data = await _this.get_listRandom()
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
