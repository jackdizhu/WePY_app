import wepy from 'wepy'
import api from './api'
// import resJson from './resJson'

const request = ({method, url, params, isShowLoading}) => {
  const _url = api[url] || ''
  console.log(_url)
  isShowLoading && wepy.showLoading && wepy.showLoading({title: '加载中...'})
  return new Promise((resolve, reject) => {
    // 拦截请求返回数据
    // if (resJson[url]) {
    //   isShowLoading && wepy.hideLoading && wepy.hideLoading()
    //   resolve(resJson[url])
    //   return 0
    // }

    wepy.request({
      url: _url,
      data: params,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json'
      },
      success: function (res) {
        // isShowLoading && wepy.hideLoading && wepy.hideLoading()
        console.log(res, 'res')

        if (res.data.success) {
          resolve(res.data.data)
        } else {
          reject(res.data.data)
        }
      },
      fail: function (err) {
        // 因为hide会让showToast隐藏
        isShowLoading && wepy.hideLoading && wepy.hideLoading()
        console.log(err, 'err')
        wepy.showToast({
          title: '网络请求失败',
          icon: 'success',
          image: '../style/images/toast_info.png',
          duration: 1500
        })
        reject(new Error('Network request failed'))
      },
      complete: function () {
      }
    })
  })
}
export default { request }
