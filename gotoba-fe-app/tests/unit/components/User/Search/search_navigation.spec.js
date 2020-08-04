import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import SearchNavigation from '@/components/User/Search/SearchNavigation.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $router = {
  go: jest.fn(),
};

describe('SearchNavigation.vue', () => {
  const expectedData = {
    searchKeywords: 'danau',
  };

  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      searchKeywords: () => 'danau',
    };
    actions = {
      setSearchKeywords: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(SearchNavigation, {
      mocks: {
        $router,
      },
      localVue,
      store,
      stubs: ['b-icon'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check keywords computed getters return getters value', () => {
    expect(wrapper.vm.keywords).toMatch(expectedData.searchKeywords);
  });

  it('Check keywords computed setters to call setSearchKeywords actions', () => {
    wrapper.vm.keywords = 'Toba';

    expect(actions.setSearchKeywords).toHaveBeenCalledTimes(1);
    expect(actions.setSearchKeywords.mock.calls[0][1]).toMatch('Toba');
  });

  it('Check goBack method to call actions and router', async () => {
    wrapper.vm.goBack();

    expect(actions.setSearchKeywords).toHaveBeenCalledTimes(1);
    expect(actions.setSearchKeywords.mock.calls[0][1]).toMatch('');
    
    expect(wrapper.vm.$router.go).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.go).toHaveBeenCalledWith(-1);
  })
});
