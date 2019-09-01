<template>
  <div class="page list-page">
    <div class="page__hd list-page_hd">
      <div class="page__title">菜谱 随机推荐列表</div>
      <div class="page__desc">每个菜系推荐一个, 每天更新一次</div>
      <div class="list-page_bd_box">
        <scroll-view v-if="listData.length" class="scroll-view-box weui-cells weui-cells_after-title" scroll-y @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" :scroll-into-view="toView" :scroll-top="scrollTop">
          <div @click="navigatorToDetails(item)" class="weui-cell weui-cell_access justify-start items-start" hover-class="weui-cell_active" v-for="(item, key) in listData" :key="key">
            <div class="weui-cell__hd">
              <image :src="item.img" class="list-image"/>
            </div>
            <div class="weui-cell__bd list-text">
              <div class="list-text-h1">
                <div class="name">{{item.name}}</div>
              </div>
              <div class="list-text-h1">
                <div class="typeName">{{item.typeName}}</div>
              </div>
              <div class="list-text-h2">
                <image :src="imgPraise" class="imgPraise img-icon"/>
                {{item.praise}}&nbsp;&nbsp;&nbsp;&nbsp;
                <image :src="imgEvaluate" class="imgEvaluate img-icon"/>
                {{item.evaluate}}
              </div>
            </div>
          </div>

          <div @click="navigatorToList()" class="weui-cell weui-cell_access justify-start items-start" hover-class="weui-cell_active">
            <div class="weui-cell__hd">
              <image :src="defImg" class="list-image"/>
            </div>
            <div class="weui-cell__bd list-text">
              <div class="list-text-h1">
                <div class="name">查看更多 . . .</div>
              </div>
              <div class="list-text-h2">
                <image :src="imgPraise" class="imgPraise img-icon"/>
                99.9%&nbsp;&nbsp;&nbsp;&nbsp;
                <image :src="imgEvaluate" class="imgEvaluate img-icon"/>
                999
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { mapGetters, mapMutations } from 'vuex'
import { random, ImgUrlChange } from '@/utils/consts.js'
// vuex 需要重新 引入
import store from '@/store/index'
import {api} from '@/utils/apiFn'
const thisApi = api

const img_praise = require('@/images/praise.png')
const img_evaluate = require('@/images/evaluate.png')

const debug = require('debug')('log:List')

