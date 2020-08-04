import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardSpot from '@/components/Merchant/Card/CardSpot.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CardSpot.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
  };
  const data = {
    image: '/img.png',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardSpot, {
      propsData: {
        itinerary: data,
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
