/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';
import { isToday, isPassed } from '../../utils/filter';

const state = {
  acceptedPaymentData: [],
  cancelledPaymentData: [],
  waitingPaymentData: [],
  orderData: [],
  filteredOrderData: [],
  approvedOrderData: {},
  rejectedOrderData: [],
  orderDataBySku: {},
  paymentDataBySku: {},
  orderTotal: { item: 0, price: 0, discount: 0 },
  cartData: [],
  merchantOrderData: [],
  merchantRestaurantOrder: [],
  merchantItineraryOrder: [],
};

const actions = {
  setCartData({ commit }, res) {
    commit(Types.SET_CART_DATA, res);
    commit(Types.SET_CART_TOTAL);
  },

  getCartData({ commit }, userSku) {
    commit(Types.SET_CART_DATA);

    api.GetOrderDetailByUser(userSku, 1)
      .then((res) => {
        commit(Types.SET_CART_DATA, res.data);
        commit(Types.SET_ORDER_DATA, res.data);
        commit(Types.SET_ORDER_TOTAL, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  setCartDataQuantity({ commit }, res) {
    commit(Types.SET_CART_DATA_QUANTITY, res);
  },

  setOrderData({ commit }, data) {
    console.log(data);
    commit(Types.SET_ORDER_DATA, data);
    commit(Types.SET_ORDER_TOTAL, data);
  },

  setOrderTotal({ commit }, data) {
    commit(Types.SET_ORDER_TOTAL, data);
  },

  async getOrderData({ commit }, sku) {
    commit(Types.SET_ORDER_DATA);

    try {
      const res = await api.GetOrderDetailByUser(sku, 2);
      if (!res.error) {
        commit(Types.SET_ORDER_DATA, res.data);
      }
    } catch (err) {
      console.log(err);
    }
  },

  getApprovedOrderData({ commit }, userSku) {
    commit(Types.SET_APPROVED_ORDER_DATA, []);

    api.GetOrderDetailByUser(userSku, 3)
      .then((res) => {
        console.log(res);
        commit(Types.SET_APPROVED_ORDER_DATA, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRejectedOrderData({ commit }, userSku) {
    commit(Types.SET_REJECTED_ORDER_DATA);

    api.GetOrderDetailByUser(userSku, 0)
      .then((res) => {
        commit(Types.SET_REJECTED_ORDER_DATA, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async getSomeOrderData({ dispatch, getters, commit }, listSku) {
    await dispatch('getOrderData', getters.userSku);

    const order = getters.orderData.filter((item) => listSku.includes(item.sku));
    console.log('order', order);
    commit(Types.SET_FILTERED_ORDER_DATA, order);
    commit(Types.SET_ORDER_TOTAL, order);
  },

  getOrderDataBySku({ commit }, sku) {
    commit(Types.SET_ORDER_DATA_BY_SKU);

    api.GetOrderDetail(sku)
      .then((res) => {
        commit(Types.SET_ORDER_DATA_BY_SKU, res.data);
        commit(Types.SET_ORDER_TOTAL, res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getPaymentBySku({ commit }, sku) {
    commit(Types.SET_PAYMENT_BY_SKU);

    api.GetPayment(sku)
      .then((res) => {
        commit(Types.SET_PAYMENT_BY_SKU, res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAcceptedPayment({ commit }, userSku) {
    commit(Types.SET_ACCEPTED_PAYMENT_DATA);

    api.GetAcceptedPaymentByUser(userSku)
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_ACCEPTED_PAYMENT_DATA, res.data);
        }
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
        if (!res.error) {
          commit(Types.SET_WAITING_PAYMENT_DATA, res.data);
        }
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
        if (!res.error) {
          commit(Types.SET_CANCELLED_PAYMENT_DATA, res.data);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async getMerchantOrderData({ commit }, merchantSku) {
    const res = await api.GetOrderDetailByMerchant(merchantSku);
    commit(Types.SET_MERCHANT_ORDER_DATA, res.data || []);
  },

  async getMerchantItineraryOrder({ commit, dispatch, getters }) {
    await dispatch('getMerchantOrderData', getters.userSku);

    console.log(getters.merchantOrderData);
    const data = getters.merchantOrderData.filter((item) => item.category === 'journey' || item.category === 'wisata');
    commit(Types.SET_MERCHANT_ITINERARY_ORDER, data);
  },

  async getMerchantRestaurantOrder({ commit, dispatch, getters }) {
    await dispatch('getMerchantOrderData', getters.userSku);

    console.log(getters.merchantOrderData);
    const data = getters.merchantOrderData.filter((item) => item.category === 'restaurant');
    commit(Types.SET_MERCHANT_RESTAURANT_ORDER, data);
  },

  removeOrder({ commit }, sku) {
    api.RemoveOrder(sku)
      .then(() => {
        commit(Types.REMOVE_ORDER, sku);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  orderData: (state) => state.orderData,
  filteredOrderData: (state) => state.filteredOrderData,
  approvedOrderData: (state) => state.approvedOrderData,
  rejectedOrderData: (state) => state.rejectedOrderData,
  orderDataBySku: (state) => state.orderDataBySku,
  orderTotal: (state) => state.orderTotal,
  cartData: (state) => state.cartData,
  paymentDataBySku: (state) => state.paymentDataBySku,
  acceptedPaymentData: (state) => state.acceptedPaymentData,
  waitingPaymentData: (state) => state.waitingPaymentData,
  cancelledPaymentData: (state) => state.cancelledPaymentData,
  merchantOrderData: (state) => state.merchantOrderData,
  merchantItineraryOrder: (state) => state.merchantItineraryOrder,
  merchantRestaurantOrder: (state) => state.merchantRestaurantOrder,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_CART_DATA](state, res) {
    state.cartData = res;
  },
  [Types.SET_CART_DATA_QUANTITY](state, res) {
    const indexData = state.cartData.findIndex((data) => data.ticketSku === res.ticketSku);

    console.log(indexData);
    if (indexData === -1) {
      state.cartData.push(res);
      return;
    }

    state.cartData[indexData].quantity += 1;
  },
  [Types.SET_ORDER_TOTAL](state, res) {
    let totalItem = 0;
    let totalPrice = 0;
    let totalDiscount = 0;

    res.forEach((data) => {
      totalItem += data.quantity;
      totalPrice += data.price * data.quantity;
      totalDiscount += data.discount * data.quantity;
    });

    state.orderTotal = {
      item: totalItem,
      price: totalPrice,
      discount: totalDiscount,
    };
  },
  [Types.SET_ORDER_DATA](state, res) {
    state.orderData = res;
  },
  [Types.SET_MERCHANT_ORDER_DATA](state, res) {
    state.merchantOrderData = res;
  },
  [Types.SET_FILTERED_ORDER_DATA](state, res) {
    state.filteredOrderData = res;
  },
  [Types.SET_APPROVED_ORDER_DATA](state, res) {
    const order = {
      valid: [],
      expired: [],
    };
    res.forEach((item) => {
      const expiredDate = new Date(item.expiredDate);
      if (isPassed(expiredDate) && isToday(expiredDate)) {
        order.expired.push(item);
      } else {
        order.valid.push(item);
      }
    });
    state.approvedOrderData = order;
  },
  [Types.SET_REJECTED_ORDER_DATA](state, res) {
    state.rejectedOrderData = res;
  },
  [Types.SET_ORDER_DATA_BY_SKU](state, res) {
    state.orderDataBySku = res;
  },
  [Types.SET_PAYMENT_BY_SKU](state, res) {
    state.paymentDataBySku = res;
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
  [Types.REMOVE_ORDER](state, sku) {
    state.cartData.filter((item) => item.sku !== sku);
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
