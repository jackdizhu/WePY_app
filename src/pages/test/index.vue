<template>
  <div class="page test-page">
    <div class="connent test-page-con">
      <div class="test-box boxSizing_borderBox">
        test
        <div class="test-box1 boxSizing_borderBox">
          test
        </div>
      </div>
    </div>
    <mptoast />
  </div>
</template>

<script>
import mptoast from 'mptoast'
export default {
  components: {
    mptoast
  },
  data() {
    return {
    }
  },
  methods: {
    checkForm () {
      this.$mptoast('msg')
    }
  },
  created() {
    // 执行一次
    console.log(this, 'page index created')
  },
  mounted() {
    console.log(this, 'mounted')
  },
  onLoad() {
    // 页面切换 会重新执行
    console.log(this, 'page index onLoad')
  },
  onShow() {
    console.log(this, 'onShow')
  },
  onUnload() {
    console.log(this, 'onUnload')
  },
  onHide() {
    console.log(this, 'onHide')
  }
}
</script>

<style lang='less'>
  page {
    height: 100%;
    .test-page {
      height: 100%;
      padding-top: 40px;
      .test-box {
        width: 100%;
        height: 100%;
        padding: 20px 10px;
        .test-box1 {
          width: 200px;
          height: 200px;
          padding: 40px 20px;
          margin: 0 auto;
        }
      }
    }
  }
</style>
