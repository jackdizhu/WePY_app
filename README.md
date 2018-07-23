# WePY_app

初步完成多页面跳转, 数据共享,
``` sh
npm install wepy-cli -g
npm  i && wepy build --watch
```

# 小程序项目

![扫一扫 使用微信小程序](./statics/gh_f498d6f2e269_344.jpg)

* nearby 基于高德地图api WePY 框架 周边生活导航 小程序
* dev 基于weui 框架 debug_app 的小程序版本

# 小程序开发问题

## 模块引入问题 及 数据更新问题

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

// 打开新页面
wepy.navigateTo({
  url: 'poi'
})
// 重定向
wepy.redirectTo({
  url: 'poi'
})
// 异步函数中更新数据的时，必须手动调用$apply方法 手动触发 脏数据检查
this.$apply()
```

## 组件使用问题

``` html
<!-- bindInput 定义为 async 异步方法 会导致 input 内容为 undefined -->
<input @input="bindInput" type="text" placeholder="搜索" focus="true" />
<!-- 定义css 仅在当前组件生效 -->
<style lang="less" scoped>
</style>
```

## 页面数据共享问题

``` js
// Gloabal 对象或 Storage 数据共享
wepy.setStorageSync(USER_INFO, obj)
wepy.getStorageSync(USER_INFO)
```

## 数据遍历 if else 判断

``` html
<view wx:for="{{checkboxItems}}" wx:key="value">
  <view wx:if="{{item.checked}}">{{item.name}}</view>
  <view wx:else>{{item.name}}</view>
</view>
```
## rpx可以根据屏幕宽度进行自适应

设备	rpx换算px (屏幕宽度/750)	px换算rpx (750/屏幕宽度)
iPhone5	1rpx = 0.42px	1px = 2.34rpx
iPhone6	1rpx = 0.5px	1px = 2rpx
iPhone6s	1rpx = 0.552px	1px = 1.81rpx
``` css
form {
  width: 100%;
}
```
## wx.showToast icon 只支持  success loading

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

## 报错找不到模块问题

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

## 开发环境错误调试处理

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

```
问题记录
增加 less 支持
npm i less-loader less --save-dev
css
  不支持 rgba
```

## 小程序开发 问题整理收集
```
http://www.henkuai.com/forum.php?mod=viewthread&tid=36854

1、height:auto; 失效，必须指定 image 的高度为具体数值,不然高度为0。

2、真机和模拟器的问题总结
	input 标签中设置为 value 属性，缩进样式text-indent在模拟器中失效，在真机中正常运行。placeholder无此现象
	测试过程中，域名为http格式的请求，在模拟器下可以正常运行，在真机中必须打开调试才能看到效果
	设置视频暂停，分享后继续播放时，会出现模拟器视频需再次分享才能继续播放，而真机可以继续播放
	由于video组件调用的是客户端创建的原生组件，它的层级是最高的，模拟器中不会出现这个问题，而真机中会覆盖其他的内容
	video组件的播放控件，当设置为false时，模拟器中还会显示，而真机中会隐藏

3、input组件设置text-indent，在没有获取焦点的时候是有效果的，但是在获取焦点时会失去缩进的效果，
	所以喜欢用text-indent的同学们就换换口味吧，用padding实现缩进吧

4、input组件用rgba设置背景色透明透明度0.7，加padding会出现色差，改用opacity解决

5、下拉刷新不能和scroll-view组件共同使用，想要实现既可以下拉刷新又可以下滑加载，需要换成view组件，
	并且将onScrollLower函数改为onReachBottom

6、小程序上线，域名必须采用https和SSL证书，部分小程序的服务类目，域名必须在ICP备案，否则审核不通过

7、小程序相互之间可以跳转的前提是必须关联在同一个公众号下，需要设置envVersion: 'release'，release为线上版本

8、跳转到带有tabBar的页面，必须使用switchTab，否则无法实现跳转

9、小程序中的图片要用绝对路径，否则无法显示

10、快速创建项目文件夹的方式：在app.json文件中直接配置路径即可

11、wxss编译错误：在控制台输入openVendor()，清除里面的wcsc/wcsc.exe 然后重启工具

12、如何获取 openId, sessionKey, unionId?
在 [app.js] 中 wx.login中 发送 res.code 到后台换取openId, sessionKey,unionId

13、小程序中target和currentTarget有什么区别
	target指的是当前点击的组件 和currentTarget指的是事件捕获的组件

14、模板的定义和使用
	使用 name 属性，作为模板的名字
	使用 is属性，声明需要的使用的模板，然后将模板所需要的 data传入

15、小程序的长度单位
	小程序的长度单位为rpx，按照iphone6的来计算，1rpx=0.5px=1物理像素

16、在页面中引入模板的wxss文件，采用@import引入，且需要以;结尾，否则会出错

17、bindTap是不会阻止冒泡到父级，而catchTap可以阻止进行事件冒泡  

18、data-aaa 这样设置的值可以用event.target.dataset.aaa进行获取

19、所有组件的所有属性均可以采用 插值表达式 + 三目运算符进行赋值

20、除了采用三目运算符进行判断，也可用使用wx:if和wx:else配合实现

21、获取app.js中的字段或数据，采用getApp()可以实现

22、可以将一些公共的函数封装在一个js中，通过require的方式引入当前的js文件中

23、编写复用的模板时，从最小的模板开始编写，由小到大，使用时，wxml和wxss必须引入到当前的页面

24、wx.previewImage({urls: [src], //需要预览的http链接列表 current: src //当前显示图片的http链接})全屏预览图片

25、小程序不需要写保存图片的方法，默认长按可以保存图片

26、遇到 this.data 给变量赋值没有效果，改用this.setData({})
	一般setData方法多用于点击后改变页面信息或者刷新后与后台交互获取最新的信息
	直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致
	单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据

27、当需要使用template模板 + wx-for动态添加数据时，因为template模板中已经传入一个data属性，
	所以逻辑层的字段无法传到视图层，如果需要，不要使用template，直接在当前页面中进行循环

```
