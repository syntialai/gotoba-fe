/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  journeyData: {},
};

const actions = {
  getJourneyData({ commit }, res) {
    commit(Types.GET_JOURNEY_DATA, res);
  },
  removeItinerary({ commit }, sku) {
    commit(Types.REMOVE_ITINERARY);

    api.RemoveItinerary(sku)
      .then((res) => {
        commit(Types.REMOVE_ITINERARY);
        console.log('Successfully delete itinerary');
      })
      .catch((err) => {
        console.log(err);
      });
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
