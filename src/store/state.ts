interface State {
  mpvueInfo?: string,
  checkCookingType: any,
  checkItem?: any,
  listData?: any, // 分类列表
  listRandomData?: any // 随机推荐列表
}

const state: State = {
  mpvueInfo: '基于 Vue.js 的小程序开发框架，从底层支持 Vue.js 语法和构建工具体系。',
  checkCookingType: {},
  checkItem: {},
  listData: {},
  listRandomData: {}
}

export default state
