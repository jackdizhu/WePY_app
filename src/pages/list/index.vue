<template>
  <div class="page list-page">
    <div class="goods-sorts">
      <!-- <scroll-view class="goods-sorts_scroll" :scroll-y="true" @scroll="scrollViewScroll">
        <div class="ul-box">
          <div class="li-box" v-for="(item, key) in goodsSorts" :key="key" hover-class="li-box_active" @click="getGoodsList">{{item}}</div>
        </div>
      </scroll-view> -->
      <div class="ul-box">
        <div v-for="(item, key) in cookingType" :key="key"  @click="getGoodsList(item)">
          <div class="li-box li-box_active" v-if="checkGoodsSorts.value === item.value">
            {{item.name}}
          </div>
          <div class="li-box" hover-class="li-box_active" v-else>
            {{item.name}}
          </div>
        </div>
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
      <div class="page__title">菜谱 菜系菜单列表</div>
      <div class="page__desc">每个菜系10-20个菜, 每天更新一次</div>
      <div class="list-page_bd_box">
        <scroll-view v-if="listData.length" class="scroll-view-box weui-cells weui-cells_after-title" scroll-y @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" :scroll-into-view="toView" :scroll-top="scrollTop">
          <div @click="navigatorToDetails(item)" class="weui-cell weui-cell_access justify-start" hover-class="weui-cell_active" v-for="(item, key) in listData" :key="key">
            <div class="weui-cell__hd">
              <image :src="item.img" class="list-image"></image>
            </div>
            <div class="weui-cell__bd list-text">
              <div class="list-text-h1">{{item.name}}</div>
              <div class="list-text-h2">好评{{item.praise}} 评价{{item.evaluate}}</div>
              <!-- <div class="list-text-h3 flex">
                <div class="text-left flex-1">
                  <div>￥{{item.price}}起送</div><div>|</div><div>配送费￥{{item.distribution}}</div>
                </div>
                <div class="text-right">
                  <div>{{item.distance}}</div><div>|</div><div>{{item.time}}</div>
                </div>
              </div> -->
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>
<!--必须指定为ts-->
<script lang="ts" src="./index.ts">
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
    padding-left: 80px;
    height: 100%;
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
      // color: #D2B48C;
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
