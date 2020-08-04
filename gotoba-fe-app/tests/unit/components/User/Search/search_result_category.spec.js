import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import SearchResultCategory from '@/components/User/Search/SearchResultCategory.vue';

describe('SearchResultCategory.vue', () => {
  const expectedData = {
    info: {
      journey: {
        icon1: 'map-marker-alt',
        icon2: 'tag',
      },
      restaurant: {
        icon1: 'map-marker-alt',
        icon2: 'hamburger',
      },
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SearchResultCategory, {
      propsData: {
        searchResults: ['ok'],
      },
      stubs: ['font-awesome-icon'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check info computed return value when category props is journey', async () => {
    wrapper.setProps({
      category: 'journey',
    });
    await flushPromises();

    expect(wrapper.vm.info).toStrictEqual(expectedData.info.journey);
  });

  it('Check info computed return value when category props is not journey', async () => {
    wrapper.setProps({
      category: 'restaurant',
    });
    await flushPromises();

    expect(wrapper.vm.info).toStrictEqual(expectedData.info.restaurant);
  });
});
