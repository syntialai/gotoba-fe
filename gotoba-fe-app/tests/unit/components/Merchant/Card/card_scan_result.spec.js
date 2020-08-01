import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import { formatPrice, formatDate, isPassed } from '@/utils/filter';
import CardScanResult from '@/components/Merchant/Card/CardScanResult.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/utils/filter');
formatPrice
  .mockImplementation((num) => `Rp${num.toString().substr(0, 2)}.000,00`);
formatDate
  .mockImplementation(() => 'Friday, 31 Jul 2020');

describe('CardScanResult.vue', () => {
  const expectedData = {
    price: 'Rp50.000',
    status: {
      if: 'Expired',
      elif: 'Available',
      else: 'Used',
    },
    mediaData: {
      if: { sku: 'JOUR_0001' },
      else: { sku: 'REST_0001' },
    },
    items: [{
      expired_date: 'Friday, 31 Jul 2020',
      quantity: 1,
      status: 'Expired',
    }],
  };
  const props = {
    price: 100000,
    discount: 50000,
    expiredDate: '2020-07-31',
    redeem: true,
    quantity: 1,
  };

  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    isPassed
      .mockImplementationOnce(() => true)
      .mockImplementation(() => false);

    getters = {
      journeyDataBySku: () => ({ sku: 'JOUR_0001' }),
      restaurantData: () => ({ sku: 'REST_0001' }),
    };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(CardScanResult, {
      propsData: {
        result: props,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check price computed to call formatPrice and return formattedPrice', () => {
    expect(formatPrice).toHaveBeenCalledTimes(1);
    expect(formatPrice).toHaveBeenCalledWith(props.price - props.discount, false, true);
    expect(wrapper.vm.price).toMatch(expectedData.price);
  });

  it('Check items computed to call formatDate function and return customize props', () => {
    expect(formatDate).toHaveBeenCalledTimes(1);
    expect(formatDate).toHaveBeenCalledWith(new Date(props.expiredDate));
    expect(wrapper.vm.items).toStrictEqual(expectedData.items);
  });

  it('Check status computed to return Expired when time is passed', () => {
    expect(wrapper.vm.status).toMatch(expectedData.status.if);
  });

  it('Check status computed to return Available when time is not passed and redeem', async () => {
    wrapper.setProps({
      result: {
        expiredDate: '2020-12-12',
        redeem: true,
      },
    });
    await flushPromises();

    expect(wrapper.vm.status).toMatch(expectedData.status.elif);
  });

  it('Check status computed to return Used when time is not passed and not redeem', async () => {
    wrapper.setProps({
      result: {
        expiredDate: '2020-12-12',
        redeem: false,
      },
    });
    await flushPromises();

    expect(wrapper.vm.status).toMatch(expectedData.status.else);
  });

  it('Check mediaData computed to call restaurantData when wisataSku is not exist', () => {
    expect(wrapper.vm.mediaData).toStrictEqual(expectedData.mediaData.else);
  });

  it('Check mediaData computed to call restaurantData when wisataSku is not exist', async () => {
    wrapper.setProps({
      result: {
        wisataSku: 'ABC',
      },
    });
    await flushPromises();

    expect(wrapper.vm.mediaData).toStrictEqual(expectedData.mediaData.if);
  });
});
