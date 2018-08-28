<template>
  <div class="page page-home">
    <div class="btn-box flex items-center content-center justify-center">
      <p>此功能需要授权获取用户信息</p>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">确定</button>
    </div>
    <mptoast />
  </div>
</template>
<!--必须指定为ts-->
<script lang="ts" src="./index.ts">
</script>


<style lang='less'>
  .page-home{
    .btn-box{
      width: 375px;
      height: 375px;
      p{
        width: 100%;
        line-height: 26px;
        text-align: center;
      }
    }
  }
</style>
