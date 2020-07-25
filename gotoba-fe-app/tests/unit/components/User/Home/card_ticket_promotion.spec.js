import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardTicketPromotion from '@/components/User/Home/CardTicketPromotion.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CardTicketPromotion.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    promotionPrice: '50.000',
    actualPrice: '100.000',
    goToTicketDetail: '/ticket/TICK_0001',
  };
  const data = {
    image: '/img.png',
    expiredDate: '2020-07-23',
    price: 100000,
    discount: 50000,
    sku: 'TICK_0001',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardTicketPromotion, {
      propsData: {
        ...data,
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

  it('Check promotionPrice computed return formatted promotion price', () => {
    expect(wrapper.vm.promotionPrice).toMatch(expectedData.promotionPrice);
  })

  it('Check actualPrice computed return formatted price', () => {
    expect(wrapper.vm.actualPrice).toMatch(expectedData.actualPrice);
  })

  it('Check goToTicketDetail computed return link to ticket details', () => {
    expect(wrapper.vm.goToTicketDetail).toMatch(expectedData.goToTicketDetail);
  });
});
