import * as type from './mutation-types'
const mutations = {
  [type.SET_MPVUEINFO](state, mpvueInfo) { // eslint-disable-line
    state.mpvueInfo = mpvueInfo
  },
  [type.SET_CHECKITEM](state, checkItem) { // eslint-disable-line
    state.checkItem = checkItem
  },
  [type.SET_CHECKCOOKINGTYPE](state, checkCookingType) { // eslint-disable-line
    state.checkCookingType = checkCookingType
  },
  [type.SET_COOKINGTYPE](state, cookingType) { // eslint-disable-line
    state.cookingType = cookingType
  },
  [type.SET_LISTDATA](state, listData) { // eslint-disable-line
    state.listData = listData
  },
  [type.SET_LISTRANDOMDATA](state, listRandomData) { // eslint-disable-line
    state.listRandomData = listRandomData
  }
}

export default mutations
