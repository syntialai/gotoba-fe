import api from '@/api/api';
import * as Types from '@/store/types';
import search from '@/store/modules/search';

jest.mock('@/api/api', () => ({
  GetItineraries: jest.fn(),
  GetRestaurants: jest.fn(),
}));

const store = search;

describe('Gallery modules', () => {
  const data = {
    state: {
      searchKeywords: '',
      searchSuggestions: [],
      searchWisataResults: [],
      searchRestaurantResults: [],
    },
    getters: {
      searchKeywords: '',
      searchSuggestions: [{
        sku: 'REST_0001',
      }],
      searchWisataResults: [],
      searchRestaurantResults: [{
        sku: 'REST_0001',
      }],
    },
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.searchKeywords(state)).toMatch(state.searchKeywords);
    expect(store.getters.searchSuggestions(state)).toStrictEqual(state.searchSuggestions);
    expect(store.getters.searchWisataResults(state)).toStrictEqual(state.searchWisataResults);
    expect(store.getters.searchRestaurantResults(state)).toStrictEqual(
      state.searchRestaurantResults,
    );
  });

  it('Mutations', async () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_SEARCH_NAV_KEYWORDS_VALUE](state, res.searchKeywords);
    expect(state.searchKeywords).toMatch(res.searchKeywords);

    store.mutations[Types.SET_SEARCH_SUGGESTIONS_VALUE](state, res.searchSuggestions);
    expect(state.searchSuggestions).toStrictEqual(res.searchSuggestions);

    store.mutations[Types.SET_SEARCH_WISATA_RESULTS](state, res.searchWisataResults);
    expect(state.searchWisataResults).toStrictEqual(res.searchWisataResults);

    store.mutations[Types.SET_SEARCH_RESTAURANT_RESULTS](state, res.searchRestaurantResults);
    expect(state.searchRestaurantResults).toStrictEqual(res.searchRestaurantResults);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getSearchWisataResults - success', async () => {
      api.GetItineraries.mockResolvedValue({
        data: data.getters.searchWisataResults,
      });

      await store.actions.getSearchWisataResults({ commit });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_SEARCH_WISATA_RESULTS,
        data.getters.searchWisataResults,
      );
    });

    it('getSearchWisataResults - error', async () => {
      api.GetItineraries.mockResolvedValue({
        status: 404,
        error: 'Not Found',
      });

      await store.actions.getSearchWisataResults({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getSearchRestaurantResults - success', async () => {
      api.GetRestaurants.mockResolvedValue({
        data: data.getters.searchRestaurantResults,
      });

      await store.actions.getSearchRestaurantResults(
        { commit },
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_SEARCH_RESTAURANT_RESULTS,
        data.getters.searchRestaurantResults,
      );
    });

    it('getSearchRestaurantResults - error promise', async () => {
      api.GetRestaurants.mockResolvedValue({
        status: 404,
        error: 'Not Found',
      });

      await store.actions.getSearchRestaurantResults({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('setSearchKeywords', () => {
      store.actions.setSearchKeywords({ commit }, data.getters.searchKeywords);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_SEARCH_NAV_KEYWORDS_VALUE,
        data.getters.searchKeywords,
      );
    });

    it('setSearchSuggestions', () => {
      store.actions.setSearchSuggestions({ commit }, data.getters.searchSuggestions);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_SEARCH_SUGGESTIONS_VALUE,
        data.getters.searchSuggestions,
      );
    });
  });
});
