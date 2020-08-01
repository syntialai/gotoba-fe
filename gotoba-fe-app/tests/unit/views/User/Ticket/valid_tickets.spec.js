import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import ValidTicket from '@/views/User/Ticket/ValidTicket.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('ValidTicket.vue', () => {
  const expectedData = {
    valid: [],
    expired: [],
  };

  let getters;
  let store;
  // eslint-disable-next-line no-unused-vars
  let wrapper;

  beforeEach(() => {
    getters = {
      approvedOrderData: () => ({
        valid: [],
        expired: [],
      }),
    };
    store = new Vuex.Store({
      getters,
    });
    wrapper = shallowMount(ValidTicket, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check getters is exist', () => {
    expect(store.getters.getApprovedOrderData).toStrictEqual(expectedData);
  });
});
