const pre = '/pages'
export const AppUrls = {
  INDEX: pre + '/index/main',
  COUNTER: pre + '/counter/main',
}

export const ImgUrl = 'http://7xrqzz.com1.z0.glb.clouddn.com/'

export function ImgUrlChange (str) {
  // let arr2 = str.split('/')
  // let name = arr2[arr2.length - 1]
  // return ImgUrl + name
  return str
}

export function random (min: number, max: number): number {
  let R = Math.floor(Math.random() * (max - min)) + min
  return R
}
