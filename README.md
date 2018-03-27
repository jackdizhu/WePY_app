# WePY_app

初步完成多页面跳转, 数据共享,
``` sh
npm install wepy-cli -g
npm  i && wepy build --watch
```

# 小程序开发问题

``` js
export default { request } // 定义模块 export default [ es6 语法 ]
import { request } from '../com/request' // 引入 request === undefined
import http from '../com/request' // 改为 http.request
module.exports = { request } // 改为 module.exports [ commonjs 语法 ]

if (resJson[url]) {
  isShowLoading && wepy.hideLoading && wepy.hideLoading()
  resolve(resJson[url])
  return 0 // Promise resolve 执行后 后面代码会继续执行
}

// 异步函数中更新数据的时，必须手动调用$apply方法 手动触发 脏数据检查
this.$apply()
```

``` html
<view wx:for="{{checkboxItems}}" wx:key="value">
  <view wx:if="{{item.checked}}">{{item.name}}</view>
  <view wx:els>{{item.name}}</view>
</view>
```
``` js
// wx.showToast icon 只支持  success loading
// wepy.showToast image 定义 icon
wepy.showToast({
  title: str || '数据异常请重试',
  icon: 'error',
  image: '../images/error.png',
  duration: 1500
})
```

``` js
// issues 找不到crypto模块是因为你在代码中require了某些不能在小程序中使用的模块。
[Error] Error: 找不到模块: crypto
被依赖于: E:\jackdizhu\web\WePY_app\src\com\WXBizDataCrypt.js。
请尝试手动执行 npm install crypto 进行安装。
    at E:\jackdizhu\node\nvm\v8.9.0\node_modules\wepy-cli\lib\compile-script.js:98:31
    at String.replace (<anonymous>)
    at Object.resolveDeps (E:\jackdizhu\node\nvm\v8.9.0\node_modules\wepy-cli\lib\compile-script.js:46:21)
    at E:\jackdizhu\node\nvm\v8.9.0\node_modules\wepy-cli\lib\compile-script.js:270:27
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
    at Function.Module.runMain (module.js:678:11)
    at startup (bootstrap_node.js:187:16)
    at bootstrap_node.js:608:3
```

``` js
// wepy.config.js
// 处理框架 大量 log 排错难问题
let log = console.log
console.log = (msg) => {
  let _arrR = [
    /\[编译\]/g,
    /\[写入\]/g,
    /\[拷贝\]/g
  ]
  for (let i = 0; i < _arrR.length; i++) {
    let r = _arrR[i].test(msg)
    if (r) {
      return 0
    }
  }
  log(msg)
}
```
