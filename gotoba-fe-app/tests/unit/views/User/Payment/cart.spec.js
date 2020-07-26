import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Cart from '@/views/User/Payment/Cart.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $router = {
  push: jest.fn(),
};

describe('Cart.vue', () => {
  const expectedData = {
    selected: [],
    route: '/payment',
    cartData: [
      [{
        sku: 'TEST',
      }],
      [{
        sku: 'ORD_0001',
        image: 'img.png',
        name: 'OK',
        quantity: 1,
      }]
    ],
    userSku: 'HEND_0001',
  };
  const data = {
    select: true,
    selected: [],
    loading: false,
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cartData: () => [
        {
          sku: 'ORD_0001',
          image: 'img.png',
          name: 'OK',
          quantity: 1,
        },
      ],
      orderTotal: () => ({
        item: 1,
        price: 100000,
        discount: 50000,
      }),
      userSku: () => 'HEND_0001',
    };
    actions = {
      setOrderData: jest.fn(),
      selectAllCartData: jest.fn(),
      getCartData: jest.fn(),
      setCartData: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });

    wrapper = shallowMount(Cart, {
      data() {
        return {
          ...data,
        };
      },
      mocks: {
        $router,
      },
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check getCartData actions called when created', () => {
    expect(actions.getCartData).toHaveBeenCalledTimes(1);
    expect(actions.getCartData.mock.calls[0][1]).toMatch(expectedData.userSku);
  });

  it('Check checkAll method to change selected to [] when select data is true', async () => {
    wrapper.vm.checkAll();
    await flushPromises();

    expect(wrapper.vm.$data.select).toBe(false);
    expect(wrapper.vm.$data.selected).toStrictEqual([]);
  });

  it('Check checkAll method to change selected to cartData when select data is false', async () => {
    wrapper.setData({
      select: false,
    });
    wrapper.vm.checkAll();
    await flushPromises();

    expect(wrapper.vm.$data.select).toBe(true);
    expect(wrapper.vm.$data.selected).toStrictEqual(expectedData.cartData[1]);
  });

  it('Check total method to call setOrderData actions', async () => {
    wrapper.vm.total();
    await flushPromises();

    expect(actions.setOrderData).toHaveBeenCalledTimes(1);
    expect(actions.setOrderData.mock.calls[0][1]).toStrictEqual(expectedData.selected);
  });

  it('Check checkout method to change loading state and call router', async () => {
    wrapper.vm.checkout();
    await flushPromises();

    expect(wrapper.vm.$data.loading).toBe(true);
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData.route);
  });

  it('Check cartData watch to change selected data when cartData is changed', async () => {
    actions.setCartData(expectedData.cartData[0]);
    await flushPromises();

    expect(wrapper.vm.$data.selected).toStrictEqual(expectedData.cartData[0]);
  });
});
