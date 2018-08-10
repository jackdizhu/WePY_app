import * as type from './mutation-types';
const mutations = {
  [type.SET_MPVUEINFO](state: any, mpvueInfo: any) { // eslint-disable-line
    state.mpvueInfo = mpvueInfo;
  },
  [type.SET_CHECKITEM](state: any, checkItem: any) { // eslint-disable-line
    state.checkItem = checkItem;
  }
}

export default mutations;
