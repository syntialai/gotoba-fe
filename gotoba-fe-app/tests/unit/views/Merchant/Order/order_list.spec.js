import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import OrderList from '@/views/Merchant/Order/OrderList.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('OrderList.vue', () => {
  const expectedData = {
    info1: 'Ordered Restaurant Ticket',
    value1: 1,
    info2: 'Ordered Itinerary Ticket',
    value2: 2,
  };

  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      getMerchantOrderData: jest.fn(),
      getMerchantOrderCount: jest.fn(),
    };
    getters = {
      merchantOrderCount: () => ({
        itinerary: 2,
        restaurant: 1,
      }),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(OrderList, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(actions.getMerchantOrderData).toHaveBeenCalledTimes(1);
    expect(actions.getMerchantOrderCount).toHaveBeenCalledTimes(1);
  });

  it('Check cardInfo to return count of ordered ticket', () => {
    expect(wrapper.vm.cardInfo).toStrictEqual(expectedData);
  });
});
