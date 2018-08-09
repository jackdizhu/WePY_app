<template>
  <div class="page list-page">
    <div class="goods-sorts">
      <!-- <scroll-view class="goods-sorts_scroll" :scroll-y="true" @scroll="scrollViewScroll">
        <div class="ul-box">
          <div class="li-box" v-for="(item, key) in goodsSorts" :key="key" hover-class="li-box_active" @click="getGoodsList">{{item}}</div>
        </div>
      </scroll-view> -->
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
<!--必须指定为ts-->
<script lang="ts" src="./index.ts">
</script>


<style>
  .counter-warp {
    text-align: center;
    margin-top: 100px;
  }

  .home {
    display: inline-block;
    margin: 100px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }

</style>
