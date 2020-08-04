import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import { formatDate } from '@/utils/filter';
import api from '@/api/api';
import { setAlert } from '@/utils/tool';
import CardPayment from '@/components/Merchant/Card/CardPayment.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  ApproveOrder: jest.fn(),
  RejectOrder: jest.fn(),
}));
jest.mock('@/utils/tool');
jest.mock('@/utils/filter');
formatDate.mockImplementation(() => 'Wednesday, 5 Aug 2020');

describe('CardPayment.vue', () => {
  const expectedData = {
    expiryDate: 'Wednesday, 5 Aug 2020',
    status: {
      if: [true, 'ACCEPTED'],
      else: [false, 'REJECTED'],
    },
  };
  const data = {
    propChange: {
      pay: true,
      item: {
        sku: 'ORD_0001',
        status: 2,
        expiredDate: '2020-08-05',
        category: 'wisata',
      },
    },
  };
  const props = {
    pay: true,
    item: {
      sku: 'ORD_0001',
      status: 3,
      expiredDate: '2020-08-05',
      category: 'restaurant',
    },
  };

  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      addItineraryOrderCount: jest.fn(),
      addRestaurantOrderCount: jest.fn(),
      getMerchantOrderData: jest.fn(),
    };
    store = new Vuex.Store({ actions });
    wrapper = shallowMount(CardPayment, {
      propsData: {
        ...props,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check expiryDate computed return formatted expiredDate', () => {
    expect(wrapper.vm.expiryDate).toMatch(expectedData.expiryDate);
  });

  it('Check status in case #1', () => {
    expect(wrapper.vm.status).toStrictEqual(expectedData.status.if);
  });

  it('Check status in case #2', async () => {
    wrapper.setProps({
      ...data.propChange,
    });
    await flushPromises();

    expect(wrapper.vm.status).toStrictEqual(expectedData.status.else);
  });

  it('Check acceptOrder function to call api, alert and actions - restaurant', async () => {
    api.ApproveOrder.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    wrapper.vm.acceptOrder();
    await flushPromises();

    expect(actions.addRestaurantOrderCount).toHaveBeenCalledTimes(1);
    expect(actions.getMerchantOrderData).toHaveBeenCalledTimes(1);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('accepted order', true);
  });

  it('Check acceptOrder function to call api, alert and actions - itinerary', async () => {
    wrapper.setProps({
      ...data.propChange,
    });
    await flushPromises();

    api.ApproveOrder.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    wrapper.vm.acceptOrder();
    await flushPromises();

    expect(actions.addItineraryOrderCount).toHaveBeenCalledTimes(1);
    expect(actions.getMerchantOrderData).toHaveBeenCalledTimes(1);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('accepted order', true);
  });

  it('Check acceptOrder function to call api and alert but not call actions', async () => {
    api.ApproveOrder.mockResolvedValue({
      error: 'Bad Request',
    });

    wrapper.vm.acceptOrder();
    await flushPromises();

    expect(actions.getMerchantOrderData).not.toHaveBeenCalled();

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('accept order', false);
  });

  it('Check acceptOrder function to call api and alert but not call actions - error', async () => {
    api.ApproveOrder.mockRejectedValue({
      error: 'Bad Request',
    });

    wrapper.vm.acceptOrder();
    await flushPromises();

    expect(actions.getMerchantOrderData).not.toHaveBeenCalled();

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('accept order', false);
  });

  it('Check rejectOrder function to call api and actions', async () => {
    api.RejectOrder.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    wrapper.vm.rejectOrder();
    await flushPromises();

    expect(actions.getMerchantOrderData).toHaveBeenCalledTimes(1);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('rejected order', true);
  });

  it('Check rejectOrder function to call api and not call actions', async () => {
    api.RejectOrder.mockResolvedValue({
      error: 'Bad Request',
    });

    wrapper.vm.rejectOrder();
    await flushPromises();

    expect(actions.getMerchantOrderData).not.toHaveBeenCalled();

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('reject order', false);
  });

  it('Check rejectOrder function to call api and not call actions - error', async () => {
    api.RejectOrder.mockRejectedValue({
      error: 'Bad Request',
    });

    wrapper.vm.rejectOrder();
    await flushPromises();

    expect(actions.getMerchantOrderData).not.toHaveBeenCalled();

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('reject order', false);
  });
});
