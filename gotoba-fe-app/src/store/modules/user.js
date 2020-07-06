/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  userData: [],
  userActiveData: [],
  userBlockedData: [],
};

const actions = {
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
  userData: (state) => state.userData,
  userActiveData: (state) => state.userActiveData,
  userBlockedData: (state) => state.userBlockedData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
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
