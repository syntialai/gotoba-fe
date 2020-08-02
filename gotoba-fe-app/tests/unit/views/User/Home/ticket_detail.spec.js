import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import api from '@/api/api';
import { toast } from '@/utils/tool';
import TicketDetail from '@/views/User/Home/TicketDetail.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  PostOrderDetail: jest.fn(),
  EditOrderDetail: jest.fn(),
}));
jest.mock('@/utils/tool');

const $route = {
  params: {
    sku: 'TICK_0001',
  },
};

const $router = {
  push: jest.fn(),
};

describe('TicketDetail.vue', () => {
  const expectedData = {
    userSku: 'USER_0001',
    ticketData: {
      expiredDate: '2020-12-12',
      title: 'Ticket',
      image: '/img.png',
      price: 100000,
      discount: 50000,
      sku: 'TICK_0001',
      merchantSku: 'MERC_0001',
      category: 'journey',
      wisataSku: 'WIST_0001',
    },
    setData: {
      quantity: 1,
      redeem: true,
      expiredDate: '2020-12-12',
      title: 'Ticket',
      image: '/img.png',
      price: 100000,
      discount: 50000,
      ticketSku: 'TICK_0001',
      merchantSku: 'MERC_0001',
      category: 'journey',
      wisataSku: 'WIST_0001',
      userSku: 'USER_0001',
    },
    setEditData: {
      quantity: 2,
      redeem: true,
      expiredDate: '2020-12-12',
      title: 'Ticket',
      image: '/img.png',
      price: 100000,
      discount: 50000,
      ticketSku: 'TICK_0001',
      merchantSku: 'MERC_0001',
      category: 'journey',
      wisataSku: 'WIST_0001',
      userSku: 'USER_0001',
    },
  };

  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      getTicketBySku: jest.fn(),
      setCartData: jest.fn(),
      setOrderData: jest.fn(),
    };
    getters = {
      ticketData: () => ({
        expiredDate: '2020-12-12',
        title: 'Ticket',
        image: '/img.png',
        price: 100000,
        discount: 50000,
        sku: 'TICK_0001',
        merchantSku: 'MERC_0001',
        category: 'journey',
        wisataSku: 'WIST_0001',
      }),
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(TicketDetail, {
      data() {
        return {
          orderSku: '',
          quantity: 1,
        };
      },
      mocks: {
        $route,
        $router,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check getTicketBySku actions called when created', () => {
    expect(actions.getTicketBySku).toHaveBeenCalledTimes(1);
    expect(actions.getTicketBySku.mock.calls[0][1]).toMatch($route.params.sku);
  });

  it('Check setData method to return data', () => {
    const setData = wrapper.vm.setData();

    expect(setData).toStrictEqual(expectedData.setData);
  });

  it('Check payNow method to call addToCart method and $router', async () => {
    const payNow = jest.spyOn(wrapper.vm, 'payNow');
    wrapper.vm.payNow();
    await flushPromises();

    expect(payNow).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/cart');
  });

  it('Check addToCart method to call PostOrderDetail api', async () => {
    api.PostOrderDetail.mockResolvedValue({
      code: 200,
      status: 'OK',
      data: {
        sku: 'ORD_0001',
      },
    });
    wrapper.vm.addToCart();
    await flushPromises();

    expect(api.PostOrderDetail).toHaveBeenCalledTimes(1);
    expect(api.PostOrderDetail).toHaveBeenCalledWith(
      expectedData.userSku,
      expectedData.setData,
    );

    expect(wrapper.vm.$data.orderSku).toMatch('ORD_0001');
    expect(wrapper.vm.$data.quantity).toBe(2);

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Ticket has been added to cart!');
  });

  it('Check addToCart method to call PostOrderDetail api and call error toast', async () => {
    api.PostOrderDetail.mockResolvedValue({
      error: 'Bad Request',
    });
    wrapper.vm.addToCart();
    await flushPromises();

    expect(api.PostOrderDetail).toHaveBeenCalledTimes(1);
    expect(api.PostOrderDetail).toHaveBeenCalledWith(
      expectedData.userSku,
      expectedData.setData,
    );

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Error while adding ticket!');
  });

  it('Check addToCart method to call PostOrderDetail api and call error toast - error', async () => {
    api.PostOrderDetail.mockRejectedValue({
      error: 'Bad Request',
    });
    wrapper.vm.addToCart();
    await flushPromises();

    expect(api.PostOrderDetail).toHaveBeenCalledTimes(1);
    expect(api.PostOrderDetail).toHaveBeenCalledWith(
      expectedData.userSku,
      expectedData.setData,
    );

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Error while adding ticket!');
  });

  it('Check addToCart method to call EditOrderDetail api and change data', async () => {
    api.EditOrderDetail.mockResolvedValue({
      code: 200,
      status: 'OK',
    });
    wrapper.setData({
      orderSku: 'ORD_0001',
      quantity: 2,
      data: {
        sku: 'ORD_0001',
      },
    });
    await flushPromises();

    wrapper.vm.addToCart();
    await flushPromises();

    expect(api.EditOrderDetail).toHaveBeenCalledTimes(1);
    expect(api.EditOrderDetail).toHaveBeenCalledWith(
      'ORD_0001',
      expectedData.setEditData,
    );

    expect(wrapper.vm.$data.orderSku).toMatch('ORD_0001');
    expect(wrapper.vm.$data.quantity).toBe(3);

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Ticket has been added to cart!');
  });

  it('Check addToCart method to call EditOrderDetail api and show error toast', async () => {
    api.EditOrderDetail.mockResolvedValue({
      error: 'Not Found',
    });
    wrapper.setData({
      orderSku: 'ORD_0001',
      quantity: 2,
      data: {
        sku: 'ORD_0001',
      },
    });
    await flushPromises();

    wrapper.vm.addToCart();
    await flushPromises();

    expect(api.EditOrderDetail).toHaveBeenCalledTimes(1);
    expect(api.EditOrderDetail).toHaveBeenCalledWith(
      'ORD_0001',
      expectedData.setEditData,
    );

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Error while adding ticket!');
  });

  it('Check addToCart method to call EditOrderDetail api and show error toast - error', async () => {
    api.EditOrderDetail.mockRejectedValue({
      error: 'Not Found',
    });
    wrapper.setData({
      orderSku: 'ORD_0001',
      quantity: 2,
      data: {
        sku: 'ORD_0001',
      },
    });
    await flushPromises();

    wrapper.vm.addToCart();
    await flushPromises();

    expect(api.EditOrderDetail).toHaveBeenCalledTimes(1);
    expect(api.EditOrderDetail).toHaveBeenCalledWith(
      'ORD_0001',
      expectedData.setEditData,
    );

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Error while adding ticket!');
  });
});
