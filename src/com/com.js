import wepy from 'wepy'

const msg = (str) => {
  wepy.showToast({
    title: str || '数据异常请重试',
    icon: 'success',
    image: '../style/images/toast_info.png',
    duration: 1500
  })
}

export default msg
