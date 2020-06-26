/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  orderData: [],
  cartData: [],
};

const actions = {
  setCartData({ commit }, res) {
    commit(Types.SET_CART_DATA, res);
  },

  setOrderData({ commit }, res) {
    commit(Types.SET_ORDER_DATA, res);
  },

  getCartData({ commit }, res) {
    commit(Types.SET_CART_DATA, res);

    api.GetMerchants()
      .then((res) => {
        commit(Types.SET_CART_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getOrderData({ commit }, sku, res) {
    commit(Types.SET_ORDER_DATA, res);

    api.GetOrderDetailByUser(sku)
      .then((res) => {
        commit(Types.SET_ORDER_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  orderData: (state) => state.orderData,
  cartData: (state) => state.cartData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_CART_DATA](state, res) {
    state.cartData = res;
  },

  [Types.SET_ORDER_DATA](state, res) {
    state.orderData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
