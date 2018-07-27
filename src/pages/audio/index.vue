<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">audio</div>
      <div class="page__desc">音频组件控制</div>
    </div>
    <div class="page__bd">
      <div class="section tc">
        <audio :src="src" id="audioEleId" ></audio>
        <div class="weui-btn-area">
          <button class="weui-btn" type="primary" @click="bindPlay">播放</button>
          <button class="weui-btn" type="primary" @click="bindPause">暂停</button>
          <button class="weui-btn" type="primary" @click="bindAudioStart14">设置开始播放时间14秒</button>
          <button class="weui-btn" type="primary" @click="bindAudioStart">回到开头</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      text: '',
      videoContext: null
    }
  },
  methods: {
    bindAudioStart14: function () {
      this.audioContext && this.audioContext.seek(14)
    },
    bindAudioStart: function () {
      this.audioContext && this.audioContext.seek(0)
    },
    bindPlay: function () {
      this.audioContext && this.audioContext.play()
    },
    bindPause: function () {
      this.audioContext && this.audioContext.pause()
    }
  },
  onLoad() {
    this.audioContext = wx.createAudioContext('audioEleId')
  }
}
</script>

<style lang='less'>
  .weui-cell_videoText {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
</style>
