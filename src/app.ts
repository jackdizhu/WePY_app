import VueClass from '@/vueClass.ts'
import { Vue, Component } from 'vue-property-decorator'
const debug = require('debug')('log:App')

declare module "vue/types/vue" {
  interface Vue {
    $mp: any;
  }
}

// 必须使用装饰器的方式来指定components
@Component({
  mpType: 'app', // mpvue特定
}as any)
export default class App extends VueClass {
  onLoad() {
    console.log('app onLoad', 111)
  }
  // app hook
  onLaunch() {
    let opt = this.$root.$mp.appOptions
  }

  onShow() {
  }

  onHide() {
  }

  mounted() { // vue hook
  }
}
