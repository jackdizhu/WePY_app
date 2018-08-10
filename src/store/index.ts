import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import * as getters from './getters';

Vue.use(Vuex as any);
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key: string) => wx.getStorageSync(key),
        setItem: (key: string, value: any) => wx.setStorageSync(key, value),
        removeItem: (key: string) => {}
      }
    })
  ]
});
