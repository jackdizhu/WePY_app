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
  checkItem: any = {}
  checkCookingType: any = {}
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

    // wx.hideLoading()
    // this.detailsData = this.checkItem
    this.checkItem = store.state.checkItem
    this.checkCookingType = store.state.checkCookingType
    // console.log(this.checkItem, this.id)
    // console.log(this.checkCookingType, this.id)

    // get 请求
    this.httpRequest.request({
      url: this.api.get_details,
      type: 'GET',
      params: {
        cookingType: this.checkCookingType.value,
        name: this.checkItem.name,
        id: this.checkItem.id
      }
    }).then((res: any) => {
      wx.hideLoading()
      if (res.data) {
        this.detailsData = res.data
        this.detailsData.data = JSON.parse(this.detailsData.data)
      }
    })

    // wx.hideLoading()
    // this.detailsData = {
    //   "id": '010101',
    //   "name": "正宗洋葱回锅肉",
    //   "img": "https://s1.st.meishij.net/r/97/135/12346347/a12346347_153397872702953.jpg",
    //   "target": "https://www.meishij.net/zuofa/zhengzongyangconghuiguorou.html",
    //   "data": {
    //     "mainMaterial": ["寇大香鲜椒豆瓣", "二刀肉", "洋葱"],
    //     "auxiliaryMaterials": ["花椒粒", "白糖", "小榨菜籽油", "生姜", "大葱", "食盐", "味精"],
    //     "cookingMethod": ["食材：寇大香鲜椒豆瓣、二刀肉、洋葱、花椒粒、白糖、小榨菜籽油、生姜、大葱、食盐、味精等。", "将新鲜猪肉切成适量大小，放入水中开中火炖煮，添加葱段、姜片、花椒去除肉腥味。（如果没有大葱、生姜、花椒也可不加）", "二刀肉煮至筷子可以较为容易穿透猪肉时，即可捞出放凉并切成适度薄片，同时将洋葱洗净切片。（筷子可以穿透猪肉时即便是肉已煮熟，切片猪肉过厚或过薄）", "炒锅加热倒入小榨菜籽油，待油温渐高后放入花椒过热油。将切好的二刀肉放入锅中翻炒至肉片卷曲后，即可加入寇大香鲜椒豆瓣，并添加少量白糖。", "待放入的寇大香鲜椒豆瓣后继续翻炒入味即可", "放入洋葱片与回锅肉一同翻炒，直到洋葱去生炒熟再根据个人口味适当添加食盐、味精等即可出锅盛盘。", "完成"]
    //   }
    // }
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
