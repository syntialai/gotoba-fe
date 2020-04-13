/* eslint-disable no-shadow */
import { User } from '../types';

const state = {
  userLoginStatus: JSON.parse(localStorage.getItem('userLoginStatus')) || false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
};

const actions = {
  setUserInfo({ commit }, res) {
    localStorage.setItem('userInfo', JSON.stringify(res));
    localStorage.setItem('userLoginStatus', true);

    commit(User.SET_INFO, res);
    commit(User.SET_LOGIN_STATUS, true);
  },

  setLogOut({ commit }) {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userLoginStatus');

    commit(User.SET_INFO, {});
    commit(User.SET_LOGIN_STATUS, false);
  },
};

const getters = {
  userLoginStatus: state => state.userLoginStatus,
	userInfo: state => state.userInfo,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [types.SET_INFO](state, res) {
		state.userInfo = res
	},

	[types.SET_LOGIN_STATUS](state, status) {
		state.userLoginStatus = status
	},
};

export default {
  state,
  actions,
  getters,
  mutations,
};
