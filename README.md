# mpvue_weui

* 使用[mpvue-weui](https://github.com/KuangPF/mpvue-weui)框架开发的项目 初步熟悉 mpvue 框架 及 weui 框架
* ts 版本部署问题 (Vue.mixin onUnload 等报错)

```
npm i vue-property-decorator@7.0.0 awesome-typescript-loader@4.0.1 typescript@2.7.2 --save
webpack.base.conf.js
{
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [
    'babel-loader',
    {
      loader: 'mpvue-loader',
      options: {
        checkMPEntry: true
      }
    },
    {
      loader: 'awesome-typescript-loader',
      options: {
        useCache: true,
      }
    }
  ]
}
tsconfig.json
"types": [
  "tencent-wx-app"
]

.d.ts 定义
declare namespace wx {
	interface SystemInfo {
		model: string;
		version: string
	}
	function getSystemInfo(options: any): void;
}

// import App from './App.vue'
const App = require('./App.vue').default

onUnload?(): void;
onShareAppMessage?(options: any): any;

vue-loader.conf.js
loaders: Object.assign(utils.cssLoaders({
  sourceMap: isProduction
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap,
  extract: isProduction
}), {
  ts: [
    'babel-loader',
    {
      // loader: 'ts-loader',
      loader: 'awesome-typescript-loader',
      options: {
        useCache: true,
      }
    }
  ]
})

Child process failed to process the request:  TypeError: Cannot read property 'externalModuleIndicator' of undefined
因mpvue-loader 问题 .vue 中ts代码需提取至单独文件

// vue-shim.d 文件定义无效 需要在vue组件 .ts文件中定义
declare module 'vue/types/vue' {
  interface Vue {
    $mptoast: any
  }
}
// 'Promise' only refers to a type, but is being used as a value here
// tsconfig.json compilerOptions
"lib": [
  "es2015",
  "dom",
  "dom.iterable",
  "scripthost"
]

// vuex 调用方式
// 在 page 页面重新引入  import store from '@/store/index'
// getters
store.getters.get_checkItem_id
// state
store.state.checkItem
// actions
store.dispatch('set_checkItem', item)
// mutations
store.commit('SET_CHECKITEM', item)

npm upgrade mpvue@latest mpvue-loader@latest mpvue-template-compiler@latest mpvue-webpack-target@latest
```

```
表单
button: 按钮
list: 列表
input: 输入
slider: 滑块
uploader: 文件上传
组件
article: 文章
badage: badge 徽章
flex: flex
footer: 页脚
gallery: 幻灯片播放
grid: 九宫格
icons: 图标
loadermore: 加载更多
panel: 图文组合列表
preview: 表单预览
progress: 进度条
swiper: 轮播图
操作反馈
actionsheet: 操作按钮组
dialog: 对话框
msg: 结果页
picker: 选择器
toast: 提示信息
导航相关
navbar: 导航栏
tabbar: 底部导航
搜索相关
search: 搜索

/*
  默认
  按下
  禁用
*/
.green-theme {
  color: #1AAD19;
  color: #179B16;
  color: #9ED99D;
}
.red-theme {
  color: #E64340;
  color: #CE3C39;
  color: #EC8B89;
}
```

```
问题记录
增加 less 支持
npm i less-loader less --save-dev
css 问题
  不支持 rgba
  行内样式 px 无法转换 rpx (不要使用行内样式 使用 class 代替)

html 问题
  scroll-view 数据超过40条时 新增数据后滚动条会置到顶部
    配置 enablePullDownRefresh: true 绑定 onReachBottom 代替
```
