import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import RestaurantProfile from '@/views/User/Restaurant/RestaurantProfile.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  params: {
    sku: 'HEND_0001',
  },
};

describe('RestaurantProfile.vue', () => {
  const expectedData = {
    image: '/img.png',
    title: 'Restaurant 1',
    sku: 'WIST_0001',
    merchantSku: 'SKU',
    price: 100000,
  };
  // eslint-disable-next-line no-unused-vars
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
        merchantSku: 'SKU',
        price: 100000,
      }),
      restaurantMenus: () => ([
        {
          image: '',
          title: 'Menu 1',
          sku: 'MENU_0001',
          merchantSku: 'MERC_SKU',
          price: 100000,
        },
      ]),
    };
    actions = {
      getRestaurantDataBySku: jest.fn(),
      getRestaurantMenu: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(RestaurantProfile, {
      mocks: {
        $route,
      },
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check getRestaurantDataBySku actions to be called when created', () => {
    expect(actions.getRestaurantDataBySku).toHaveBeenCalledTimes(1);
    expect(actions.getRestaurantDataBySku.mock.calls[0][1]).toEqual($route.params.sku);
  });

  it('Check watcher to call getRestaurantMenu actions when restaurantData is changed', async () => {
    store.hotUpdate({
      getters: {
        restaurantData: () => ({
          image: '/img.png',
          title: 'Restaurant 1',
          sku: 'WIST_0001',
          merchantSku: 'MERC_SKU',
          price: 100000,
        }),
      },
    });
    await flushPromises();

    expect(actions.getRestaurantMenu).toHaveBeenCalledTimes(1);
    expect(actions.getRestaurantMenu.mock.calls[0][1]).toMatch(expectedData.merchantSku);
  });
});
