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
  },
  [type.SET_COOKINGTYPE](state: any, cookingType: any) { // eslint-disable-line
    state.cookingType = cookingType;

  },
  [type.SET_LISTDATA](state: any, listData: any) { // eslint-disable-line
    state.listData = listData;
  },
  [type.SET_LISTRANDOMDATA](state: any, listRandomData: any) { // eslint-disable-line
    state.listRandomData = listRandomData;
  }
}

export default mutations;
