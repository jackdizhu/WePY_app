<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">scanCode</div>
      <div class="page__desc">调起客户端扫码界面，扫码成功后返回对应的结果</div>
    </div>
    <div class="page__bd">
      <div class="weui-btn-area">
        <button type="default" @click="open">open scanCode</button>
        <div class="page__desc">{{show}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: ''
    }
  },
  methods: {
    open() {
      // 允许从相机和相册扫码
      // wx.scanCode({
      //   success: (res) => {
      //     console.log(res)
      //   }
      // })

      // 只允许从相机扫码
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path
          console.log(this.show)

          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: (res) => {
          wx.showToast({
            title: '失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
