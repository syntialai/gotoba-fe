import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardHomeLong from '@/components/User/Home/CardHomeLong.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CardHomeLong.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    date: '23 Jul 2020',
    goToTicketDetails: '/ticket/TICK_0001',
  };
  const data = {
    image: '/img.png',
    expiredDate: '2020-07-23',
    sku: 'TICK_0001',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardHomeLong, {
      propsData: {
        data,
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

  it('Check date computed return date format without day', () => {
    expect(wrapper.vm.date).toMatch(expectedData.date);
  });

  it('Check goToTicketDetails computed return link to ticket details', () => {
    expect(wrapper.vm.goToTicketDetails).toMatch(expectedData.goToTicketDetails);
  });
});
