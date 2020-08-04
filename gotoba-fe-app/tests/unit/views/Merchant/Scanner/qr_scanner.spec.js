import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import QrScanner from '@/views/Merchant/Scanner/QrScanner.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);

const $router = {
  push: jest.fn(),
};

describe('QrScanner.vue', () => {
  const expectedData = {
    link: '/merchant/scan/result',
    sku: 'TICK_0001',
  };

  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      setTicketBySku: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(QrScanner, {
      mocks: {
        $router,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check onDecode method to call actions and $router, and change showScanner data', async () => {
    wrapper.vm.onDecode(expectedData.sku);
    await flushPromises();

    expect(wrapper.vm.$data.qrcodeResult).toMatch(expectedData.sku);

    expect(actions.setTicketBySku).toHaveBeenCalledTimes(1);
    expect(actions.setTicketBySku.mock.calls[0][1]).toStrictEqual({
      sku: expectedData.sku,
    });

    expect(wrapper.vm.$data.showScanner).toBe(false);

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData.link);
  });
});
