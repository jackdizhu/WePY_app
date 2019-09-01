import VueClass from '@/vueClass.ts'
import { Vue, Component } from 'vue-property-decorator'
import Mptoast from 'mptoast/index.vue'


const debug = require('debug')('log:Index')

declare module 'vue/types/vue' {
  interface Vue {
    $mptoast: any
  }
}

// 必须使用装饰器的方式来指定component
@Component({
  components: {
    Mptoast
  }
})
export default class Index extends VueClass {
  time: number = 120
  timeSetInterval: any = null
  timeTip: string = '获取验证码'
  form = {
    phone: '',
    phoneCode: '',
    date: '2015-09-01',
    isAgree: false
  }

  get_phoneCode () {
    // 倒计时 阶段 不触发
    if (this.timeSetInterval) {
      return false
    }
    // 验证手机号码
    let checkPhone = /^1[3-9][0-9]{9}$/.test(this.form.phone)
    let msg = ''
    if (!checkPhone) {
      msg = '请输入正确的手机号码'
      this.$mptoast(msg)
      return false
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // this.httpRequest.request({
    //   url: this.api.test_get,
    //   type: 'GET',
    //   params: {
    //     phone: this.form.phone
    //   }
    // })
    this.Api.test_get({
      phone: this.form.phone
    })
    .then(res => {
      wx.hideLoading()
      this.time = 120
      this.timeSetInterval = setInterval(() => {
        this.time--
        if (this.time <= 0) {
          this.timeTip = '获取验证码'
          clearInterval(this.timeSetInterval)
          this.timeSetInterval = null
        } else {
          this.timeTip = this.time + 's'
        }
      }, 1000)
    })
  }

  checkForm () {
    let checkPhone = /^1[3-9][0-9]{9}$/.test(this.form.phone)
    let checkPhoneCode = /^[0-9]{6}$/.test(this.form.phoneCode)
    let checkDate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(this.form.date)
    let checkIsAgree = this.form.isAgree
    let msg = ''
    if (!checkPhone) {
      msg = '请输入正确的手机号码'
    } else if (!checkPhoneCode) {
      msg = '请输入正确的手机验证码'
    } else if (!checkDate) {
      msg = '请输入正确的日期'
    } else if (!checkIsAgree) {
      msg = '请勾选用户协议'
    }
    // console.log(!!msg, 123456)
    if (msg) {
      this.$mptoast(msg)
      return false
    } else {
      return true
    }
  }

  bindDateChange(e: any) {
    this.form.date = e.mp.detail.value;
    console.log(e.mp.detail.value);
  }

  bindAgreeChange(e: any) {
    this.form.isAgree = !this.form.isAgree;
  }

  showTopTipsFun() {
    // 测试
    wx.navigateTo({
      url: '/pages/list/main'
    })
    return false
    // if (this.checkForm()) {
    //   wx.showLoading({
    //     title: '加载中',
    //     mask: true
    //   })
    //   // get 请求
    //   this.httpRequest.request({
    //     url: this.api.test_get,
    //     type: 'GET',
    //     params: this.form
    //   }).then(res => {
    //     console.log(res, 'this.$api.mock')
    //   })
    //   // post 请求
    //   this.httpRequest.request({
    //     url: this.api.test_post,
    //     type: 'POST',
    //     params: this.form
    //   }).then(res => {
    //     wx.hideLoading()
    //     wx.navigateTo({
    //       url: '/pages/list/main'
    //     })
    //     console.log(res, 'this.$api.mock')
    //   })
    // }
  }

  created() {
    // 执行一次
    console.log(this, 'page index created')
  }

  mounted() {
    console.log(this, 'mounted')
  }

  onLoad() {
    // 页面切换 会重新执行
    console.log(this, 'page index onLoad')
  }

  onShow() {
    console.log(this, 'onShow')
  }

  onUnload() {
    console.log(this, 'onUnload')
  }

  onHide() {
    console.log(this, 'onHide')
  }
}
