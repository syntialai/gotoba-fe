import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import { formatDate } from '@/utils/filter';
import HistoryDetails from '@/views/User/History/HistoryDetails.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/utils/filter');
formatDate.mockImplementation(() => 'Friday, 31 Jul 2020');

const $route = {
  params: {
    sku: 'PAY_MERC_0001',
  },
};

describe('HistoryDetails.vue', () => {
  const expectedData = {
    orderInfo: [
      {
        name: 'Order Id',
        value: 21231231,
      },
      {
        name: 'Transaction Date',
        value: 'Friday, 31 Jul 2020',
      },
      {
        name: 'Purchase Status',
        value: 'WAITING',
      },
    ],
    paymentDataBySku: {
      id: 21231231,
      createdAt: new Date('2020-07-31').toString(),
      status: 'WAITING',
      orderSku: 'ORD_0006,ORD_0008',
    },
    orderSku: ['ORD_0006', 'ORD_0008'],
  };

  // eslint-disable-next-line no-unused-vars
  let actions;
  let getters;
  let store;
  // eslint-disable-next-line no-unused-vars
  let wrapper;

  beforeEach(() => {
    getters = {
      paymentDataBySku: () => ({
        id: 21231231,
        createdAt: new Date('2020-07-31').toString(),
        status: 'WAITING',
        orderSku: 'ORD_0006,ORD_0008',
      }),
      filteredOrderData: () => [],
      orderTotal: () => 0,
    };
    actions = {
      getPaymentBySku: jest.fn(),
      getSomeOrderData: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(HistoryDetails, {
      mocks: {
        $route,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(actions.getPaymentBySku).toHaveBeenCalledTimes(1);
    expect(actions.getPaymentBySku.mock.calls[0][1]).toMatch($route.params.sku);
  });

  it('Check watcher to call action', async () => {
    store.hotUpdate({
      getters: {
        paymentDataBySku: () => expectedData.paymentDataBySku,
      },
    });
    await flushPromises();

    expect(getters.paymentDataBySku).toBeTruthy();
    expect(actions.getSomeOrderData).toHaveBeenCalledTimes(1);
    expect(actions.getSomeOrderData.mock.calls[0][1]).toStrictEqual(expectedData.orderSku);
  });

  it('Check orderInfo computed to return value', () => {
    expect(wrapper.vm.orderInfo).toStrictEqual(expectedData.orderInfo);
  });
});
