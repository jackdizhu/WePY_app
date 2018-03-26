import wepy from 'wepy'
import api from './api'
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
  if (res) {
    return res.data
  } else {
    wepy.showToast({
      title: '网络请求失败',
      icon: 'success',
      image: '../style/images/toast_info.png',
      duration: 1500
    })
    return 0
  }
}
export default { request }
