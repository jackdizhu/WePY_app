# WePY_app

初步完成多页面跳转, 数据共享,
```
npm install wepy-cli -g
npm  i && wepy build --watch
```

# 小程序开发问题

export default { request } // 定义模块 export default
import { request } from '../com/request' // 引入 request === undefined
import http from '../com/request' // 改为 http.request
module.exports = { request } // 改为 module.exports

if (resJson[url]) {
  isShowLoading && wepy.hideLoading && wepy.hideLoading()
  resolve(resJson[url])
  return 0 // Promise resolve 执行后 后面代码会继续执行
}
