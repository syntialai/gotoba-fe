import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import RecentOrder from '@/views/Merchant/Order/RecentOrder.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RecentOrder.vue', () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      merchantResponsedData: () => [],
    };
    store = new Vuex.Store({
      getters,
    });
    wrapper = shallowMount(RecentOrder, {
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
