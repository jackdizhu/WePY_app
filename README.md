# WePY_app

初步完成多页面跳转, 数据共享,
``` sh
npm install wepy-cli -g
npm  i && wepy build --watch
```

# 小程序项目

<img src="./statics/gh_f498d6f2e269_344.jpg" width="260px" alt="扫一扫 使用微信小程序" onclick="alert('111')"/>

<img src="./statics/gh_f498d6f2e269_344.jpg" width="260px" alt="扫一扫 使用微信小程序"/><img src="./statics/gh_5b44397ecf47_344.jpg" width="260px" alt="扫一扫 使用微信小程序"/>

* nearby 基于高德地图api WePY 框架 周边生活导航 小程序
* dev 基于weui 框架 debug_app 的小程序版本
* dev_mpvue_weui 基于 mpvue weui 框架 菜谱点餐小程序

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
css 问题
  不支持 rgba
  行内样式 px 无法转换 rpx (不要使用行内样式 使用 class 代替)
  盒子模型处理 默认 w3c 盒子模型 (100% + padding 布局问题)
  .boxSizing_borderBox {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

html 问题
  scroll-view 数据超过40条时 新增数据后滚动条会置到顶部
    配置 enablePullDownRefresh: true 绑定 onReachBottom 代替
  不支持 :class (:class="'li-box' + checkGoodsSorts.value === item.value ? 'li-box_active' : ''")
    使用 v-if v-else 代替
    <div class="li-box li-box_active" v-if="checkGoodsSorts.value === item.value">
      {{item.name}}
    </div>
    <div class="li-box" hover-class="li-box_active" v-else>
      {{item.name}}
    </div>

调用微信扫码 ( mpvue_weui 分支 )
  scanCode/index.vue
    wx.scanCode 调用摄像头 扫描条形码 二维码

图片音视频 录制上传 ( mpvue_weui 分支 )
  uploader/index.vue
    wx.chooseImage (拍摄)图片上传
    wx.chooseVideo (拍摄)视频上传
  audioRecord/index.vue
    wx.getRecorderManager() 录制音频上传
```

## 小程序开发 问题整理收集
```
https://blog.csdn.net/cx091/article/details/78952648

1. 强制要求请求全部为https！

2. 小程序生命周期的函数内部对象要就改成var that=this;防止被替换。

3. view不识别\n但是text可以。

4. 没有dom!没有dom!没有dom!,绑定数据,控制显示和隐藏全部用data来修改，就是this.setData({})

5. 跳转现在（2018）小程序支持十层

6. 微信小程序中原生组件层级最高，比如map,canvas,swiper,只能使用cover-view,cover-image,
	其中cover-view很多样式都不支持，而且支持点击事件bindtap,还有各种bug。
	（问题引用：当使用display:none;做隐藏的时候，其内容文字会出现在屏幕右上角，
	建议使用 wx:if=”false”或position:absolute;left:-1000rpx;这种方式做隐藏。
	border不支持单边，不支持padding的使用，在安卓端会出现padding消失的问题。）

7. 在小程序中当有两个元素同时发生变化时，会出现冲突，导致其中一个变化，而另一个不做变化，
	所以要使用setTimeout方法避免元素同时出现变化。

8. 在开发者工具中执行先执行aap.js然后执行其他js文件，但在手机上app.js和其他js是同时执行的；

9. 很多原生组件都有定高，只能使用微信提供的rpx来修改！

10. 小程序是单向绑定和vue不同，修改数据只能从setData来修改

11. 本地资源无法通过 css 获取，只能通过网络或者使用image标签

12. cover-view放弃padding, 用min-width + text-align + height + line-height

13. bindtap和catchtap的区别: bind 不会阻止冒泡，catch 可以阻止冒泡


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

## mpvue 框架开发问题

```
一、实例生命周期

除了Vue本身的生命周期处，mpvue还兼容了小程序的生命周期,除特殊情况外，不建议使用小程序的生命周期钩子。

app 部分：
•onLaunch，初始化
•onShow，当小程序启动，或从后台进入前台显示
•onHide，当小程序从前台进入后台

page 部分：
•onLoad，监听页面加载
•onShow，监听页面显示
•onReady，监听页面初次渲染完成
•onHide，监听页面隐藏
•onUnload，监听页面卸载
•onPullDownRefresh，监听用户下拉动作
•onReachBottom，页面上拉触底事件的处理函数
•onShareAppMessage，用户点击右上角分享
•onPageScroll，页面滚动
•onTabItemTap, 当前是 tab 页时，点击 tab 时触发 （mpvue 0.0.16 支持）

new Vue({
 data: {
  a: 1
 },
 created () {
  // `this` 指向 vm 实例
  console.log('a is: ' + this.a)
 },
 onShow () {
  // `this` 指向 vm 实例
  console.log('a is: ' + this.a, '小程序触发的 onshow')
 }
})

注意点：
•不要在选项属性或回调上使用箭头函数，比如 created: () => console.log(this.a)
	或vm.$watch('a', newValue => this.myMethod())。因为箭头函数是和父级上下文绑定在一起的，
	this不会是如你做预期的 Vue 实例，且 this.a 或 this.myMethod 也会是未定义的。
•微信小程序的页面的 query 参数是通过 onLoad 获取的，mpvue 对此进行了优化，
	直接通过this.$root.$mp.query 获取相应的参数数据，其调用需要在 onLoad 生命周期触发之后使用，比如 onShow 等


二、模板语法

不支持 纯-HTML
	小程序里所有的 BOM／DOM 都不能用，也就是说 v-html 指令不能用。

不支持部分复杂的 JavaScript 渲染表达式
	我们会把 template 中的 {{}} 双花括号的部分，直接编码到 wxml 文件中，由于微信小程序的能力限制(数据绑定)，
	所以无法支持复杂的 JavaScript 表达式。
	目前可以使用的有 + - * % ?: ! == === > < [] .，剩下的还待完善。

不支持过滤器
	渲染部分会转成 wxml ，wxml 不支持过滤器，所以这部分功能不支持。

不支持函数

不支持在 template 内使用 methods 中的函数。

列表渲染

	全支持 官方文档：列表渲染
	只是需要注意一点，嵌套列表渲染，必须指定不同的索引！
	<!-- 在这种嵌套循环的时候， index 和 itemIndex 这种索引是必须指定，且别名不能相同，正确的写法如下 -->
	<template>
	  <ul v-for="(card, index) in list">
	    <li v-for="(item, itemIndex) in card">
	      {{item.value}}
	    </li>
	  </ul>
	</template>

事件处理器
	在 input 和 textarea 中 change 事件会被转为 blur 事件。

踩坑注意：
	列表中没有的原生事件也可以使用例如 bindregionchange 事件直接在 dom 上将bind改为@
	 @regionchange,同时这个事件也非常特殊，它的 event type 有 begin 和 end
	两个，导致我们无法在handleProxy 中区分到底是什么事件，所以你在监听此类事件的时候同时监听事件名和事件类型既
	<map @regionchange="functionName" @end="functionName" @begin="functionName"><map>
	小程序能力所致，bind 和 catch 事件同时绑定时候，只会触发 bind ,catch 不会被触发，要避免踩坑。

事件修饰符
	.stop 的使用会阻止冒泡，但是同时绑定了一个非冒泡事件，会导致该元素上的 catchEventName 失效！
	.prevent 可以直接干掉，因为小程序里没有什么默认事件，比如submit并不会跳转页面
	.capture 支持 1.0.9
	.self 没有可以判断的标识
	.once 也不能做，因为小程序没有 removeEventListener, 虽然可以直接在 handleProxy 中处理，
	但非常的不优雅，违背了原意，暂不考虑
	其他 键值修饰符 等在小程序中压根没键盘，所以。。。


三、组件

有且只能使用单文件组件（.vue 组件）的形式进行支持。其他的诸如：
动态组件，自定义 render，和<script type="text/x-template"> 字符串模版等都不支持。
原因很简单，因为我们要预编译出 wxml。

详细的不支持列表：
	•暂不支持在组件引用时，在组件上定义 click 等原生事件、v-show（可用 v-if 代替）和 class style 等样式属性
	(例：<card class="class-name"> </card> 样式是不会生效的)，因为编译到wxml，
	小程序不会生成节点，建议写在内部顶级元素上。
	•Slot（scoped 暂时还没做支持）
	•动态组件
	•异步组件
	•inline-template
	•X-Templates
	•keep-alive
	•transition
	•class
	•style

小程序组件
	mpvue 可以支持小程序的原生组件，比如： picker,map 等，需要注意的是原生组件上的事件绑定，
	需要以 vue 的事件绑定语法来绑定，如 bindchange="eventName" 事件，需要写成 @change="eventName"
	<picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
	  <view class="picker">
	   当前选择: {{date}}
	  </view>
	</picker>


四、常见问题

1. 如何获取小程序在 page onLoad 时候传递的 options
	在所有 页面 的组件内可以通过 this.$root.$mp.query 进行获取。

2. 如何获取小程序在 app onLaunch/onShow 时候传递的 options
	在所有的组件内可以通过 this.$root.$mp.appOptions 进行获取。

3. 如何捕获 app 的 onError
	由于 onError 并不是完整意义的生命周期，所以只提供一个捕获错误的方法，
	在 app 的根组件上添加名为 onError 的回调函数即可。如下：
	export default {
	  // 只有 app 才会有 onLaunch 的生命周期
	  onLaunch () {
	    // ...
	  },

	  // 捕获 app error
	  onError (err) {
	    console.log(err)
	  }
	}

五、issues

https://github.com/Meituan-Dianping/mpvue/issues/140
同一路由切换时，上一次的页面数据会保留
	通过 mixin 混入 onUnload 方法, 然后在里面写 Object.assign(this.$data, this.$options.data())
	// 定义插件
	const somePlugin = {
	  install: function () {
	    Vue.mixin({
	      onUnload() {
	        if (this.$options.data) {
	            Object.assign(this.$data, this.$options.data())
	        }
	      }
	    })
	  }
	}
	// 使用插件
	Vue.use(somePlugin)
```
