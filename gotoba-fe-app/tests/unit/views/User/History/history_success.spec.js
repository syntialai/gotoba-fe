import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import HistorySuccess from '@/views/User/History/HistorySuccess.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HistorySuccess.vue', () => {
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
      getAcceptedPayment: jest.fn(),
    };
    getters = {
      acceptedPaymentData: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(HistorySuccess, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(actions.getAcceptedPayment).toHaveBeenCalledTimes(1);
    expect(actions.getAcceptedPayment.mock.calls[0][1]).toMatch(expectedData.userSku);
  });
});
