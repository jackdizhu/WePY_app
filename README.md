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
