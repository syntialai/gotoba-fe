/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  acceptedPaymentData: [],
  cancelledPaymentData: [],
  waitingPaymentData: [],
  orderData: [],
  orderTotal: { item: 0, price: 0, discount: 0 },
  cartData: [],
  merchantRestaurantOrder: [],
  merchantItineraryOrder: [],
};

const actions = {
  setCartData({ commit }, res) {
    commit(Types.SET_CART_DATA, res);
    commit(Types.SET_ORDER_TOTAL);
  },

  setCartDataQuantity({ commit }, res) {
    commit(Types.SET_CART_DATA_QUANTITY, res);
  },

  selectAllCartData({ commit }, select) {
    commit(Types.SET_CART_DATA_ALL_CHECKED_OR_UNCHECKED, select);
    commit(Types.SET_ORDER_TOTAL);
  },

  setOrderData({ commit }, data) {
    commit(Types.SET_ORDER_DATA, data);
    commit(Types.SET_ORDER_TOTAL);
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
  orderTotal: (state) => state.orderTotal,
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
    if (state.cartData.length > 0) {
      state.cartData.concat(res);
      return;
    }

    state.cartData = res;
  },

  [Types.SET_CART_DATA_QUANTITY](state, res) {
    const indexData = state.cartData.findIndex((data) => data.ticketSku === res.ticketSku);

    if (indexData === -1) {
      state.cartData.push(res);
      return;
    }

    state.cartData[indexData].quantity += 1;
  },

  [Types.SET_CART_DATA_ALL_CHECKED_OR_UNCHECKED](state, select) {
    const newCartData = state.cartData.map((item) => {
      const cartTmp = { ...item };
      cartTmp.selected = select;

      return cartTmp;
    });

    state.cartData = newCartData;
  },

  [Types.SET_ORDER_TOTAL](state) {
    let totalItem = 0;
    let totalPrice = 0;
    let totalDiscount = 0;

    state.cartData.forEach((data) => {
      totalItem += data.quantity * data.selected;
      totalPrice += data.price * data.quantity * data.selected;
      totalDiscount += data.discount * data.quantity * data.selected;
    });

    state.orderTotal.item = totalItem;
    state.orderTotal.price = totalPrice;
    state.orderTotal.discount = totalDiscount;
  },

  [Types.SET_ORDER_TOTAL](state, res) {
    state.orderTotal = {
      item: res.quantity,
      price: res.quantity * res.price,
      discount: res.quantity * res.discount,
    };
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
