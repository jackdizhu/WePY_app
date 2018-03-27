import wepy from 'wepy'

const msg = (str) => {
  wepy.showToast({
    title: str || '数据异常请重试',
    icon: 'success',
    image: '../images/success.png',
    duration: 1500
  })
}
msg.err = (str) => {
  wepy.showToast({
    title: str || '数据异常请重试',
    icon: 'error',
    image: '../images/error.png',
    duration: 1500
  })
}

export default msg
