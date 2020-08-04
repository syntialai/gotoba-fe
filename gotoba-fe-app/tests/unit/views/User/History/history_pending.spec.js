import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import HistoryPending from '@/views/User/History/HistoryPending.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HistoryPending.vue', () => {
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
      getWaitingPayment: jest.fn(),
    };
    getters = {
      waitingPaymentData: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(HistoryPending, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(actions.getWaitingPayment).toHaveBeenCalledTimes(1);
    expect(actions.getWaitingPayment.mock.calls[0][1]).toMatch(expectedData.userSku);
  });
});
