/* eslint-disable no-shadow */
import * as Types from '../types';

const state = {
  journeyData: {},
};

const actions = {
  getJourneyData({ commit }, res) {
    commit(Types.GET_JOURNEY_DATA, res);
  },
};

const getters = {
  journeyData: (state) => state.journeyData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.GET_JOURNEY_DATA](state, res) {
    state.journeyData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
