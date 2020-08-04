import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardHome from '@/components/User/Home/CardHome.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CardHome.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
  };
  const props = {
    image: '/img.png',
    name: 'Hannah Marcella',
    location: 'Medan',
    rating: 5,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardHome, {
      propsData: {
        ...props,
      },
      localVue,
      stubs: ['rating', 'font-awesome-icon'],
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
