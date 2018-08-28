<template>
  <div class="page page-details">
    <!-- <div class="page__hd">
      <div class="page__title">菜谱 商品详情</div>
      <div class="page__desc">商品详细信息展示</div>
    </div> -->
    <div class="page__bd page-details__bd">
      <!-- <div class="weui-cells__title">带图标、说明、跳转的列表项</div> -->
      <div class="weui-article">
        <div class="weui-article__section" v-if="detailsData.id || detailsData._id">
          <div class="weui-article__h3 weui-flex items-center content-center justify-center">
            <!-- <swiper class="swiper-box"
              :indicator-dots="indicatorDots"
              :indicator-color="indicatorColor"
              :indicator-active-color="indicatorActiveColor"
              :autoplay="autoplay"
              :interval="interval"
              :duration="duration">
              <swiper-item v-for="(item, key) in 3" :key="key" class="swiper-item-box">
                <image :src="detailsData.img" class="list-image"></image>
              </swiper-item>
            </swiper> -->
            <image :src="detailsData.img" class="list-image"></image>
          </div>
          <div class="weui-article__p list-text">
            <div class="list-text-h1">
              <div>{{detailsData.name}}</div>
              <div class="tag">
                ({{detailsData.typeName}})
              </div>
            </div>
            <div class="list-text-h3 color333">
              <div class="text-left">
                主&nbsp;料&nbsp;:
              </div>
              <div class="text-right">
                <div class="right-box-span" v-for="(item, key) in detailsData.data.mainMaterial" :key="key">{{item}}&nbsp;&nbsp;&nbsp;&nbsp;</div>
              </div>
            </div>
            <div class="list-text-h3 color666">
              <div class="text-left">
                辅&nbsp;料&nbsp;:
              </div>
              <div class="text-right">
                <div class="right-box-span" v-for="(item, key) in detailsData.data.auxiliaryMaterials" :key="key">{{item}}&nbsp;&nbsp;&nbsp;&nbsp;</div>
              </div>
            </div>
            <div class="list-text-h3 color999">
              <div class="text-left">
                做&nbsp;法&nbsp;:
              </div>
              <div class="text-right">
                <div class="displayBlock" v-for="(item, key) in detailsData.data.cookingMethod" :key="key">{{key + 1}}. {{item}}&nbsp;&nbsp;&nbsp;&nbsp;</div>
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
  .weui-article {
    padding: 0;
  }
  .list-text {
    padding: 0 15px;
    min-height: 80px;
  }
  .weui-article__h3,
  .list-image {
    width: 375px;
    height: 375px;
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
  .list-text-h1 {
    // text-align: center;
    font-weight: 700;
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 26px;
    div {
      display: inline-block;
    }
    .tag {
      font-size: 16px;
      font-weight: 400;
      color: #666;
    }
  }
  .list-text-h2 {
    font-size: 14px;
  }
  .list-text-h3 {
    position: relative;
    padding-left: 60px;
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 20px;
    min-height: 20px;
    .text-left {
      font-weight: 700;
      position: absolute;
      left: 0;
      top: 0;
    }
    .text-left ,
    .text-right {
      div {
        display: inline-block;
      }
    }
    .text-right {
      .right-box-span {
        border-bottom: 1px solid #ddd;
        width: 50%;
        padding-bottom: 6px;
        margin-bottom: 6px;
      }
      .displayBlock {
        display: block;
        margin-bottom: 20px;
      }
    }
  }
  // .list-text-h3.color333 {
  //   color: #555;
  //   font-weight: 700;
  // }
  // .list-text-h3.color666 {
  //   color: #666;
  //   font-weight: 700;
  // }
  // .list-text-h3.color999 {
  //   color: #666;
  // }
  .whiteSpaceNowrap {
    white-space:nowrap;
  }
</style>
