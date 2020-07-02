/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  userLoginStatus: localStorage.getItem('userLoginStatus') || false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  userRole: localStorage.getItem('userRole') || '',
};

const actions = {
  setUserInfo({ commit }, res) {
    localStorage.setItem('userInfo', JSON.stringify(res));
    localStorage.setItem('userLoginStatus', true);
    localStorage.setItem('userRole', res.role);

    commit(Types.SET_USER_INFO, res);
    commit(Types.SET_USER_LOGIN_STATUS, true);
    commit(Types.SET_USER_ROLE, res.role);
  },

  setLogOut({ commit }) {
    api.Logout()
      .then((res) => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userLoginStatus');
        localStorage.removeItem('userRole');

        commit(Types.SET_USER_INFO, {});
        commit(Types.SET_USER_LOGIN_STATUS, false);
        commit(Types.SET_USER_ROLE, '');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  userLoginStatus: (state) => state.userLoginStatus,
  userInfo: (state) => state.userInfo,
  userRole: (state) => state.userRole,
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
