import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardMedia from '@/components/Merchant/Card/CardMedia.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CardMedia.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
  };
  const data = {
    image: '/img.png',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardMedia, {
      propsData: {
        data: data,
      },
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });
});
