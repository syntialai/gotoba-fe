/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  merchantDatas: [],
  merchantData: {},
};

const actions = {
  getMerchantData({ commit }) {
    commit(Types.SET_MERCHANT_DATA);

    api.GetMerchants()
      .then((res) => {
        commit(Types.SET_MERCHANT_DATA, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getMerchantDataBySku({ commit }, merchantSku) {
    commit(Types.SET_MERCHANT_DATA_BY_SKU);

    api.GetMerchantBySku(merchantSku)
      .then((res) => {
        commit(Types.SET_MERCHANT_DATA_BY_SKU, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  merchantDatas: (state) => state.merchantDatas,
  merchantData: (state) => state.merchantData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_MERCHANT_DATA](state, res) {
    state.merchantDatas = res;
  },

  [Types.SET_MERCHANT_DATA_BY_SKU](state, res) {
    state.merchantData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
