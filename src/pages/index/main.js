import Vue from 'vue'
import App from './index'

import mpvueToastRegistry from 'mptoast/registry'
mpvueToastRegistry(Vue)

const app = new Vue(App)
app.$mount()
