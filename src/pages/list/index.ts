import VueClass from '@/vueClass.ts'
import { random, ImgUrlChange } from '@/utils/consts.ts'
import { Vue, Component } from 'vue-property-decorator'
import Mptoast from 'mptoast/index.vue'
// vuex 需要重新 引入
import store from '@/store/index'
// import {data, cookingType} from '@/data/data.ts'

const debug = require('debug')('log:List')
const img_praise = require('@/img/praise.png')
const img_evaluate = require('@/img/evaluate.png')

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
  public imgPraise: string = img_praise
  public imgEvaluate: string = img_evaluate
  public data: any = store.state.data
  public cookingType: any = store.state.cookingType

  dateStr: string = (function () {
    var now = new Date()
    var year = now.getFullYear()      //年
    var month = now.getMonth() + 1    //月
    var day = now.getDate()           //日

    var hh = now.getHours()           //时
    var mm = now.getMinutes();        //分

    var dateStr = year + '-'

    if(month < 10)
        dateStr += '0'

    dateStr += month + '-'

    if(day < 10)
        dateStr += '0'

    dateStr += day
    return dateStr
  })()
  checkGoodsSorts: any = {
    "name": "川菜",
    "value": "chuancai"
  }

  page: number = 1
  thisTime_upper: any = null
  thisTime_lower: any = null
  // scroll-view 属性
  toView: string = 'red'
  scrollTop: number = 100
  store_listData: any = {}
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

  getGoodsList(item: any) {
    let _this = this
    this.checkGoodsSorts = item
    store.dispatch('set_checkCookingType', item)
    // this.store_listData = store.state.listData
    // if (this.store_listData[this.dateStr]) {
    //   _this.listData = this.store_listData.data[item.value].data
    //   return 0
    // }

    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // get 请求
    this.httpRequest.request({
      url: this.api.get_list,
      type: 'GET',
      params: {
        page: this.page,
        cookingType: item.value
      }
    }).then(async function (res: any) {
      console.log(_this.listData, 'getGoodsList list 222')
      if (res.data && res.data.length) {
        _this.listData = res.data
      } else {
        let data = await _this.get_list(store.state.listData)
        let _item: any = {}
        _item[_this.dateStr] = true
        _item.data = data
        store.dispatch('set_listData', _item)
        _this.listData = data[item.value].data
      }
      // 更换 img 域名地址
      for (let i = 0; i < _this.listData.length; i++) {
        _this.listData[i].img = ImgUrlChange(_this.listData[i].img)
      }
      // 延时 等待 dom 更新
      setTimeout(() => {
        wx.hideLoading()
      }, 100)
    })
  }

  navigatorToDetails(item: any) {
    // store.commit('SET_CHECKITEM', item)
    store.dispatch('set_checkItem', item)
    // this.setCheckItem(item)
    wx.navigateTo({
      url: '/pages/details/main?id=' + item.id
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
  async get_list (store_listData) {
    let obj: any = {}
    for (let i = 0; i < this.cookingType.length; i++) {
      let type = this.cookingType[i].value
      let page = (store_listData[type] && store_listData[type].page) ? store_listData[type].page + 1 : 1
      let pagesize = 20
      let _data: any[] = this.data.filter((item) => {
        return item.type === type
      })
      let count = _data.length
      let maxPage = Math.ceil(count / pagesize)
      if (page > maxPage) {
        page = 1
      }
      let arr = _data.slice((page * 20 - pagesize), page * 20)
      obj[type] = {}
      obj[type].page = page
      obj[type].data = arr
    }
    return obj
  }
  async onLoad() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let _this = this
    // get_cookingType
    this.httpRequest.request({
      url: this.api.get_cookingType,
      type: 'GET',
      params: {
      }
    }).then(async function (res: any) {
      if (res.data && res.data.length) {
        _this.cookingType = res.data
        store.dispatch('set_cookingType', res.data)
        store.dispatch('set_checkCookingType', _this.cookingType[0])
        // get 请求
        _this.httpRequest.request({
          url: _this.api.get_list,
          type: 'GET',
          params: {
            page: _this.page,
            cookingType: 'chuancai'
          }
        }).then(async function (res: any) {
          console.log(_this.listData, 'getGoodsList list 111')
          if (res.data && res.data.length) {
            _this.listData = res.data
          } else {
            let data = await _this.get_list(store.state.listData)
            let item: any = {}
            item[_this.dateStr] = true
            item.data = data
            store.dispatch('set_listData', item)
            _this.listData = data['chuancai'].data
          }
          // 更换 img 域名地址
          for (let i = 0; i < _this.listData.length; i++) {
            _this.listData[i].img = ImgUrlChange(_this.listData[i].img)
          }
          wx.hideLoading()
        })
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
