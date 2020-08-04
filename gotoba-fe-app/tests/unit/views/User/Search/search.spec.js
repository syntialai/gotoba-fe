import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Search from '@/views/User/Search/Search.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Search.vue', () => {
  const expectedData = {
    searchKeywords: 'danau',
    searchSuggestions: [],
    history: {
      history: ['danau'],
    },
    historyAdd: {
      history: ['toba', 'danau'],
    },
  };
  const data = {
    history1: {
      history: ['toba'],
    },
    history2: {
      history: ['danau'],
    },
  };

  let getItem;
  let setItem;
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getItem = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
    setItem = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');

    getters = {
      searchKeywords: () => 'danau',
      searchWisataResults: () => [],
      searchRestaurantResults: () => [],
    };
    actions = {
      getSearchWisataResults: jest.fn(),
      getSearchRestaurantResults: jest.fn(),
      setSearchSuggestions: jest.fn(),
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
    expect(actions.setSearchSuggestions.mock.calls[0][1]).toStrictEqual(
      expectedData.searchSuggestions,
    );
  });

  it('Check history computed return history from localStorage is null', () => {
    getItem.mockReturnValue(null);

    expect(wrapper.vm.history).toBeNull();
  });

  it('Check history computed return history from localStorage is some object', () => {
    getItem.mockReturnValue(JSON.stringify(data.history2));

    expect(wrapper.vm.history).toStrictEqual(expectedData.history.history);
  });

  it('Check doSearch method to call localStorage and add history when localStorage is empty', () => {
    getItem.mockReturnValue(null);
    wrapper.vm.doSearch();

    expect(getItem).toHaveBeenCalledTimes(1);
    expect(getItem).toHaveBeenCalledWith('searchHistory');

    expect(setItem).toHaveBeenCalledTimes(1);
    expect(setItem).toHaveBeenCalledWith(
      'searchHistory',
      JSON.stringify(expectedData.history),
    );
  });

  it('Check doSearch method to call localStorage and add history when localStorage is filled', () => {
    getItem.mockReturnValue(JSON.stringify(data.history1));
    wrapper.vm.doSearch();

    expect(getItem).toHaveBeenCalledTimes(1);
    expect(getItem).toHaveBeenCalledWith('searchHistory');

    expect(setItem).toHaveBeenCalledTimes(1);
    expect(setItem).toHaveBeenCalledWith(
      'searchHistory',
      JSON.stringify(expectedData.historyAdd),
    );
  });
});
