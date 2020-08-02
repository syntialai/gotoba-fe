import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import ExpiredTicket from '@/views/User/Ticket/ExpiredTicket.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('ExpiredTicket.vue', () => {
  let getters;
  let store;
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

  it('Check wrapper is vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
