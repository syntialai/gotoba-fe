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
    commit(Types.SET_ORDER_INFO, res);
  },

  getCartData({ commit }, res) {
    commit(Types.GET_MERCHANT_DATA, res);

    api.GetMerchants()
      .then((res) => {
        ommit(Types.GET_MERCHANT_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getOrderData({ commit }, sku, res) {
    commit(Types.GET_ORDER_DATA, res);

    api.GetOrderDetailByUser(sku)
      .then((res) => {
        ommit(Types.GET_ORDER_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },    
};

const getters = {
  merchantData: (state) => state.merchantData,
  userData: (state) => state.userData,
  userLoginStatus: (state) => state.userLoginStatus,
  userInfo: (state) => state.userInfo,
  userActiveData: (state) => state.userActiveData,
  userBlockedData: (state) => state.userBlockedData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_USER_INFO](state, res) {
    state.userInfo = res;
  },

  [Types.SET_USER_LOGIN_STATUS](state, status) {
    state.userLoginStatus = status;
  },

  [Types.GET_MERCHANT_DATA](state, res) {
    state.merchantData = res;
  },

  [Types.GET_USER_DATA](state, res) {
    state.userData = res;
  },

  [Types.GET_USER_ACTIVE](state, res) {
    state.userActiveData = res;
  },

  [Types.GET_USER_BLOCKED](state, res) {
    state.userBlockedData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
