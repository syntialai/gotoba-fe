import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import api from '@/api/api';
import { toast } from '@/utils/tool';
import CartItem from '@/components/User/Payment/CartItem.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  imageUrl: jest.fn().mockReturnValue(
    'http://localhost:8800/image/img.png',
  ),
  EditOrderDetail: jest.fn(),
}));
jest.mock('@/utils/tool');

describe('CartItem.vue', () => {
  const expectedData = {
    updateQuantity: 4,
    imageUrl: 'http://localhost:8800/image/img.png',
    data: {
      quantity: 4,
      image: 'img.png',
      sku: 'SKU',
    },
  };
  const item = {
    ticket: {
      quantity: 1,
      image: 'img.png',
      sku: 'SKU',
    },
  };
  const data = {
    itemCount: 4,
  };
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      removeOrder: jest.fn(),
    };
    store = new Vuex.Store({ actions });
    wrapper = shallowMount(CartItem, {
      propsData: { ...item },
      data() {
        return data;
      },
      localVue,
      store,
      stubs: [
        'update:quantity',
        'b-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(api.imageUrl).toHaveBeenCalledTimes(1);
    expect(api.imageUrl).toHaveBeenCalledWith(expectedData.data.image);
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check updateQuantity method emit to update:quantity and success call api when called', async () => {
    api.EditOrderDetail.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    wrapper.vm.updateQuantity();
    await flushPromises();

    expect(wrapper.emitted()['update:quantity']).toBeTruthy();
    expect(wrapper.emitted()['update:quantity'].length).toBe(1);
    expect(wrapper.emitted()['update:quantity'][0][0]).toEqual(expectedData.updateQuantity);

    expect(api.EditOrderDetail).toHaveBeenCalledTimes(1);
    expect(api.EditOrderDetail).toHaveBeenCalledWith('SKU', expectedData.data);

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Updated cart item!');
  });

  it('Check updateQuantity method emit to update:quantity and catch error when called', async () => {
    api.EditOrderDetail.mockRejectedValue(new Error());

    wrapper.vm.updateQuantity();
    await flushPromises();

    expect(wrapper.emitted()['update:quantity']).toBeTruthy();
    expect(wrapper.emitted()['update:quantity'].length).toBe(1);
    expect(wrapper.emitted()['update:quantity'][0][0]).toEqual(expectedData.updateQuantity);

    expect(api.EditOrderDetail).toHaveBeenCalledTimes(1);
    expect(api.EditOrderDetail).toHaveBeenCalledWith('SKU', expectedData.data);

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Error while adding ticket');
  });
});
