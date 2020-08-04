import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import { formatPrice } from '@/utils/filter';
import OrderItems from '@/components/User/OrderItems.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock('@/utils/filter');
formatPrice
  .mockImplementation((num) => `Rp${num.toString().substr(0, 2)}.000,00`);

describe('OrderItems.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    prices: '75.000',
    discounts: '50.000',
    quantities: {
      one: '1 pc',
      more: '5 pcs',
    },
  };
  const props = {
    price: 75000,
    discountPrice: 25000,
    quantity: 1,
    image: '/img.png',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(OrderItems, {
      propsData: {
        ...props,
      },
      localVue,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check quantities computed return 1 pc when quantity is 1', () => {
    expect(wrapper.vm.quantities).toMatch(expectedData.quantities.one);
  });

  it('Check quantities computed return 5 pcs when quantity is 5', () => {
    wrapper.setProps({
      quantity: 5,
    });
    expect(wrapper.vm.quantities).toMatch(expectedData.quantities.more);
  });

  it('Check price computed to call formatPrice utils', () => {
    expect(formatPrice).toHaveBeenCalledTimes(2);
    expect(formatPrice).toHaveBeenCalledWith(props.price);
    expect(wrapper.vm.prices).toMatch(expectedData.prices);
  });

  it('Check total computed to call formatPrice utils', () => {
    expect(formatPrice).toHaveBeenCalledTimes(2);
    expect(formatPrice).toHaveBeenCalledWith(props.price - props.discountPrice);
    expect(wrapper.vm.discounts).toMatch(expectedData.discounts);
  });
});
