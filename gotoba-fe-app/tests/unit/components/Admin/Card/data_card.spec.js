import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import DataCard from '@/components/Admin/Card/DataCard.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('DataCard.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    initialName: 'HM',
  };
  const data = {
    image: '/img.png',
    name: 'Hannah Marcella',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DataCard, {
      propsData: {
        data,
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

  it('Check initialName computed return initial name from data name', () => {
    expect(wrapper.vm.initialName).toMatch(expectedData.initialName);
  });
});
