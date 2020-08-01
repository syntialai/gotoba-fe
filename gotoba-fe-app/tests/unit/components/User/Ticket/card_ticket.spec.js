import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardTicket from '@/components/User/Ticket/CardTicket.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CardTicket.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    isExpired: [true, false],
    goToQRCode: '/my-tickets/TICK_0001',
    expiredDate: '23 Jul 2020',
  };
  const data = {
    image: '/img.png',
    expiredDate: '2020-07-23',
    sku: 'TICK_0001',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardTicket, {
      propsData: {
        ticket: data,
      },
      localVue,
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check isExpired computed return true if the date is passed', () => {
    expect(wrapper.vm.isExpired).toBe(expectedData.isExpired[0]);
  });

  it('Check isExpired computed return false if the date is not passed yet', async () => {
    wrapper.setProps({
      ticket: {
        expiredDate: '2021-01-01',
      },
    });
    await flushPromises();

    expect(wrapper.vm.isExpired).toBe(expectedData.isExpired[1]);
  });

  it('Check goToQRCode computed return link to qr code page', () => {
    expect(wrapper.vm.goToQRCode).toBe(expectedData.goToQRCode);
  });

  it('Check expiredDate computed return expiredDate formatted', () => {
    expect(wrapper.vm.expiredDate).toBe(expectedData.expiredDate);
  });
});
