/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  adminData: {},
};

const actions = {
  getAdminData({ commit }, adminSku) {
    commit(Types.SET_ADMIN_DATA);

    api.GetAdmin(adminSku)
      .then((res) => {
        commit(Types.SET_ADMIN_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  adminData: (state) => state.adminData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_ADMIN_DATA](state, res) {
    state.adminData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
