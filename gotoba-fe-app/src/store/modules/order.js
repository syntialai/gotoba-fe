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
  orderDataBySku: {},
  paymentDataBySku: {},
  orderTotal: { item: 0, price: 0, discount: 0 },
  cartData: [],
  merchantOrderData: [],
  merchantResponsedData: [],
  merchantWaitingResponseData: [],
  merchantOrderCount: {
    restaurant: 0,
    itinerary: 0,
  },
};

const actions = {
  setCartData({ commit }, res) {
    commit(Types.SET_CART_DATA, res);
  },

  setOrderData({ commit }, data) {
    commit(Types.SET_ORDER_DATA, data);
    commit(Types.SET_ORDER_TOTAL, data);
  },

  setOrderTotal({ commit }, data) {
    commit(Types.SET_ORDER_TOTAL, data);
  },

  addItineraryOrderCount({ commit }) {
    commit(Types.ADD_ITINERARY_ORDER_COUNT);
  },

  addRestaurantOrderCount({ commit }) {
    commit(Types.ADD_RESTAURANT_ORDER_COUNT);
  },

  setOrderDataBySku({ commit }, res) {
    commit(Types.SET_ORDER_DATA_BY_SKU, res);
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

  async getOrderData({ commit }, sku) {
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

  async getSomeOrderData({ commit, getters }, listSku) {
    try {
      const res = await api.GetOrderDetailByNotCart(getters.userSku);
      if (!res.error) {
        const order = res.data.filter((item) => listSku.includes(item.sku));
        console.log(res.data, order);
        commit(Types.SET_FILTERED_ORDER_DATA, order);
        commit(Types.SET_ORDER_TOTAL, order);
      }
    } catch (err) {
      console.log(err);
    }
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
    try {
      const res = await api.GetOrderDetailByMerchant(merchantSku);
      commit(Types.SET_MERCHANT_ORDER_DATA, res.data || []);
      commit(Types.SET_MERCHANT_WAITING_DATA, res.data || []);
      commit(Types.SET_MERCHANT_RESPONSED_DATA, res.data || []);
    } catch (err) {
      console.log(err);
    }
  },

  async getMerchantOrderCount({ commit, dispatch, getters }) {
    await dispatch('getMerchantOrderData', getters.userSku);

    const itinerary = getters.merchantOrderData.filter((item) => (item.category === 'journey'
      || item.category === 'wisata')
      && item.status === 3);
    const restaurant = getters.merchantOrderData.filter((item) => item.category === 'restaurant'
      && item.status === 3);

    commit(Types.SET_MERCHANT_ORDER_COUNT, {
      restaurant: restaurant.length,
      itinerary: itinerary.length,
    });
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
  orderDataBySku: (state) => state.orderDataBySku,
  orderTotal: (state) => state.orderTotal,
  cartData: (state) => state.cartData,
  paymentDataBySku: (state) => state.paymentDataBySku,
  acceptedPaymentData: (state) => state.acceptedPaymentData,
  waitingPaymentData: (state) => state.waitingPaymentData,
  cancelledPaymentData: (state) => state.cancelledPaymentData,
  merchantOrderData: (state) => state.merchantOrderData,
  merchantResponsedData: (state) => state.merchantResponsedData,
  merchantWaitingResponseData: (state) => state.merchantWaitingResponseData,
  merchantOrderCount: (state) => state.merchantOrderCount,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_CART_DATA](state, res) {
    state.cartData = res;
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
  [Types.SET_MERCHANT_WAITING_DATA](state, res) {
    state.merchantWaitingResponseData = res.filter((item) => item.status === 2);
  },
  [Types.SET_MERCHANT_RESPONSED_DATA](state, res) {
    state.merchantResponsedData = res.filter((item) => item.status === 3 || item.status === 0);
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
      if (item.status === 3) {
        if (isPassed(expiredDate) || isToday(expiredDate)) {
          order.expired.push(item);
        } else {
          order.valid.push(item);
        }
      }
    });
    state.approvedOrderData = order;
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
  [Types.SET_MERCHANT_ORDER_COUNT](state, res) {
    state.merchantOrderCount = res;
  },
  [Types.ADD_ITINERARY_ORDER_COUNT](state) {
    state.merchantOrderCount.itinerary += 1;
  },
  [Types.ADD_RESTAURANT_ORDER_COUNT](state) {
    state.merchantOrderCount.restaurant += 1;
  },
  [Types.REMOVE_ORDER](state, sku) {
    const filteredData = state.cartData.filter((item) => item.sku !== sku);
    state.cartData = filteredData;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
