<template>
  <div class="page list-page">
    <div class="goods-sorts">
      <div class="ul-box">
        <div class="li-box" v-for="(item, key) in goodsSorts" :key="key" hover-class="li-box_active" @click="getGoodsList">{{item}}</div>
      </div>
    </div>
    <!-- <div class="list-connent">
      <div class="page__hd list-page_hd">
        <div class="page__title">菜谱 商品列表</div>
        <div class="page__desc">商品分类列表</div>
      </div>
      <div class="page__bd list-page_bd">
        <div class="list-page_bd_box">
          <scroll-view v-if="listData.length" class="scroll-view-box weui-cells weui-cells_after-title" scroll-y @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" :scroll-into-view="toView" :scroll-top="scrollTop">
            <div @click="navigatorToDetails(item)" class="weui-cell weui-cell_access justify-start" hover-class="weui-cell_active" v-for="(item, key) in listData" :key="key">
              <div class="weui-cell__hd">
                <image :src="item.img" class="list-image"></image>
              </div>
              <div class="weui-cell__bd list-text">
                <div class="list-text-h1">{{item.name}}</div>
                <div class="list-text-h2">好评{{item.praise}} 评价{{item.evaluate}}</div>
                <div class="list-text-h3 flex">
                  <div class="text-left flex-1">
                    <div>￥{{item.price}}起送</div><div>|</div><div>配送费￥{{item.distribution}}</div>
                  </div>
                  <div class="text-right">
                    <div>{{item.distance}}</div><div>|</div><div>{{item.time}}</div>
                  </div>
                </div>
              </div>
            </div>
          </scroll-view>
        </div>

      </div>
    </div> -->
    <div class="page__hd list-page_hd">
      <div class="page__title">菜谱 商品列表</div>
      <div class="page__desc">商品分类列表</div>
    </div>
    <div class="page__bd list-page_bd">
      <!-- <div class="weui-cells__title">带图标、说明、跳转的列表项</div> -->
      <div class="list-page_bd_box">
        <scroll-view v-if="listData.length" class="scroll-view-box weui-cells weui-cells_after-title" scroll-y @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" :scroll-into-view="toView" :scroll-top="scrollTop">
          <div @click="navigatorToDetails(item)" class="weui-cell weui-cell_access justify-start" hover-class="weui-cell_active" v-for="(item, key) in listData" :key="key">
            <div class="weui-cell__hd">
              <!-- <image :src="icon" class="list-image"></image> -->
              <image :src="item.img" class="list-image"></image>
            </div>
            <div class="weui-cell__bd list-text">
              <div class="list-text-h1">{{item.name}}</div>
              <div class="list-text-h2">好评{{item.praise}} 评价{{item.evaluate}}</div>
              <div class="list-text-h3 flex">
                <div class="text-left flex-1">
                  <div>￥{{item.price}}起送</div><div>|</div><div>配送费￥{{item.distribution}}</div>
                </div>
                <div class="text-right">
                  <div>{{item.distance}}</div><div>|</div><div>{{item.time}}</div>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
// Use Vuex
import base64 from '../../../static/images/base64';
export default {
  data() {
    return {
      goodsSorts: [
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
      ],
      page: 1,
      thisTime_upper: null,
      thisTime_lower: null,
      // scroll-view 属性
      toView: 'red',
      scrollTop: 100,
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
      ],
      icon: ''
    }
  },
  methods: {
    ...mapMutations({
      setCheckItem: 'SET_CHECKITEM'
    }),
    catchtouchmove () {
      return false
    },
    getGoodsList () {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      // get 请求
      this.$request({
        url: this.$api.test_get_list,
        type: 'GET',
        params: {
          page: this.page
        }
      }).then(res => {
        wx.hideLoading()
        if (res.data) {
          this.listData = res.data
        }
      })
    },
    navigatorToDetails (item) {
      this.setCheckItem(item)
      wx.navigateTo({
        url: '/pages/details/details?id=' + item.id
      })
      // setTimeout(() => {
      // }, 0)
    },
    // scroll-view 事件
    upper: function (e) {
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
    lower: function (e) {
      this.page++
      // 滚动到底部 加载更多数据
      this.$request({
        url: this.$api.test_get_list,
        type: 'GET',
        params: {
          page: this.page
        }
      }).then(res => {
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
  },
  mounted() {
    this.icon = base64.icon20;
  },
  created() {
  },
  onLoad() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // get 请求
    this.$request({
      url: this.$api.test_get_list,
      type: 'GET',
      params: {
        page: this.page
      }
    }).then(res => {
      wx.hideLoading()
      if (res.data) {
        this.listData = res.data
      }
    })
  },
  onReachBottom: function (e) {
    this.page++
    // 滚动到底部 加载更多数据
    this.$request({
      url: this.$api.test_get_list,
      type: 'GET',
      params: {
        page: this.page
      }
    }).then(res => {
      if (res.data) {
        this.listData.push(...res.data)
      }
    })

    console.log(e, 'onReachBottom')
  },
  scroll: function (e) {
    // console.log(e, 'scroll')
  }
}

</script>
<style lang='less'>
  // page {
  //   height: 100%;
  // }
  .list-page {
    position: relative;
    padding-left: 80px;
    height: 100%;
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
      height: auto;
      overflow: auto;
      width: 80px;
      z-index: 3;

      border-right: 1px solid #eee;
      background-color: #fff;
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
    width: 80px;
    height: 80px;
  }
  .list-text {
    min-height: 80px;
  }
  .list-text-h1 {
    font-size: 16px;
  }
  .list-text-h2 {
    font-size: 14px;
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
