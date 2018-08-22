const pre = '/pages'
export const AppUrls = {
  INDEX: pre + '/index/main',
  COUNTER: pre + '/counter/main',
}
export function random (min: number, max: number): number {
  let R = Math.floor(Math.random() * (max - min)) + min
  return R
}
