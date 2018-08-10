<template>
  <div class="page page-details">
    <div class="page__hd">
      <div class="page__title">菜谱 商品详情</div>
      <div class="page__desc">商品详细信息展示</div>
    </div>
    <div class="page__bd page-details__bd">
      <!-- <div class="weui-cells__title">带图标、说明、跳转的列表项</div> -->
      <div class="weui-article">
        <div class="weui-article__section" v-if="detailsData.id">
          <div class="weui-article__h3 weui-flex items-center content-center justify-center">
            <swiper class="swiper-box"
              :indicator-dots="indicatorDots"
              :indicator-color="indicatorColor"
              :indicator-active-color="indicatorActiveColor"
              :autoplay="autoplay"
              :interval="interval"
              :duration="duration">
              <swiper-item v-for="(item, key) in 3" :key="key" class="swiper-item-box">
                <image :src="detailsData.img" class="list-image"></image>
              </swiper-item>
            </swiper>
          </div>
          <div class="weui-article__p list-text">
            <div class="list-text-h1">{{detailsData.name}}</div>
            <div class="list-text-h2">好评{{detailsData.praise}} 评价{{detailsData.evaluate}}</div>
            <div class="list-text-h3 flex">
              <div class="text-left flex-1">
                <div>￥{{detailsData.price}}起送</div><div>|</div><div>配送费￥{{detailsData.distribution}}</div>
              </div>
              <div class="text-right">
                <div>{{detailsData.distance}}</div><div>|</div><div>{{detailsData.time}}</div>
              </div>
            </div>
          </div>
          <!-- <div class="weui-cell__ft weui-cell__ft_in-access">说明文字</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<!--必须指定为ts-->
<script lang="ts" src="./index.ts">
</script>


<style lang='less'>
  .weui-article__h3,
  .list-image {
    width: 350px;
    height: 350px;
  }
  .list-image {
    margin-right: 0;
    vertical-align: middle;
  }
  .swiper-box,
  .swiper-item-box {
    width: 100%;
    height: 100%;
  }
  .page-details__bd {
    background-color: #fff;
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
