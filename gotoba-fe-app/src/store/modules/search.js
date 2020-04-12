/* eslint-disable no-shadow */
import { Search } from '../types';

const state = {
  searchKeywords: '',
  searchSuggestions: [],
  searchSuggestionShow: false,
};

const actions = {
  setSearchKeywords: ({ commit }, value) => {
    commit(Search.NAV_KEYWORDS_VALUE, value);
  },
  setSearchSuggestions: ({ commit }, value) => {
    commit(Search.SUGGESTIONS_VALUE, value);
  },
  setSearchShowStatus: ({ commit }, value) => {
    commit(Search.SUGGESTIONS_SHOW_STATUS, value);
  },
};

const getters = {
  searchKeywords: (state) => state.searchKeywords,
  searchSuggestions: (state) => state.searchSuggestions,
  searchSuggestionShow: (state) => state.searchSuggestionShow,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Search.NAV_KEYWORDS_VALUE](state, value) {
    state.searchKeywords = value;
  },
  [Search.SUGGESTIONS_VALUE](state, value) {
    state.searchSuggestions = value;
  },
  [Search.SUGGESTIONS_SHOW_STATUS](state, value) {
    state.searchSuggestionShow = value;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
