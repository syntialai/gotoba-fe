import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import ValidTicket from '@/views/User/Ticket/ValidTicket.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('ValidTicket.vue', () => {
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
    wrapper = shallowMount(ValidTicket, {
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
