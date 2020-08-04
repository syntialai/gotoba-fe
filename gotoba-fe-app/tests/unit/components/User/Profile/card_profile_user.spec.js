import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardProfileUser from '@/components/User/Profile/CardProfileUser.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CardProfileUser.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
  };
  const props = {
    image: '/img.png',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardProfileUser, {
      propsData: { ...props },
      localVue,
      stubs: ['font-awesome-icon'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check imageSrc computed to return url image', () => {
    expect(wrapper.vm.imageSrc).toMatch(expectedData.imageUrl);
  });
});
