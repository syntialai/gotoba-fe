/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  searchKeywords: '',
  searchSuggestions: [],
  searchSuggestionShow: true,
  searchWisataResults: [],
  searchRestaurantResults: [],
};

const actions = {
  setSearchKeywords({ commit }, value) {
    commit(Types.SET_SEARCH_NAV_KEYWORDS_VALUE, value);
  },

  setSearchSuggestions({ commit }, value) {
    commit(Types.SET_SEARCH_SUGGESTIONS_VALUE, value);
  },

  setSearchShowStatus({ commit }, value) {
    commit(Types.SET_SEARCH_SUGGESTIONS_SHOW_STATUS, value);
  },

  async getSearchWisataResults({ commit }) {
    commit(Types.SET_SEARCH_WISATA_RESULTS, []);

    const res = await api.GetItineraries();
    if (!res.error) {
      commit(Types.SET_SEARCH_WISATA_RESULTS, res.data);
    }
  },

  async getSearchRestaurantResults({ commit }) {
    commit(Types.SET_SEARCH_RESTAURANT_RESULTS, []);

    const res = await api.GetRestaurants();
    if (!res.error) {
      commit(Types.SET_SEARCH_RESTAURANT_RESULTS, res.data);
    }
  },
};

const getters = {
  searchKeywords: (state) => state.searchKeywords,
  searchSuggestions: (state) => state.searchSuggestions,
  searchSuggestionShow: (state) => state.searchSuggestionShow,
  searchWisataResults: (state) => state.searchWisataResults,
  searchRestaurantResults: (state) => state.searchRestaurantResults,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_SEARCH_NAV_KEYWORDS_VALUE](state, value) {
    state.searchKeywords = value;
  },

  [Types.SET_SEARCH_SUGGESTIONS_VALUE](state, value) {
    state.searchSuggestions = value;
  },

  [Types.SET_SEARCH_SUGGESTIONS_SHOW_STATUS](state, value) {
    state.searchSuggestionShow = value;
  },

  [Types.SET_SEARCH_WISATA_RESULTS](state, res) {
    state.searchWisataResults = res;
  },

  [Types.SET_SEARCH_RESTAURANT_RESULTS](state, res) {
    state.searchRestaurantResults = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
