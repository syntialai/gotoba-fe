import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardSearchResult from '@/components/User/Search/CardSearchResult.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CardSearchResult.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    goToProfileDetail: '/restaurant/REST_0001_0001',
  };
  const data = {
    imageSrc: '/img.png',
    category: 'restaurant',
    sku: 'REST_0001_0001',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardSearchResult, {
      propsData: {
        ...data,
      },
      localVue,
      stubs: [
        'font-awesome-icon',
        'rating',
        'router-link',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check goToProfileDetail computed return profile link from props', () => {
    expect(wrapper.vm.goToProfileDetail).toMatch(expectedData.goToProfileDetail);
  });
});
