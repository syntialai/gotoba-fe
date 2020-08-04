import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import { formatPrice } from '@/utils/filter';
import BottomNavPayment from '@/components/User/Payment/BottomNavPayment.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock('@/utils/filter');

describe('BottomNavPayment.vue', () => {
  const props = {
    totalPrice: 100000,
  };
  let wrapper;

  beforeEach(() => {
    formatPrice.mockImplementation(() => 'Rp100.000,00');
    wrapper = shallowMount(BottomNavPayment, {
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

  it('Check price computed to call formatPrice utils', () => {
    expect(formatPrice).toHaveBeenCalledTimes(1);
    expect(formatPrice).toHaveBeenCalledWith(props.totalPrice, true, true);
    expect(wrapper.vm.price).toMatch('Rp100.000,00');
  });
});
