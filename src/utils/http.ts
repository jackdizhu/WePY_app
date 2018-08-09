// import Fly from 'flyio/dist/npm/wx'
let Fly = require('flyio/dist/npm/wx')

let fly = new Fly()
// import https from 'https'
fly.config.timeout = 1000 * 60 * 60
fly.config.baseURL = 'https://www.easy-mock.com/mock/5ab8bf9cca39d01d844c0bf7/test'
// fly.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// fly.defaults.withCredentials = true // 带cookie 请求
// fly.defaults.httpsAgent = new https.Agent({
//   rejectUnauthorized: false
// })

var qs = require('qs')

// 定义 request 方法参数结构
interface RequestParams {
  url: string,
  type: 'GET'|'POST',
  params: any,
  baseURL?: string
}

export default class httpRequest {
  /**
   * get 请求方法
   * @param url
   * @param params
   * @returns {Promise}
   */
  get (url: string, params = {}) {
    return new Promise((resolve, reject) => {
      fly.get(url, params).then((res: any) => {
        resolve(res)
      }, (err: any) => {
        reject(err)
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  /**
   * post 请求方法
   * @param url
   * @param data
   * @returns {Promise}
   */
  post (url: string, data = {}) {
    return new Promise((resolve, reject) => {
      fly.post(url, qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).then((res: any) => {
        resolve(res)
      }, (err: any) => {
        reject(err)
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  /**
   * request 请求方法
   * @param obj {  url, params, type }
   * @returns {Promise}
   */
  request (obj: RequestParams) {
    let { url, params, type, baseURL } = obj
    baseURL !== undefined && (fly.defaults.baseURL = baseURL)
    return new Promise((resolve, reject) => {
      let fn: any = null
      if (type === 'POST') {
        fn = this.post
      } else {
        fn = this.get
      }
      fn(url, params).then(function (res: any) {
        let data = res.data || {}
        resolve(data)
      }).catch(err => {
        let status = (err.response && err.response.status) || 0
        console.log(status, 'request catch err')
        resolve({ code: status, err: 'requestErr' })
        // reject(err) // 返回错误
      })
    })
  }

  /*
    this.$requestAll([
      this.$request({
        url: this.$api.mock,
        type: 'GET',
        params: {}
      }),
      this.$request({
        url: this.$api.mock,
        type: 'POST',
        params: {}
      })
    ]).then((arg) => {
      console.log(arg, '--requestAll--')
    })
   */
  requestAll (_requestArr: any[]) {
    return new Promise((resolve, reject) => {
      fly.all(_requestArr)
      .then(fly.spread(function (...params: any[]) {
        resolve(params)
      })).catch((err: any) => {
        console.log(err, 'requestAll catch err')
        resolve({ err: 'requestErr' })
        // reject(err) // 返回错误
      })
    })
  }
}
