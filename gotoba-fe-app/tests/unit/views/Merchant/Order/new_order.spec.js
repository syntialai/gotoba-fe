import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import NewOrder from '@/views/Merchant/Order/NewOrder.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('NewOrder.vue', () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      merchantWaitingResponseData: () => [],
    };
    store = new Vuex.Store({
      getters,
    });
    wrapper = shallowMount(NewOrder, {
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
