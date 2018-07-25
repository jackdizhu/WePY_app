<template>
  <div class="page list-page flex">
    <div class="page__hd list-page_hd">
      <div class="page__title">菜谱 商品列表</div>
      <div class="page__desc">商品分类列表</div>
    </div>
    <div class="page__bd list-page_bd">
      <!-- <div class="weui-cells__title">带图标、说明、跳转的列表项</div> -->
      <scroll-view v-if="listData.length" class="scroll-view-box weui-cells weui-cells_after-title" scroll-y bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll" :scroll-into-view="toView" :scroll-top="scrollTop">
        <div @click="navigatorToDetails(item)" class="weui-cell weui-cell_access justify-start" hover-class="weui-cell_active" v-for="(item, key) in listData" :key="key">
          <div class="weui-cell__hd">
            <image :src="icon" class="list-image"></image>
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
          <!-- <div class="weui-cell__ft weui-cell__ft_in-access">说明文字</div> -->
        </div>
      </scroll-view>

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
    navigatorToDetails (item) {
      this.setCheckItem(item)
      wx.navigateTo({
        url: '/pages/details/details?id=' + item.id
      })
      // setTimeout(() => {
      // }, 0)
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
      params: {}
    }).then(res => {
      wx.hideLoading()
      if (res.data) {
        this.listData = res.data
      }
    })
  }
}

</script>
<style lang='less'>
  page{
    height: 100%;
  }
  .list-page {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    align-content: stretch;
  }
  .scroll-view-box {
    height: 100%;
    overflow: auto;

    // position: absolute;
    // left: 0;
    // right: 0;
    // top: 0;
    // bottom: 0;
    // height: auto;
    // overflow: auto;
  }
  .list-page_hd {
    height: 80px;
  }
  .list-page_hd,
  .list-page_bd {
    width: 100%;
  }
  .list-page_bd {
    position: absolute;
    left: 0;
    right: 0;
    top: 160px;
    bottom: 0;
    height: auto;
    overflow: hidden;
    padding-bottom: 0;
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
