import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import SearchResult from '@/components/User/Search/SearchResult.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('SearchResult.vue', () => {
  const expectedData = {
    searchResultTotal: 2,
    searchResults: [
      {
        categoryTitle: 'Places related to',
        categoryIcon: 'map-marked-alt',
        categoryColor: 'green',
        category: 'journey',
        searchResults: [],
      },
      {
        categoryTitle: 'Eats related to',
        categoryIcon: 'utensils',
        categoryColor: 'orange',
        category: 'restaurant',
        searchResults: [
          {
            name: 'Restoran',
            address: 'Samosir',
          },
        ],
      },
    ],
    filterSearch: [
      {
        name: 'Restoran',
        address: 'Samosir',
      },
    ],
  };
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      searchWisataResults: () => [{
        name: 'Danau',
        address: 'Samosir',
      }],
      searchRestaurantResults: () => [{
        name: 'Restoran',
        address: 'Samosir',
      }],
      searchKeywords: () => 'Restoran',
    };
    store = new Vuex.Store({
      getters,
    });
    wrapper = shallowMount(SearchResult, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check searchResultTotal to return length of getters searchWisataResults and searchRestaurantResults', () => {
    expect(wrapper.vm.searchResultTotal).toBe(expectedData.searchResultTotal);
  });

  it('Check searchResults to return expected data', () => {
    expect(wrapper.vm.searchResults).toStrictEqual(expectedData.searchResults);
  });

  it('Check filterSearch method to return array filtered', () => {
    const filterSearch = wrapper.vm.filterSearch([
      {
        name: 'Restoran',
        address: 'Samosir',
      },
      {
        name: 'Toba',
        address: 'Samosir',
      },
    ]);

    expect(filterSearch).toStrictEqual(expectedData.filterSearch);
  });
});
