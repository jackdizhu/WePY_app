import Vue from 'vue'
import App from './App'
import './css/app.css'
import store from './store';
Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.$store = store;
import '../static/weui/weui.css'
import '../static/weui/weui_theme.less'
const app = new Vue({
  App
})
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      '^pages/index/index',
      'pages/list/list'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'weui for mpvue',
      navigationBarTextStyle: 'black'
    }
  }
}
