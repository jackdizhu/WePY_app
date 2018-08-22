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
  },
  set_listData(con: {
    commit: any,
    state: any
  }, listData: any) {
    con.commit('SET_LISTDATA', listData)
  },
  set_listRandomData(con: {
    commit: any,
    state: any
  }, listRandomData: any) {
    con.commit('SET_LISTRANDOMDATA', listRandomData)
  }
}

export default actions;
