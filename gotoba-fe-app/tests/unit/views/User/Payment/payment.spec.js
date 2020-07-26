import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import api from '@/api/api';
import { toast } from '@/utils/tool';
import Payment from '@/views/User/Payment/Payment.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  PostPayment: jest.fn(),
  CheckoutOrder: jest.fn(),
}));
jest.mock('@/utils/tool');

const $router = {
  push: jest.fn(),
};

describe('Payment.vue', () => {
  const expectedData = {
    selected: [],
    route: '/order/thankyou/PAY_0001',
    total: 50000,
    orderData: [
      {
        sku: 'ORD_0001',
        image: 'img.png',
        name: 'OK',
        quantity: 1,
      },
    ],
    orderTotal: {
      item: 1,
      price: 100000,
      discount: 50000,
    },
    payment: {
      total: 50000,
      status: 'WAITING',
      merchantSku: 'SYNT_0001',
      orderSku: 'ORD_0001',
    },
    userSku: 'HEND_0001',
  };
  const data = {
    loading: false,
  };
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      orderData: () => [
        {
          sku: 'ORD_0001',
          image: 'img.png',
          name: 'OK',
          quantity: 1,
          merchantSku: 'SYNT_0001',
        },
      ],
      orderTotal: () => ({
        item: 1,
        price: 100000,
        discount: 50000,
      }),
      userSku: () => 'HEND_0001',
    };
    store = new Vuex.Store({ getters });

    wrapper = shallowMount(Payment, {
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

  it('Check total computed return total of orderTotal getters', () => {
    expect(wrapper.vm.total).toBe(expectedData.total);
  });

  it('Check pay method to success call api and goToThanksPage method', async () => {
    api.PostPayment.mockResolvedValue({
      data: {
        sku: 'OK',
      },
    });
    api.CheckoutOrder.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    const spyMethod = jest.spyOn(wrapper.vm, 'goToThanksPage');
    wrapper.vm.pay();
    expect(wrapper.vm.$data.loading).toBe(true);

    await flushPromises();

    expect(api.PostPayment).toHaveBeenCalledTimes(1);
    expect(api.PostPayment).toHaveBeenCalledWith(expectedData.userSku, expectedData.payment);

    expect(api.CheckoutOrder).toHaveBeenCalledTimes(1);
    expect(api.CheckoutOrder).toHaveBeenCalledWith(expectedData.payment.orderSku);

    expect(wrapper.vm.$data.loading).toBe(false);
    expect(spyMethod).toHaveBeenCalledTimes(1);
  });

  it('Check pay method to not call api and goToThanksPage method', async () => {
    api.PostPayment.mockRejectedValue(new Error());
    api.CheckoutOrder.mockRejectedValue({
      status: 400,
      error: 'Bad Request',
    });

    const spyMethod = jest.spyOn(wrapper.vm, 'goToThanksPage');
    wrapper.vm.pay();
    expect(wrapper.vm.$data.loading).toBe(true);

    await flushPromises();

    expect(api.PostPayment).toHaveBeenCalledTimes(1);
    expect(api.PostPayment).toHaveBeenCalledWith(expectedData.userSku, expectedData.payment);

    expect(api.CheckoutOrder).not.toHaveBeenCalled();

    expect(wrapper.vm.$data.loading).toBe(false);
    expect(spyMethod).not.toHaveBeenCalled();

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Error while checkout item!');
  });

  it('Check goToThanksPage method to call router', async () => {
    wrapper.vm.goToThanksPage('PAY_0001');
    await flushPromises();

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData.route);
  });
});
