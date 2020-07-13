/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  userData: [],
  userDataBySku: {},
  userActiveData: [],
  userBlockedData: [],
};

const actions = {
  getUserData({ commit }) {
    commit(Types.SET_USER_DATA);

    api.GetUsers()
      .then((res) => {
        commit(Types.SET_USER_DATA, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getUserBySku({ commit }, sku) {
    commit(Types.SET_USER_DATA_BY_SKU);

    api.GetUserBySku(sku)
      .then((res) => {
        commit(Types.SET_USER_DATA_BY_SKU, res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getActiveUsers({ commit }) {
    commit(Types.SET_USER_ACTIVE);

    api.GetActiveUsers()
      .then((res) => {
        commit(Types.SET_USER_ACTIVE, res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getBlockedUsers({ commit }) {
    commit(Types.SET_USER_BLOCKED);

    api.GetBlockedUsers()
      .then((res) => {
        commit(Types.SET_USER_BLOCKED, res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  userData: (state) => state.userData,
  userDataBySku: (state) => state.userDataBySku,
  userActiveData: (state) => state.userActiveData,
  userBlockedData: (state) => state.userBlockedData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_USER_DATA](state, res) {
    state.userData = res;
  },

  [Types.SET_USER_DATA_BY_SKU](state, res) {
    state.userDataBySku = res;
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
