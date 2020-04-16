/* eslint-disable no-shadow */
import * as Types from '../types';

const state = {
  userLoginStatus: JSON.parse(localStorage.getItem('userLoginStatus')) || false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
};

const actions = {
  setUserInfo({ commit }, res) {
    localStorage.setItem('userInfo', JSON.stringify(res));
    localStorage.setItem('userLoginStatus', true);

    commit(Types.SET_USER_INFO, res);
    commit(Types.SET_USER_LOGIN_STATUS, true);
  },

  setLogOut({ commit }) {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userLoginStatus');

    commit(Types.SET_USER_INFO, {});
    commit(Types.SET_USER_LOGIN_STATUS, false);
  },
};

const getters = {
  userLoginStatus: (state) => state.userLoginStatus,
  userInfo: (state) => state.userInfo,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_USER_INFO](state, res) {
    state.userInfo = res;
  },

  [Types.SET_USER_LOGIN_STATUS](state, status) {
    state.userLoginStatus = status;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
