import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import SearchContent from '@/components/User/Search/SearchContent.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $route = {
  path: '/search',
  query: {
    q: 'danau toba',
  },
};
const $router = { push: jest.fn() };

describe('SearchContent.vue', () => {
  const searchData = {
    title: 'History',
    keywords: ['danau toba'],
  };
  
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      setSearchKeywords: jest.fn(),
    };
    store = new Vuex.Store({ actions });
    wrapper = shallowMount(SearchContent, {
      propsData : { ...searchData },
      mocks: {
        $route,
        $router,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('check searchItem method call vuex actions', async () => {
    wrapper.vm.searchItem(searchData.keywords[0]);
    await flushPromises();

    expect(actions.setSearchKeywords).toHaveBeenCalledTimes(1);
    expect(actions.setSearchKeywords.mock.calls[0][1]).toBe(searchData.keywords[0]);
  });
});
