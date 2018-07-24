import * as type from './mutation-types';
const mutations = {
  [type.SET_MPVUEINFO](state, mpvueInfo) { // eslint-disable-line
    state.mpvueInfo = mpvueInfo;
  },
  [type.SET_CHECKITEM](state, checkItem) { // eslint-disable-line
    state.checkItem = checkItem;
  }
}

export default mutations;
