import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import ShowQRCode from '@/views/User/Ticket/ShowQRCode.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $route = {
  params: {
    sku: 'SKU',
  },
};

describe('ShowQRCode.vue', () => {
  let actions;
  let getters;
  let store;
  // eslint-disable-next-line no-unused-vars
  let wrapper;

  beforeEach(() => {
    actions = {
      getOrderDataBySku: jest.fn(),
    };
    getters = {
      orderDataBySku: () => [],
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(ShowQRCode, {
      mocks: {
        $route,
      },
      localVue,
      store,
      stubs: ['b-icon'],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(actions.getOrderDataBySku).toHaveBeenCalledTimes(1);
    expect(actions.getOrderDataBySku.mock.calls[0][1]).toMatch($route.params.sku);
  });
});
