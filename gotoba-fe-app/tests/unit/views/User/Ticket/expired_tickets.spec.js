import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import ExpiredTicket from '@/views/User/Ticket/ExpiredTicket.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('ExpiredTicket.vue', () => {
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
    wrapper = shallowMount(ExpiredTicket, {
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
