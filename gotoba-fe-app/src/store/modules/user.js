import { User } from '../types';

const state = {
  loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
};

const actions = {
  setUserInfo({ commit }, res) {
    localStorage.setItem('userInfo', JSON.stringify(res));
    localStorage.setItem('loginStatus', true);

    commit(User.SET_INFO, res);
    commit(User.SET_LOGIN_STATUS, true);
  },

  setLogOut({ commit }) {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('loginStatus');

    commit(User.SET_INFO, {});
    commit(User.SET_LOGIN_STATUS, false);
  },
};

const getters = {
  loginStatus: state => state.loginStatus,
	userInfo: state => state.userInfo,
};

const mutations = {
  [types.SET_INFO](state, res) {
		state.userInfo = res
	},

	[types.SET_LOGIN_STATUS](state, status) {
		state.loginStatus = status
	},
};

export default {
  state,
  actions,
  getters,
  mutations,
};
