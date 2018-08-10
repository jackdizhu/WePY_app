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
class App extends Vue {
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

export default App
