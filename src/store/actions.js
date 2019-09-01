const actions = {
  // {commit} 解构赋值 直接获取属性方法
  save_mpvueInfo (con, mpvueInfo) {
    con.commit('SET_MPVUEINFO', mpvueInfo)
  },
  set_checkItem (con, checkItem) {
    con.commit('SET_CHECKITEM', checkItem)
  },
  set_checkCookingType (con, checkCookingType) {
    con.commit('SET_CHECKCOOKINGTYPE', checkCookingType)
  },
  set_cookingType (con, cookingType) {
    con.commit('SET_COOKINGTYPE', cookingType)
  },
  set_listData (con, listData) {
    con.commit('SET_LISTDATA', listData)
  },
  set_listRandomData (con, listRandomData) {
    con.commit('SET_LISTRANDOMDATA', listRandomData)
  }
}
export default actions
