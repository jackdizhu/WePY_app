<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">mpvue weui demo</div>
      <div class="page__desc">手机号码登录</div>
    </div>

    <div class="page__bd">
      <div class="weui-cells__title">表单</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">手机号</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入手机号" v-model="form.phone"/>
          </div>
          <div class="weui-cell__ft">
            <div class="weui-vcode-btn">获取验证码</div>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">日期</div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="date" value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
              <div class="weui-input">{{form.date}}</div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">验证码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入验证码" v-model="form.phoneCode"/>
          </div>
          <!-- <div class="weui-cell__ft">
            <image class="weui-vcode-img" src="/static/images/vcode.jpg" style="width: 108px"></image>
          </div> -->
        </div>
      </div>

      <checkbox-group @click="bindAgreeChange">
        <label class="weui-agree" for="weuiAgree">
          <div class="weui-agree__text">
            <checkbox class="weui-agree__checkbox" id="weuiAgree" value="agree" checked="isAgree" />
            <div class="weui-agree__checkbox-icon">
              <icon class="weui-agree__checkbox-icon-check" type="success_no_circle" size="9" v-if="form.isAgree"></icon>
            </div>
            阅读并同意
            <navigator url="" class="weui-agree__link">《用户协议》</navigator>
          </div>
        </label>
      </checkbox-group>

      <div class="weui-btn-area">
        <button class="weui-btn" type="primary" @click="showTopTipsFun">确定</button>
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
      form: {
        phone: '',
        phoneCode: '',
        date: '2015-09-01',
        isAgree: false
      }
    }
  },
  methods: {
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
      if (msg) {
        this.$mptoast(msg)
        return false
      } else {
        return true
      }
    },
    bindDateChange(e) {
      this.form.date = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    bindAgreeChange(e) {
      this.form.isAgree = !this.form.isAgree;
    },
    showTopTipsFun() {
      if (this.checkForm()) {
        this.showTopTips = true;
        setTimeout(() => {
          this.showTopTips = false;
        }, 2000)
      }
    }
  }
}
</script>

<style>

</style>
