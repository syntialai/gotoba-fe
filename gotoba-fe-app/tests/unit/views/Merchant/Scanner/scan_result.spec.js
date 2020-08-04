import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import api from '@/api/api';
import { setAlert } from '@/utils/tool';
import ScanResult from '@/views/Merchant/Scanner/ScanResult.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  RedeemOrder: jest.fn(),
}));
jest.mock('@/utils/tool');

const $router = {
  push: jest.fn(),
};

describe('ScanResult.vue', () => {
  const expectedData = {
    ticketData: {
      sku: 'TICK_0001',
    },
    orderDataBySku_wis: {
      ticketSku: 'TICK_0001',
      merchantSku: 'USER_0001',
      redeem: true,
      expiredDate: '2020-12-12',
      wisataSku: 'WIST_0001',
    },
    orderDataBySku: {
      ticketSku: 'TICK_0001',
      merchantSku: 'USER_0001',
      redeem: false,
      expiredDate: '2020-12-12',
      wisataSku: null,
    },
    userSku: 'USER_0001',
  };

  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      getJourneyDataBySku: jest.fn(),
      getRestaurantDataByMerchantSku: jest.fn(),
      setOrderDataBySku: jest.fn(),
      getOrderDataBySku: jest.fn(),
    };
    getters = {
      ticketData: () => ({
        sku: 'TICK_0001',
      }),
      userSku: () => 'USER_0001',
      orderDataBySku: () => ({
        ticketSku: 'TICK_0001',
        merchantSku: 'USER_0001',
        redeem: true,
        expiredDate: '2020-12-12',
        wisataSku: null,
      }),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(ScanResult, {
      mocks: {
        $router,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check getOrderDataBySku computed to call actions', () => {
    expect(actions.getOrderDataBySku).toHaveBeenCalledTimes(1);
    expect(actions.getOrderDataBySku.mock.calls[0][1]).toMatch(expectedData.ticketData.sku);
  });

  it('Check isMerchant computed to return merchant role', () => {
    expect(wrapper.vm.isMerchant).toBe(true);
  });

  it('Check canUse computed to return merchant role', () => {
    expect(wrapper.vm.canUse).toBe(true);
  });

  it('Check watcher to call actions journey if category is journey', async () => {
    actions = {
      getJourneyDataBySku: jest.fn(),
      getRestaurantDataByMerchantSku: jest.fn(),
    };
    store.hotUpdate({
      getters: {
        orderDataBySku: () => expectedData.orderDataBySku_wis,
      },
      actions,
    });
    await flushPromises();

    expect(actions.getJourneyDataBySku).toHaveBeenCalledTimes(1);
    expect(actions.getJourneyDataBySku.mock.calls[0][1]).toMatch(
      expectedData.orderDataBySku_wis.wisataSku,
    );
  });

  it('Check watcher to call actions restaurant if category is restaurant', async () => {
    actions = {
      getJourneyDataBySku: jest.fn(),
      getRestaurantDataByMerchantSku: jest.fn(),
    };
    store.hotUpdate({
      getters: {
        orderDataBySku: () => expectedData.orderDataBySku,
      },
      actions,
    });
    await flushPromises();

    expect(actions.getRestaurantDataByMerchantSku).toHaveBeenCalledTimes(1);
    expect(actions.getRestaurantDataByMerchantSku.mock.calls[0][1]).toMatch(
      expectedData.orderDataBySku.merchantSku,
    );
  });

  it('Check useTicket method to success call actions', async () => {
    api.RedeemOrder.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    wrapper.vm.useTicket();
    await flushPromises();

    expect(actions.setOrderDataBySku).toHaveBeenCalledTimes(1);
    expect(actions.setOrderDataBySku.mock.calls[0][1]).toStrictEqual(
      expectedData.orderDataBySku,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('used ticket', true);
  });

  it('Check useTicket method to not call actions', async () => {
    api.RedeemOrder.mockResolvedValue({
      error: 'Bad Request',
    });

    wrapper.vm.useTicket();
    await flushPromises();

    expect(actions.setOrderDataBySku).not.toHaveBeenCalled();

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('use ticket. Please try again later', false);
  });

  it('Check useTicket method to not call actions - error', async () => {
    api.RedeemOrder.mockRejectedValue(new Error());

    wrapper.vm.useTicket();
    await flushPromises();

    expect(actions.setOrderDataBySku).not.toHaveBeenCalled();

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('use ticket. Please try again later', false);
  });
});
