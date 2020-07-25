import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Search from '@/views/User/Search/Search.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

window.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

describe('Search.vue', () => {
  const expectedData = {
    searchKeywords: 'danau',
    searchSuggestions: [],
    history: {
      history: ['danau'],
    },
  };

  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      searchKeywords: () => 'danau',
      searchWisataResults: () => [],
      searchRestaurantResults: () => [],
    };
    actions = {
      getSearchWisataResults: jest.fn(),
      getSearchRestaurantResults: jest.fn(),
      setSearchSuggestions: jest.fn(),
      setSearchShowStatus: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(Search, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check actions to be called when created', () => {
    expect(actions.getSearchWisataResults).toHaveBeenCalledTimes(1);
    expect(actions.getSearchRestaurantResults).toHaveBeenCalledTimes(1);
    expect(actions.setSearchSuggestions).toHaveBeenCalledTimes(1);
    expect(actions.setSearchSuggestions.mock.calls[0][1]).toStrictEqual(expectedData.searchSuggestions);
  });

  it('Check history computed return history from localStorage is null', () => {
    localStorage.getItem.mockImplementation(() => null);

    expect(wrapper.vm.history).toBeNull();
  });

  it('Check history computed return history from localStorage is some object', () => {
    localStorage.getItem.mockImplementation(() => `{
      history: ['danau'],
    }`);

    expect(wrapper.vm.history).toStrictEqual(expectedData.history);
  });

  it('Check doSearch method to call localStorage and add history', () => {
    localStorage.getItem.mockImplementation(() => null);
    wrapper.vm.doSearch();

    expect(actions.setSearchShowStatus).toHaveBeenCalledTimes(1);
    expect(actions.setSearchShowStatus.mock.calls[0][1]).toHaveBeenCalledWith(false);

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('searchHistory');
    
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'searchHistory',
      JSON.stringify(expectedData.history)
    );
  })
});
