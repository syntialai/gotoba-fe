import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import PaymentOrder from '@/views/User/Payment/PaymentOrder.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $route = {
  params: {
    sku: 'PAY_0001',
  },
};

describe('PaymentOrder.vue', () => {
  const expectedData = {
    goToHistory: '/history/details/PAY_0001',
    total: 50000,
    orderTotal: {
      item: 1,
      price: 100000,
      discount: 50000,
    },
  };
  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      paymentDataBySku: () => ({
        total: 50000,
        status: 'WAITING',
        merchantSku: 'SYNT_0001',
        orderSku: 'ORD_0001',
        sku: 'PAY_0001',
      }),
      orderTotal: () => ({
        item: 1,
        price: 100000,
        discount: 50000,
      }),
    };
    actions = {
      getPaymentBySku: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });

    wrapper = shallowMount(PaymentOrder, {
      mocks: {
        $route,
      },
      store,
      localVue,
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check actions to be called when created', () => {
    expect(actions.getPaymentBySku).toHaveBeenCalledTimes(1);
    expect(actions.getPaymentBySku.mock.calls[0][1]).toBe($route.params.sku);
  });

  it('Check total computed return total of orderTotal getters', () => {
    expect(wrapper.vm.total).toBe(expectedData.total);
  });

  it('Check goToHistory computed return goToHistory link', () => {
    expect(wrapper.vm.goToHistory).toMatch(expectedData.goToHistory);
  });
});