export default {
  data () {
    return {
      imgPraise: img_praise,
      imgEvaluate: img_evaluate,
      data: store.state.data,
      cookingType: store.state.cookingType,
      dateStr: (function () {
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let day = now.getDate()
        let hh = now.getHours()
        let mm = now.getMinutes()
        let dateStr = year + '-'
        if (month < 10) {
          dateStr += '0'
        }
        dateStr += month + '-'
        if (day < 10) {
          dateStr += '0'
        }
        dateStr += day
        return dateStr
      })(),
      defImg: 'http://7xrqzz.com1.z0.glb.clouddn.com/nopic_2.jpg',
      page: 1,
      thisTime_upper: null,
      thisTime_lower: null,
      // scroll-view 属性
      toView: 'red',
      scrollTop: 100,
      store_listRandomData: {},
      listData: [
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
    }
  },
  methods: {
    ...mapMutations({
      setCheckItem: 'SET_CHECKITEM'
    }),
    navigatorToDetails (item) {
      // store.commit('SET_CHECKITEM', item)
      // store.dispatch('set_checkItem', item)
      this.setCheckItem(item)
      wx.navigateTo({
        url: '/pages/details/main?id=' + item._id
      })
    },
    navigatorToList () {
      wx.navigateTo({
        url: '/pages/list/main'
      })
    },
    // scroll-view 事件
    upper (e) {
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
    },
    lower (e) {
      this.page++
      // 滚动到底部 加载更多数据
      // this.httpRequest.request({
      //   url: this.api.get_list,
      //   type: 'GET',
      //   params: {
      //     page: this.page
      //   }
      // })
      thisApi.get_list({
        page: this.page
      })
        .then((res) => {
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
    },
    // 生成 随机推荐数据
    async get_listRandom () {
      let arr = []
      for (let i = 0; i < this.cookingType.length; i++) {
        let type = this.cookingType[i].value
        let _data = this.data.filter((item) => {
          return item.type === type
        })
        let count = _data.length
        let page = random(0, count)
        let item = _data[page]
        arr.push(item)
      }
      return arr
    }
  },
  async onLoad () {
    // 调用 初始化数据
    // this.httpRequest.request({
    //   url: this.api.init,
    //   type: 'GET',
    //   params: {
    //   }
    // })
    thisApi.init({})

    let _this = this
    // this.store_listRandomData = store.state.listRandomData
    // if (this.store_listRandomData[this.dateStr]) {
    //   _this.listData = this.store_listRandomData.data
    //   return 0
    // }

    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // get 请求
    // this.httpRequest.request({
    //   url: this.api.get_listRandom,
    //   type: 'GET',
    //   params: {
    //   }
    // })
    thisApi.get_listRandom({})
      .then(async function (res) {
        console.log(res.data, 'listRandom then')
        if (res.data && res.data.length) {
          _this.listData = res.data
        } else {
          let data = await _this.get_listRandom()
          let item = {}
          item[_this.dateStr] = true
          item.data = data
          store.dispatch('set_listRandomData', item)
          _this.listData = data
        }
        // 更换 img 域名地址
        for (let i = 0; i < _this.listData.length; i++) {
          _this.listData[i].img = ImgUrlChange(_this.listData[i].img)
        }
        wx.hideLoading()
      })
  },
  onReachBottom (e) {
    this.page++
    // 滚动到底部 加载更多数据
    // this.httpRequest.request({
    //   url: this.api.get_list,
    //   type: 'GET',
    //   params: {
    //     page: this.page
    //   }
    // })
    thisApi.get_list({
      page: this.page
    })
      .then((res) => {
        if (res.data) {
          this.listData.push(...res.data)
        }
      })
    console.log(e, 'onReachBottom')
  },
  onShareAppMessage (options) {
    this.shareAppMessage(options)
  },
  onUnload () {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data)
    }
  }
}
</script>
<style lang='less'>
  page {
    height: 100%;
  }
  .page__title {
    padding-top: 8px;
  }
  .page__desc {
    padding-bottom: 4px;
  }
  .page__title,.page__desc {
    padding-left:12px;
    padding-right:12px;
  }
  .list-page {
    position: relative;
    height: 100%;
    .weui-cell__bd {
      padding-top: 6px;
    }
    .list-page_hd {
      height: 100%;
      padding: 0;
      overflow: auto;
      width: 100%;
    }
    .list-connent {
      height: 100%;
      overflow: auto;
    }
    .goods-sorts {
      // position: absolute;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      // overflow: hidden;
      height: auto;
      overflow: auto;
      width: 80px;
      z-index: 3;
      border-right: 1px solid #eee;
      background-color: #fff;
      .goods-sorts_scroll {
        height: 100%;
      }
      .li-box {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-bottom: 1px solid #eee;
      }
      .li-box_active {
        background-color: #eee;
      }
    }
  }
  .list-image {
    margin-right: 10px;
    vertical-align: middle;
    width: 140px;
    height: 140px;
  }
  .list-text {
    min-height: 80px;
  }
  .list-text-h1 {
    position: relative;
    margin-bottom: 10px;
    .name {
      font-size: 18px;
      font-weight: 700;
    }
    .typeName {
      font-size: 12px;
      padding: 3px 4px;
      border-radius: 3px;
      display: inline-block;
      background: #B8860B;
      color: #fff;
    }
  }
  .list-text-h2 {
    vertical-align: middle;
    line-height: 18px;
    font-size: 16px;
  }
  .list-text-h3 {
    font-size: 14px;
    .text-left ,
    .text-right {
      div {
        display: inline;
      }
    }
  }
</style>
