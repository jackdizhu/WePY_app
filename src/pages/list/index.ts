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
  checkGoodsSorts: any = {
    "name": "川菜",
    "value": "chuancai"
  }
  goodsSorts: any[] = [
    {
      "name": "川菜",
      "value": "chuancai"
    },
    {
      "name": "湘菜",
      "value": "xiangcai"
    },
    {
      "name": "粤菜",
      "value": "yuecai"
    },
    {
      "name": "东北菜",
      "value": "dongbeicai"
    },
    {
      "name": "鲁菜",
      "value": "lucai"
    },
    {
      "name": "浙菜",
      "value": "zhecai"
    },
    {
      "name": "苏菜",
      "value": "sucai"
    },
    {
      "name": "清真菜",
      "value": "qingzhencai"
    },
    {
      "name": "闽菜",
      "value": "mincai"
    },
    {
      "name": "沪菜",
      "value": "hucai"
    },
    {
      "name": "京菜",
      "value": "jingcai"
    },
    {
      "name": "湖北菜",
      "value": "hubeicai"
    },
    {
      "name": "徽菜",
      "value": "huicai"
    },
    {
      "name": "豫菜",
      "value": "yucai"
    },
    {
      "name": "西北菜",
      "value": "xibeicai"
    },
    {
      "name": "云贵菜",
      "value": "yunguicai"
    },
    {
      "name": "江西菜",
      "value": "jiangxicai"
    },
    {
      "name": "山西菜",
      "value": "shanxicai"
    },
    {
      "name": "广西菜",
      "value": "guangxicai"
    },
    {
      "name": "港台菜",
      "value": "gangtaicai"
    },
    {
      "name": "其它菜",
      "value": "qitacai"
    }
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

  getGoodsList(item: any) {
    this.checkGoodsSorts = item
    store.dispatch('set_checkCookingType', item)

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

  onLoad() {
    store.dispatch('set_checkCookingType', this.goodsSorts[0])

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
        cookingType: 'chuancai'
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
