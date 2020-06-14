/* eslint-disable no-shadow */
import * as Types from '../types';

const state = {
  reviewData: {},
  reviewInfo: {
    name: '',
    image: '',
    category: '',
  },
};

const actions = {
  getReviewData({ commit }, res) {
    commit(Types.GET_REVIEW_DATA, res);
  },
  getReviewInfo({ commit }, res) {
    commit(Types.GET_REVIEW_INFO, res);
  },
};

const getters = {
  reviewData: (state) => state.reviewData,
  reviewInfo: (state) => state.reviewInfo,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.GET_REVIEW_DATA](state, res) {
    state.reviewData = res;
  },
  [Types.GET_REVIEW_INFO](state, res) {
    state.reviewInfo = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
