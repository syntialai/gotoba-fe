/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  userData: [],
  userDataBySku: {},
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  userData: (state) => state.userData,
  userDataBySku: (state) => state.userDataBySku,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_USER_DATA](state, res) {
    state.userData = res;
  },

  [Types.SET_USER_DATA_BY_SKU](state, res) {
    state.userDataBySku = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
