<template>
  <div class="page list-page">
    <div class="page__hd list-page_hd">
      <div class="page__title">菜谱 随机推荐列表</div>
      <div class="page__desc">每个菜系推荐一个, 每天更新一次</div>
      <div class="list-page_bd_box">
        <scroll-view v-if="listData.length" class="scroll-view-box weui-cells weui-cells_after-title" scroll-y @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" :scroll-into-view="toView" :scroll-top="scrollTop">
          <div @click="navigatorToDetails(item)" class="weui-cell weui-cell_access justify-start" hover-class="weui-cell_active" v-for="(item, key) in listData" :key="key">
            <div class="weui-cell__hd">
              <image :src="item.img" class="list-image"></image>
            </div>
            <div class="weui-cell__bd list-text">
              <div class="list-text-h1">
                <div class="name">{{item.name}}</div>
                <div class="typeName">{{item.typeName}}</div>
              </div>
              <div class="list-text-h2">好评{{item.praise}} 评价{{item.evaluate}}</div>
            </div>
          </div>

          <div @click="navigatorToList()" class="weui-cell weui-cell_access justify-start" hover-class="weui-cell_active">
            <div class="weui-cell__hd">
              <image :src="defImg" class="list-image"></image>
            </div>
            <div class="weui-cell__bd list-text">
              <div class="list-text-h1">查看更多 . . .</div>
              <div class="list-text-h2">好评100% 评价999</div>
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
    position: relative;
    font-size: 16px;
    .typeName {
      position: absolute;
      right: 0;
      top: 0;
      color: #B8860B;
    }
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
