import { shallowMount } from '@vue/test-utils';
import { formatPrice } from '@/utils/filter';
import PaymentDetail from '@/components/User/Payment/PaymentDetail.vue';

jest.mock('@/utils/filter');
formatPrice
  .mockImplementationOnce(() => '100.000,00')
  .mockImplementation(() => '50.000,00');

describe('PaymentDetail.vue', () => {
  const expectedData = {
    prices: '100.000,00',
    discounts: '50.000,00',
    totals: '50.000,00',
  };
  const props = {
    price: 100000,
    discount: 50000,
    total: 50000,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PaymentDetail, {
      propsData: {
        ...props,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check prices computed to call formatPrice utils', () => {
    expect(formatPrice).toHaveBeenCalledTimes(3);
    expect(formatPrice).toHaveBeenCalledWith(props.price, true);
    expect(wrapper.vm.prices).toMatch(expectedData.prices);
  });

  it('Check discounts computed to call formatPrice utils', () => {
    expect(formatPrice).toHaveBeenCalledTimes(3);
    expect(formatPrice).toHaveBeenCalledWith(props.discount, true);
    expect(wrapper.vm.discounts).toMatch(expectedData.discounts);
  });

  it('Check totals computed to call formatPrice utils', () => {
    expect(formatPrice).toHaveBeenCalledTimes(3);
    expect(formatPrice).toHaveBeenCalledWith(props.total, true);
    expect(wrapper.vm.totals).toMatch(expectedData.totals);
  });
});
