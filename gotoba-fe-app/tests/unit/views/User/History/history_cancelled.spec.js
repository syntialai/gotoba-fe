import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import HistoryCancelled from '@/views/User/History/HistoryCancelled.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HistoryCancelled.vue', () => {
  const expectedData = {
    userSku: 'USER_0001',
  };

  // eslint-disable-next-line no-unused-vars
  let actions;
  let getters;
  let store;
  // eslint-disable-next-line no-unused-vars
  let wrapper;

  beforeEach(() => {
    actions = {
      getCancelledPayment: jest.fn(),
    };
    getters = {
      cancelledPaymentData: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(HistoryCancelled, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(actions.getCancelledPayment).toHaveBeenCalledTimes(1);
    expect(actions.getCancelledPayment.mock.calls[0][1]).toMatch(expectedData.userSku);
  });
});
