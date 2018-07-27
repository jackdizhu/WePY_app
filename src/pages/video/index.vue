<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">video</div>
      <div class="page__desc">视频组件控制</div>
    </div>
    <div class="page__bd">
      <div class="section tc">
        <div class="video-box">
          <video id="videoEleId" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"   enable-danmu danmu-btn controls></video>
        </div>
        <div class="weui-btn-area">
          <div class="weui-cell weui-cell_input weui-cell_videoText">
            <div class="weui-cell__hd">
              <div class="weui-label">弹幕</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" placeholder="请输入弹幕内容" v-model="text"/>
            </div>
          </div>
          <button class="weui-btn" type="primary" @click="bindSendDanmu">确定</button>
          <button class="weui-btn" type="primary" @click="bindPlay">播放</button>
          <button class="weui-btn" type="primary" @click="bindPause">暂停</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      videoContext: null
    }
  },
  methods: {
    getRandomColor () {
      let rgb = []
      for (let i = 0 ; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
      }
      return '#' + rgb.join('')
    },
    bindSendDanmu: function () {
      this.videoContext && this.videoContext.sendDanmu({
        text: this.text,
        color: this.getRandomColor()
      })
    },
    bindPlay: function () {
      this.videoContext && this.videoContext.play()
    },
    bindPause: function () {
      this.videoContext && this.videoContext.pause()
    }
  },
  onLoad() {
    this.videoContext = wx.createVideoContext('videoEleId')
  }
}
</script>

<style lang='less'>
  .weui-cell_videoText {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .video-box {
    text-align: center;
  }
</style>
