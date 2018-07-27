# mpvue_weui

* 使用[mpvue-weui](https://github.com/KuangPF/mpvue-weui)框架开发的项目 初步熟悉 mpvue 框架 及 weui 框架

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
  盒子模型处理 默认 w3c 盒子模型 (100% + padding 布局问题)
  .boxSizing_borderBox {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

html 问题
  scroll-view 数据超过40条时 新增数据后滚动条会置到顶部
    配置 enablePullDownRefresh: true 绑定 onReachBottom 代替

图片音视频 录制上传
  uploader/index.vue
    wx.chooseImage (拍摄)图片上传
    wx.chooseVideo (拍摄)视频上传
  audioRecord/index.vue
    wx.getRecorderManager() 录制音频上传
```
