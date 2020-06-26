/* eslint-disable no-shadow */
import * as Types from '../types';

const state = {
  searchKeywords: '',
  searchSuggestions: [],
  searchSuggestionShow: false,
  searchResults: {},
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

  getSearchResults({ commit }, value) {
    commit(Types.SET_SEARCH_RESULTS, value);
  },
};

const getters = {
  searchKeywords: (state) => state.searchKeywords,
  searchSuggestions: (state) => state.searchSuggestions,
  searchSuggestionShow: (state) => state.searchSuggestionShow,
  searchResults: (state) => state.searchResults,
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

  [Types.SET_SEARCH_RESULTS](state, value) {
    state.searchResults = value;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
