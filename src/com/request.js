import wepy from 'wepy'
import api from './api'
import msg from './com'
// import resJson from './resJson'

const request = async ({method, url, params, isShowLoading}) => {
  const _url = api[url] || ''
  isShowLoading && wepy.showLoading && wepy.showLoading({title: '加载中...'})
  // 拦截请求返回数据
  // if (resJson[url]) {
  //   isShowLoading && wepy.hideLoading && wepy.hideLoading()
  //   resolve(resJson[url])
  //   return 0
  // }
  console.log('---> wepy.request')

  let res = await wepy.request({
    url: _url,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'Content-Type': method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json'
    }
  })
  isShowLoading && wepy.hideLoading && wepy.hideLoading()
  // console.log(res, 'res')
  if (res && res.data.res_code === '0') {
    return res.data
  } else {
    msg.err('网络或数据异常')
    return 0
  }
}

// // test_get
// http.request({
//   method: 'GET',
//   url: 'test_get',
//   params: _obj,
//   isShowLoading: true
// })

// // test_post
// http.request({
//   method: 'POST',
//   url: 'test_post',
//   params: _obj,
//   isShowLoading: true
// })

export default { request }
