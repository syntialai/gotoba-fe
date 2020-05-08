/* eslint-disable no-shadow */
import * as Types from '../types';

const state = {
  userLoginStatus: JSON.parse(localStorage.getItem('userLoginStatus')) || false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  merchantData: [],
  userData: [],
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

  getMerchantData({ commit }, res) {
    commit(Types.GET_MERCHANT_DATA, res);
  },

  getUserData({ commit }, res) {
    commit(Types.GET_USER_DATA, res);
  },
};

const getters = {
  merchantData: (state) => state.merchantData,
  userData: (state) => state.userData,
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

  [Types.GET_MERCHANT_DATA](state, res) {
    state.merchantData = res;
  },

  [Types.GET_USER_DATA](state, res) {
    state.userData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
