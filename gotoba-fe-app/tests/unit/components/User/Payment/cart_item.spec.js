import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import CartItem from '@/components/User/Payment/CartItem.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CartItem.vue', () => {
  const expectedData = 4;
  const item = {
    quantity: 1,
  };
  const data = {
    itemCount: 4,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CartItem, {
      propsData: { ...item },
      data() {
        return data;
      },
      localVue,
      stubs: [
        'update:quantity',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check updateQuantity method emit to update:quantity when called', async () => {
    wrapper.vm.updateQuantity();
    await flushPromises();

    expect(wrapper.emitted()['update:quantity']).toBeTruthy();
    expect(wrapper.emitted()['update:quantity'].length).toBe(1);
    expect(wrapper.emitted()['update:quantity'][0][0]).toEqual(expectedData);
  });
});
