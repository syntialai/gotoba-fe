import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Bistro from '@/views/Merchant/Bistro/Bistro.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('Bistro.vue', () => {
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      restaurantData: () => ({
        image: '',
        title: 'Restaurant 1',
        sku: 'WIST_0001',
        price: 100000,
      }),
      restaurantMenu: () => ([
        {
          image: '',
          title: 'Menu 1',
          sku: 'MENU_0001',
          price: 100000,
        },
      ]),
      userSku: () => 'HEND_0001',
    };
    actions = {
      getRestaurantDataByMerchantSku: jest.fn(),
      getRestaurantMenu: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(Bistro, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('Check getRestaurantDataByMerchantSku and getRestaurantMenu actions to be called when created', () => {
    expect(actions.getRestaurantDataByMerchantSku).toHaveBeenCalledTimes(1);
    expect(actions.getRestaurantMenu).toHaveBeenCalledTimes(1);

    expect(actions.getRestaurantDataByMerchantSku.mock.calls[0][1]).toEqual('HEND_0001');
    expect(actions.getRestaurantMenu.mock.calls[0][1]).toEqual('HEND_0001');
  });
});
