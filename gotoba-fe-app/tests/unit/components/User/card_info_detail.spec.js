import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import { formatPrice, formatDate, toCapitalize } from '@/utils/filter';
import CardInfoDetail from '@/components/User/CardInfoDetail.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock('@/utils/filter');
formatPrice
  .mockImplementation((num) => `Rp${num.toString().substr(0, 2)}.000,00`);
formatDate
  .mockImplementation(() => 'Friday, 31 Jul 2020');
toCapitalize
  .mockImplementation(() => 'Journey');

describe('CardInfoDetail.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    price: 'Rp75.000,00',
    total: 'Rp50.000,00',
    expiredDate: 'Friday, 31 Jul 2020',
    category: 'Journey',
  };
  const props = {
    price: 75000,
    discount: 25000,
    total: 50000,
    category: 'journey',
    expiredDate: '2020-07-31',
    image: '/img.png',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardInfoDetail, {
      propsData: {
        info: props,
      },
      localVue,
      stubs: ['font-awesome-icon'],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check price computed to call formatPrice utils', () => {
    expect(formatPrice).toHaveBeenCalledTimes(2);
    expect(formatPrice).toHaveBeenCalledWith(props.price, true, true);
    expect(wrapper.vm.price).toMatch(expectedData.price);
  });

  it('Check total computed to call formatPrice utils', () => {
    expect(formatPrice).toHaveBeenCalledTimes(2);
    expect(formatPrice).toHaveBeenCalledWith(props.price - props.discount, true, true);
    expect(wrapper.vm.total).toMatch(expectedData.total);
  });

  it('Check expiredDate computed return expiredDate formatted', () => {
    expect(formatDate).toHaveBeenCalledTimes(1);
    expect(formatDate).toHaveBeenCalledWith(new Date(props.expiredDate));
    expect(wrapper.vm.expiredDate).toBe(expectedData.expiredDate);
  });

  it('Check category computed return category formatted', () => {
    expect(toCapitalize).toHaveBeenCalledTimes(1);
    expect(toCapitalize).toHaveBeenCalledWith(props.category);
    expect(wrapper.vm.category).toMatch(expectedData.category);
  });
});
