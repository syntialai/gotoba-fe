/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  userLoginStatus: localStorage.getItem('userLoginStatus') || false,
  userName: localStorage.getItem('userName') || '',
  userSku: localStorage.getItem('userSku') || '',
  userRole: localStorage.getItem('userRole') || '',
};

const actions = {
  setUserInfo({ commit }, res) {
    localStorage.setItem('userName', res.name);
    localStorage.setItem('userSku', res.sku);
    localStorage.setItem('userLoginStatus', true);
    localStorage.setItem('userRole', res.role);

    commit(Types.SET_USER_NAME, res.name);
    commit(Types.SET_USER_SKU, res.sku);
    commit(Types.SET_USER_LOGIN_STATUS, true);
    commit(Types.SET_USER_ROLE, res.role);
  },

  setLogOut({ commit }) {
    api.Logout()
      .then(() => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userSku');
        localStorage.removeItem('userLoginStatus');
        localStorage.removeItem('userRole');

        commit(Types.SET_USER_NAME, '');
        commit(Types.SET_USER_SKU, '');
        commit(Types.SET_USER_LOGIN_STATUS, false);
        commit(Types.SET_USER_ROLE, '');
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  userLoginStatus: (state) => state.userLoginStatus,
  userName: (state) => state.userName,
  userSku: (state) => state.userSku,
  userRole: (state) => state.userRole,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_USER_NAME](state, res) {
    state.userName = res;
  },

  [Types.SET_USER_SKU](state, res) {
    state.userSku = res;
  },

  [Types.SET_USER_LOGIN_STATUS](state, status) {
    state.userLoginStatus = status;
  },

  [Types.SET_USER_ROLE](state, role) {
    state.userRole = role;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
