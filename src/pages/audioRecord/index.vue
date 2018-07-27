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
          <button class="weui-btn" type="primary" @click="start">开始录音</button>
          <button class="weui-btn" type="primary" @click="pause">暂停录音</button>
          <button class="weui-btn" type="primary" @click="stop">停止录音</button>
          <button class="weui-btn" type="primary" @click="play">播放录音</button>
          <button class="weui-btn" type="primary" @click="upload">上传录音</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: '',
      tempFilePath: '',
      videoContext: null,
      recorderManager: null
    }
  },
  methods: {
    //开始录音的时候
    start: function () {
      const options = {
        duration: 10000,//指定录音的时长，单位 ms
        sampleRate: 16000,//采样率
        numberOfChannels: 1,//录音通道数
        encodeBitRate: 96000,//编码码率
        format: 'mp3',//音频格式，有效值 aac/mp3
        frameSize: 50,//指定帧大小，单位 KB
      }
      //开始录音
      this.recorderManager && this.recorderManager.start(options)
      this.recorderManager && this.recorderManager.onStart(() => {
        console.log('recorder start')
      })
      //错误回调
      this.recorderManager && this.recorderManager.onError((res) => {
        console.log(res)
      })
    },
    //暂停录音
    pause: function () {
      this.recorderManager && this.recorderManager.onPause()
      console.log('暂停录音')
    },
    //停止录音
    stop: function () {
      this.recorderManager && this.recorderManager.stop()
      this.recorderManager && this.recorderManager.onStop((res) => {
        this.tempFilePath = res.tempFilePath
        console.log('停止录音', res.tempFilePath)
        const { tempFilePath } = res
      })
    },
    //播放声音
    play: function () {
      this.src = this.tempFilePath,
      this.bindPlay()
    },
    //上传录音
    upload: function () {
      wx.uploadFile({
        url: 'https://www.easy-mock.com/mock/5ab8bf9cca39d01d844c0bf7/test/test_post', // 演示域名、自行配置
        filePath: this.tempFilePath,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          userId: 12345678 // 附加信息为用户ID
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function (res) {
        }
      })
    },
    bindPlay: function () {
      this.audioContext && this.audioContext.play()
    },
    bindPause: function () {
      this.audioContext && this.audioContext.pause()
    }
  },
  onLoad() {
    //录音管理
    this.recorderManager = wx.getRecorderManager()

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
