import * as type from './mutation-types';
const mutations = {
  [type.SET_MPVUEINFO](state: any, mpvueInfo: any) { // eslint-disable-line
    state.mpvueInfo = mpvueInfo;
  },
  [type.SET_CHECKITEM](state: any, checkItem: any) { // eslint-disable-line
    state.checkItem = checkItem;
  },
  [type.SET_CHECKCOOKINGTYPE](state: any, checkCookingType: any) { // eslint-disable-line
    state.checkCookingType = checkCookingType;
  }
}

export default mutations;
