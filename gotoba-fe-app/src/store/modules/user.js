/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  userLoginStatus: localStorage.getItem('userLoginStatus') || false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  merchantData: [],
  userData: [],
  userActiveData: [],
  userBlockedData: [],
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
    commit(Types.SET_MERCHANT_DATA, res);

    api.GetMerchants()
      .then((res) => {
        commit(Types.SET_MERCHANT_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getUserData({ commit }, res) {
    commit(Types.SET_USER_DATA, res);

    api.GetUsers()
      .then((res) => {
        commit(Types.SET_USER_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getActiveUsers({ commit }, res) {
    commit(Types.SET_USER_ACTIVE, res);

    api.GetActiveUsers()
      .then((res) => {
        commit(Types.SET_USER_ACTIVE, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getBlockedUsers({ commit }, res) {
    commit(Types.SET_USER_BLOCKED, res);

    api.GetBlockedUsers()
      .then((res) => {
        commit(Types.SET_USER_BLOCKED, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  merchantData: (state) => state.merchantData,
  userData: (state) => state.userData,
  userLoginStatus: (state) => state.userLoginStatus,
  userInfo: (state) => state.userInfo,
  userActiveData: (state) => state.userActiveData,
  userBlockedData: (state) => state.userBlockedData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_USER_INFO](state, res) {
    state.userInfo = res;
  },

  [Types.SET_USER_LOGIN_STATUS](state, status) {
    state.userLoginStatus = status;
  },

  [Types.SET_MERCHANT_DATA](state, res) {
    state.merchantData = res;
  },

  [Types.SET_USER_DATA](state, res) {
    state.userData = res;
  },

  [Types.SET_USER_ACTIVE](state, res) {
    state.userActiveData = res;
  },

  [Types.SET_USER_BLOCKED](state, res) {
    state.userBlockedData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
