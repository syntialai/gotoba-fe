import { shallowMount } from '@vue/test-utils';
import QRCodeInfo from '@/components/User/Ticket/QRCodeInfo.vue';

describe('QRCodeInfo.vue', () => {
  const expectedData = {
    validDate: 'Friday, 24 Jul 2020',
    qrCodeValue: 'TICK_0001',
  };
  const data = {
    ticket: {
      redeem: false,
      expiredDate: '2020-07-24',
      sku: 'TICK_0001',
      merchantSku: 'HEND_0001',
      price: 100000,
      discount: 50000,
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(QRCodeInfo, {
      propsData: {
        ...data,
      },
      stubs: ['vue-qrcode'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check validDate computed return formatted date', () => {
    expect(wrapper.vm.validDate).toMatch(expectedData.validDate);
  });

  it('Check qrCodeValue computed return stringified JSON', () => {
    expect(wrapper.vm.qrCodeValue).toBe(expectedData.qrCodeValue);
  });
});
