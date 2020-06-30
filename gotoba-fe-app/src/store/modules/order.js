/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  acceptedPaymentData: [],
  cancelledPaymentData: [],
  waitingPaymentData: [],
  orderData: [],
  cartData: [],
  merchantRestaurantOrder: [],
  merchantItineraryOrder: [],
};

const actions = {
  setCartData({ commit }, res) {
    commit(Types.SET_CART_DATA, res);
  },

  getOrderData({ commit }, sku) {
    commit(Types.SET_ORDER_DATA);

    api.GetOrderDetailByUser(sku)
      .then((res) => {
        commit(Types.SET_ORDER_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAcceptedPayment({ commit }, userSku) {
    commit(Types.SET_ACCEPTED_PAYMENT_DATA);

    api.GetAcceptedPaymentByUser(userSku)
      .then((res) => {
        commit(Types.SET_ACCEPTED_PAYMENT_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getWaitingPayment({ commit }, userSku) {
    commit(Types.SET_WAITING_PAYMENT_DATA);

    api.GetWaitingPaymentByUser(userSku)
      .then((res) => {
        commit(Types.SET_WAITING_PAYMENT_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getCancelledPayment({ commit }, userSku) {
    commit(Types.SET_CANCELLED_PAYMENT_DATA);

    api.GetCancelledPaymentByUser(userSku)
      .then((res) => {
        commit(Types.SET_CANCELLED_PAYMENT_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getMerchantItineraryOrder({ commit }, merchantSku) {
    commit(Types.SET_MERCHANT_ITINERARY_ORDER);

    api.GetJourneyPaymentByMerchant(merchantSku)
      .then((res) => {
        commit(Types.SET_MERCHANT_ITINERARY_ORDER, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getMerchantRestaurantOrder({ commit }, merchantSku) {
    commit(Types.SET_MERCHANT_RESTAURANT_ORDER);

    api.GetRestaurantPaymentByMerchant(merchantSku)
      .then((res) => {
        commit(Types.SET_MERCHANT_RESTAURANT_ORDER, res);
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
  acceptedPaymentData: (state) => state.acceptedPaymentData,
  waitingPaymentData: (state) => state.waitingPaymentData,
  cancelledPaymentData: (state) => state.cancelledPaymentData,
  merchantItineraryOrder: (state) => state.merchantItineraryOrder,
  merchantRestaurantOrder: (state) => state.merchantRestaurantOrder,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_CART_DATA](state, res) {
    state.cartData = res;
  },

  [Types.SET_ORDER_DATA](state, res) {
    state.orderData = res;
  },

  [Types.SET_ACCEPTED_PAYMENT_DATA](state, res) {
    state.acceptedPaymentData = res;
  },

  [Types.SET_WAITING_PAYMENT_DATA](state, res) {
    state.waitingPaymentData = res;
  },

  [Types.SET_CANCELLED_PAYMENT_DATA](state, res) {
    state.cancelledPaymentData = res;
  },

  [Types.SET_MERCHANT_ITINERARY_ORDER](state, res) {
    state.merchantItineraryOrder = res;
  },

  [Types.SET_MERCHANT_RESTAURANT_ORDER](state, res) {
    state.merchantRestaurantOrder = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
