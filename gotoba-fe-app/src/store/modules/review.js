/* eslint-disable no-shadow */
import * as Types from '../types';

const state = {
  reviewData: {},
};

const actions = {
  getReviewData({ commit }) {
    commit(Types.SET_REVIEW_DATA);
  },
};

const getters = {
  reviewData: (state) => state.reviewData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_REVIEW_DATA](state, res) {
    state.reviewData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
