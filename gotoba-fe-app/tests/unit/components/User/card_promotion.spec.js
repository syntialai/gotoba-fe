import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardPromotion from '@/components/User/CardPromotion.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CardPromotion.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    link: '/restaurant/REST_0001',
  };
  const props = {
    route: 'restaurant',
    image: '/img.png',
    sku: 'REST_0001',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardPromotion, {
      propsData: {
        ...props,
      },
      localVue,
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check imageUrl computed return image url from props image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check link computed return link url from props route', () => {
    expect(wrapper.vm.link).toMatch(expectedData.link);
  });
});
