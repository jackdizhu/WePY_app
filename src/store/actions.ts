const actions = {
  // {commit} 解构赋值 直接获取属性方法
  save_mpvueInfo(con: {
    commit: any,
    state: any
  }, mpvueInfo: any) {
    con.commit('SET_MPVUEINFO', mpvueInfo)
  },
  set_checkItem(con: {
    commit: any,
    state: any
  }, checkItem: any) {
    con.commit('SET_CHECKITEM', checkItem)
  },
  set_checkCookingType(con: {
    commit: any,
    state: any
  }, checkCookingType: any) {
    con.commit('SET_CHECKCOOKINGTYPE', checkCookingType)
  }
}

export default actions;
