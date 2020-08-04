import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardProfileDetail from '@/components/User/Profile/CardProfileDetail.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const $route = {
  path: '/ok',
};

describe('CardProfileDetail.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
  };
  const props = {
    image: '/img.png',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardProfileDetail, {
      propsData: { ...props },
      mocks: {
        $route,
      },
      localVue,
      stubs: ['font-awesome-icon'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check imageUrl computed to return url image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check showOnMap computed return link to show-on-map', () => {
    expect(wrapper.vm.showOnMap).toMatch(`${$route.path}/show-on-map`);
  });

  it('Check link computed return link to edit', () => {
    expect(wrapper.vm.link).toMatch(`${$route.path}/edit`);
  });
});
