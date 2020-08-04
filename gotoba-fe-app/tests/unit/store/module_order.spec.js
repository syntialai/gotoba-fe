import api from '@/api/api';
import * as Types from '@/store/types';
import order from '@/store/modules/order';

jest.mock('@/api/api', () => ({
  GetOrderDetailByUser: jest.fn(),
  GetOrderDetailByNotCart: jest.fn(),
  GetOrderDetail: jest.fn(),
  GetPayment: jest.fn(),
  GetAcceptedPaymentByUser: jest.fn(),
  GetWaitingPaymentByUser: jest.fn(),
  GetCancelledPaymentByUser: jest.fn(),
  GetOrderDetailByMerchant: jest.fn(),
  RemoveOrder: jest.fn(),
}));

const store = order;

describe('Order modules', () => {
  const data = {
    state: {
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
    },
    getters: {
      acceptedPaymentData: [{
        sku: 'PAY_0001',
        status: 'ACCEPTED',
      }],
      cancelledPaymentData: [{
        sku: 'PAY_0002',
        status: 'CANCELLED',
      }],
      waitingPaymentData: [{
        sku: 'PAY_0003',
        status: 'WAITING',
      }],
      orderData: [{
        sku: 'ORD_0001',
        expiredDate: '2020-12-12',
        status: 2,
      }, {
        sku: 'ORD_0002',
        expiredDate: '2019-12-12',
        status: 3,
      }, {
        sku: 'ORD_0003',
        expiredDate: '2020-12-12',
        status: 3,
      }],
      filteredOrderData: [{
        sku: 'ORD_0001',
        expiredDate: '2020-12-12',
        status: 2,
      }, {
        sku: 'ORD_0002',
        expiredDate: '2019-12-12',
        status: 3,
      }],
      approvedOrderData: {
        valid: [{
          sku: 'ORD_0003',
          expiredDate: '2020-12-12',
          status: 3,
        }],
        expired: [{
          sku: 'ORD_0002',
          expiredDate: '2019-12-12',
          status: 3,
        }],
      },
      orderDataBySku: {
        sku: 'ORD_0001',
      },
      paymentDataBySku: {
        sku: 'PAY_0001',
      },
      orderTotal: {
        item: 1,
        price: 100000,
        discount: 50000,
      },
      cartData: [{
        sku: 'ORD_0005',
        quantity: 1,
        price: 100000,
        discount: 50000,
      }],
      merchantOrderData: [{
        sku: 'ORD_0006',
        category: 'journey',
        status: 3,
      }, {
        sku: 'ORD_0007',
        category: 'wisata',
        status: 3,
      }, {
        sku: 'ORD_0008',
        category: 'journey',
        status: 2,
      }, {
        sku: 'ORD_0009',
        category: 'restaurant',
        status: 3,
      }, {
        sku: 'ORD_0010',
        category: 'restaurant',
        status: 2,
      }],
      merchantResponsedData: [{
        sku: 'ORD_0006',
        category: 'journey',
        status: 3,
      }, {
        sku: 'ORD_0007',
        category: 'wisata',
        status: 3,
      }, {
        sku: 'ORD_0009',
        category: 'restaurant',
        status: 3,
      }],
      merchantWaitingResponseData: [
        {
          sku: 'ORD_0008',
          category: 'journey',
          status: 2,
        },
        {
          sku: 'ORD_0010',
          category: 'restaurant',
          status: 2,
        },
      ],
      merchantOrderCount: {
        restaurant: 2,
        itinerary: 1,
      },
    },
    userSku: 'USER_0001',
    listSku: ['ORD_0001', 'ORD_0002'],
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.orderData(state)).toStrictEqual(state.orderData);
    expect(store.getters.filteredOrderData(state)).toStrictEqual(state.filteredOrderData);
    expect(store.getters.approvedOrderData(state)).toStrictEqual(
      state.approvedOrderData,
    );
    expect(store.getters.orderDataBySku(state)).toStrictEqual(
      state.orderDataBySku,
    );
    expect(store.getters.orderTotal(state)).toStrictEqual(
      state.orderTotal,
    );
    expect(store.getters.cartData(state)).toStrictEqual(
      state.cartData,
    );
    expect(store.getters.paymentDataBySku(state)).toStrictEqual(
      state.paymentDataBySku,
    );
    expect(store.getters.acceptedPaymentData(state)).toStrictEqual(
      state.acceptedPaymentData,
    );
    expect(store.getters.waitingPaymentData(state)).toStrictEqual(
      state.waitingPaymentData,
    );
    expect(store.getters.cancelledPaymentData(state)).toStrictEqual(
      state.cancelledPaymentData,
    );
    expect(store.getters.merchantOrderData(state)).toStrictEqual(
      state.merchantOrderData,
    );
    expect(store.getters.merchantResponsedData(state)).toStrictEqual(
      state.merchantResponsedData,
    );
    expect(store.getters.merchantWaitingResponseData(state)).toStrictEqual(
      state.merchantWaitingResponseData,
    );
    expect(store.getters.merchantOrderCount(state)).toStrictEqual(
      state.merchantOrderCount,
    );
  });

  it('Mutations', () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_CART_DATA](state, res.cartData);
    expect(state.cartData).toStrictEqual(res.cartData);

    store.mutations[Types.SET_FILTERED_ORDER_DATA](state, res.filteredOrderData);
    expect(state.filteredOrderData).toStrictEqual(res.filteredOrderData);

    store.mutations[Types.SET_APPROVED_ORDER_DATA](state, res.orderData);
    expect(state.approvedOrderData).toStrictEqual(res.approvedOrderData);

    store.mutations[Types.SET_ORDER_DATA_BY_SKU](
      state,
      res.orderDataBySku,
    );
    expect(state.orderDataBySku).toStrictEqual(res.orderDataBySku);

    store.mutations[Types.SET_ORDER_TOTAL](
      state,
      res.cartData,
    );
    expect(state.orderTotal).toStrictEqual(res.orderTotal);

    store.mutations[Types.SET_ORDER_DATA](state, res.orderData);
    expect(state.orderData).toStrictEqual(res.orderData);

    store.mutations[Types.SET_MERCHANT_ORDER_DATA](state, res.merchantOrderData);
    expect(state.merchantOrderData).toStrictEqual(res.merchantOrderData);

    store.mutations[Types.SET_MERCHANT_ORDER_COUNT](state, res.merchantOrderCount);
    expect(state.merchantOrderCount).toStrictEqual(res.merchantOrderCount);

    store.mutations[Types.SET_MERCHANT_WAITING_DATA](state, res.merchantWaitingResponseData);
    expect(state.merchantWaitingResponseData).toStrictEqual(res.merchantWaitingResponseData);

    store.mutations[Types.SET_MERCHANT_RESPONSED_DATA](state, res.merchantResponsedData);
    expect(state.merchantResponsedData).toStrictEqual(res.merchantResponsedData);

    store.mutations[Types.SET_PAYMENT_BY_SKU](state, res.paymentDataBySku);
    expect(state.paymentDataBySku).toStrictEqual(res.paymentDataBySku);

    store.mutations[Types.SET_ACCEPTED_PAYMENT_DATA](state, res.acceptedPaymentData);
    expect(state.acceptedPaymentData).toStrictEqual(res.acceptedPaymentData);

    store.mutations[Types.SET_WAITING_PAYMENT_DATA](state, res.waitingPaymentData);
    expect(state.waitingPaymentData).toStrictEqual(res.waitingPaymentData);

    store.mutations[Types.SET_CANCELLED_PAYMENT_DATA](state, res.cancelledPaymentData);
    expect(state.cancelledPaymentData).toStrictEqual(res.cancelledPaymentData);

    store.mutations[Types.ADD_ITINERARY_ORDER_COUNT](state);
    expect(state.merchantOrderCount.itinerary).toBe(2);

    store.mutations[Types.ADD_RESTAURANT_ORDER_COUNT](state);
    expect(state.merchantOrderCount.restaurant).toBe(3);

    store.mutations[Types.REMOVE_ORDER](state, res.cartData[0].sku);
    expect(state.cartData).toStrictEqual([]);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('setCartData', () => {
      store.actions.setCartData({ commit }, data.getters.cartData);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_CART_DATA,
        data.getters.cartData,
      );
    });

    it('setOrderData', () => {
      store.actions.setOrderData({ commit }, data.getters.orderData);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenNthCalledWith(
        1,
        Types.SET_ORDER_DATA,
        data.getters.orderData,
      );
      expect(commit).toHaveBeenNthCalledWith(
        2,
        Types.SET_ORDER_TOTAL,
        data.getters.orderData,
      );
    });

    it('setOrderTotal', () => {
      store.actions.setOrderTotal({ commit }, data.getters.orderData);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_ORDER_TOTAL,
        data.getters.orderData,
      );
    });

    it('addItineraryOrderCount', () => {
      store.actions.addItineraryOrderCount({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.ADD_ITINERARY_ORDER_COUNT,
      );
    });

    it('addRestaurantOrderCount', () => {
      store.actions.addRestaurantOrderCount({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.ADD_RESTAURANT_ORDER_COUNT,
      );
    });

    it('setOrderDataBySku', () => {
      store.actions.setOrderDataBySku({ commit }, data.getters.orderDataBySku);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_ORDER_DATA_BY_SKU,
        data.getters.orderDataBySku,
      );
    });

    it('getCartData - success', async () => {
      api.GetOrderDetailByUser.mockResolvedValue({
        data: data.getters.cartData,
      });

      await store.actions.getCartData({ commit }, data.userSku);

      expect(commit).toHaveBeenCalledTimes(4);
      expect(commit).toHaveBeenNthCalledWith(
        2,
        Types.SET_CART_DATA,
        data.getters.cartData,
      );
      expect(commit).toHaveBeenNthCalledWith(
        3,
        Types.SET_ORDER_DATA,
        data.getters.cartData,
      );
      expect(commit).toHaveBeenNthCalledWith(
        4,
        Types.SET_ORDER_TOTAL,
        data.getters.cartData,
      );
    });

    it('getCartData - error', async () => {
      api.GetOrderDetailByUser.mockRejectedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getCartData({ commit }, data.userSku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getOrderData - success', async () => {
      api.GetOrderDetailByUser.mockResolvedValue({
        data: data.getters.orderData,
      });

      await store.actions.getOrderData({ commit }, data.userSku);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_ORDER_DATA,
        data.getters.orderData,
      );
    });

    it('getOrderData - error promise', async () => {
      api.GetOrderDetailByUser.mockResolvedValue({
        error: 'Not Found',
      });

      await store.actions.getOrderData({ commit }, data.userSku);

      expect(commit).not.toHaveBeenCalled();
    });

    it('getOrderData - error', async () => {
      api.GetOrderDetailByUser.mockRejectedValue({
        error: 'Not Found',
      });

      await store.actions.getOrderData({ commit }, data.userSku);

      expect(commit).not.toHaveBeenCalled();
    });

    it('getApprovedOrderData - success', async () => {
      api.GetOrderDetailByUser.mockResolvedValue({
        code: 200,
        status: 'OK',
        data: data.getters.approvedOrderData,
      });

      await store.actions.getApprovedOrderData({ commit }, data.userSku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_APPROVED_ORDER_DATA,
        data.getters.approvedOrderData,
      );
    });

    it('getApprovedOrderData - error', async () => {
      api.GetOrderDetailByUser.mockRejectedValue(new Error());

      await store.actions.getApprovedOrderData({ commit }, data.userSku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getSomeOrderData - success', async () => {
      const getters = {
        userSku: data.userSku,
      };
      api.GetOrderDetailByNotCart.mockResolvedValue({
        data: data.getters.orderData,
      });

      await store.actions.getSomeOrderData(
        { commit, getters },
        data.listSku,
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenNthCalledWith(
        1,
        Types.SET_FILTERED_ORDER_DATA,
        data.getters.filteredOrderData,
      );
      expect(commit).toHaveBeenNthCalledWith(
        2,
        Types.SET_ORDER_TOTAL,
        data.getters.filteredOrderData,
      );
    });

    it('getSomeOrderData - error promise', async () => {
      const getters = {
        userSku: data.userSku,
      };
      api.GetOrderDetailByNotCart.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getSomeOrderData(
        { commit, getters },
        data.listSku,
      );

      expect(commit).not.toHaveBeenCalled();
    });

    it('getSomeOrderData - error', async () => {
      const getters = {
        userSku: data.userSku,
      };
      api.GetOrderDetailByNotCart.mockRejectedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getSomeOrderData(
        { commit, getters },
        data.listSku,
      );

      expect(commit).not.toHaveBeenCalled();
    });

    it('getOrderDataBySku - success', async () => {
      api.GetOrderDetail.mockResolvedValue({
        data: data.getters.orderDataBySku,
      });

      await store.actions.getOrderDataBySku(
        { commit },
        data.getters.orderDataBySku.sku,
      );

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenNthCalledWith(
        2,
        Types.SET_ORDER_DATA_BY_SKU,
        data.getters.orderDataBySku,
      );
      expect(commit).toHaveBeenNthCalledWith(
        3,
        Types.SET_ORDER_TOTAL,
        data.getters.orderDataBySku,
      );
    });

    it('getOrderDataBySku - error', async () => {
      api.GetOrderDetail.mockRejectedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getOrderDataBySku(
        { commit },
        data.getters.orderDataBySku.sku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getPaymentBySku - success', async () => {
      api.GetPayment.mockResolvedValue({
        data: data.getters.paymentDataBySku,
      });

      await store.actions.getPaymentBySku(
        { commit },
        data.getters.paymentDataBySku.sku,
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_PAYMENT_BY_SKU,
        data.getters.paymentDataBySku,
      );
    });

    it('getPaymentBySku - error', async () => {
      api.GetPayment.mockRejectedValue(new Error());

      await store.actions.getPaymentBySku(
        { commit },
        data.getters.paymentDataBySku.sku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getAcceptedPayment - success', async () => {
      api.GetAcceptedPaymentByUser.mockResolvedValue({
        data: data.getters.acceptedPaymentData,
      });

      await store.actions.getAcceptedPayment(
        { commit },
        data.userSku,
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_ACCEPTED_PAYMENT_DATA,
        data.getters.acceptedPaymentData,
      );
    });

    it('getAcceptedPayment - error promise', async () => {
      api.GetAcceptedPaymentByUser.mockResolvedValue({
        error: 'Not Found',
      });

      await store.actions.getAcceptedPayment(
        { commit },
        data.userSku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getAcceptedPayment - error', async () => {
      api.GetAcceptedPaymentByUser.mockRejectedValue(new Error());

      await store.actions.getAcceptedPayment(
        { commit },
        data.userSku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getWaitingPayment - success', async () => {
      api.GetWaitingPaymentByUser.mockResolvedValue({
        data: data.getters.waitingPaymentData,
      });

      await store.actions.getWaitingPayment(
        { commit },
        data.userSku,
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_WAITING_PAYMENT_DATA,
        data.getters.waitingPaymentData,
      );
    });

    it('getWaitingPayment - error promise', async () => {
      api.GetWaitingPaymentByUser.mockResolvedValue({
        error: 'Not Found',
      });

      await store.actions.getWaitingPayment(
        { commit },
        data.userSku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getWaitingPayment - error', async () => {
      api.GetWaitingPaymentByUser.mockRejectedValue(new Error());

      await store.actions.getWaitingPayment(
        { commit },
        data.userSku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getCancelledPayment - success', async () => {
      api.GetCancelledPaymentByUser.mockResolvedValue({
        data: data.getters.cancelledPaymentData,
      });

      await store.actions.getCancelledPayment(
        { commit },
        data.userSku,
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_CANCELLED_PAYMENT_DATA,
        data.getters.cancelledPaymentData,
      );
    });

    it('getCancelledPayment - error promise', async () => {
      api.GetCancelledPaymentByUser.mockResolvedValue({
        error: 'Not Found',
      });

      await store.actions.getCancelledPayment(
        { commit },
        data.userSku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getCancelledPayment - error', async () => {
      api.GetCancelledPaymentByUser.mockRejectedValue(new Error());

      await store.actions.getCancelledPayment(
        { commit },
        data.userSku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getMerchantOrderData - success', async () => {
      api.GetOrderDetailByMerchant.mockResolvedValue({
        data: data.getters.merchantOrderData,
      });

      await store.actions.getMerchantOrderData({ commit }, 'MERC_0001');

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenNthCalledWith(
        1,
        Types.SET_MERCHANT_ORDER_DATA,
        data.getters.merchantOrderData,
      );
      expect(commit).toHaveBeenNthCalledWith(
        2,
        Types.SET_MERCHANT_WAITING_DATA,
        data.getters.merchantOrderData,
      );
      expect(commit).toHaveBeenNthCalledWith(
        3,
        Types.SET_MERCHANT_RESPONSED_DATA,
        data.getters.merchantOrderData,
      );
    });

    it('getMerchantOrderData - no data response', async () => {
      api.GetOrderDetailByMerchant.mockResolvedValue({
        error: 'Not Found',
      });

      await store.actions.getMerchantOrderData({ commit }, 'MERC_0001');

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenNthCalledWith(
        1,
        Types.SET_MERCHANT_ORDER_DATA,
        [],
      );
      expect(commit).toHaveBeenNthCalledWith(
        2,
        Types.SET_MERCHANT_WAITING_DATA,
        [],
      );
      expect(commit).toHaveBeenNthCalledWith(
        3,
        Types.SET_MERCHANT_RESPONSED_DATA,
        [],
      );
    });

    it('getMerchantOrderData - error', async () => {
      api.GetOrderDetailByMerchant.mockRejectedValue({
        error: 'Not Found',
      });

      await store.actions.getMerchantOrderData({ commit }, 'MERC_0001');

      expect(commit).not.toHaveBeenCalled();
    });

    it('getMerchantOrderCount', async () => {
      const getters = {
        userSku: data.userSku,
        merchantOrderData: data.getters.merchantOrderData,
      };
      const dispatch = jest.fn().mockResolvedValue({
        data: data.getters.merchantOrderData,
      });

      await store.actions.getMerchantOrderData({ commit, dispatch, getters });

      // expect(dispatch).toHaveBeenCalledTimes(1);
      // expect(dispatch).toHaveBeenCalledWith('getMerchantOrderData', getters.userSku);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_MERCHANT_ORDER_COUNT,
        data.getters.merchantOrderCount,
      );
    });

    it('removeOrder - success', async () => {
      api.RemoveOrder.mockResolvedValue({
        code: 200,
        status: 'OK',
      });

      await store.actions.removeOrder({ commit }, data.getters.orderDataBySku.sku);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.REMOVE_ORDER,
        data.getters.orderDataBySku.sku,
      );
    });

    it('removeOrder - error', async () => {
      api.RemoveOrder.mockRejectedValue(new Error());

      await store.actions.removeOrder({ commit }, data.getters.orderDataBySku.sku);

      expect(commit).not.toHaveBeenCalled();
    });
  });
});
