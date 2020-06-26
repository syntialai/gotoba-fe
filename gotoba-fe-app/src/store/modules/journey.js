/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  journeyData: {},
  journeyReview: [],
};

const actions = {
  getJourneyData({ commit }, sku, res) {
    commit(Types.SET_JOURNEY_DATA, res);

    api.GetItineraryBySku(sku)
      .then((res) => {
        console.log(res);
        commit(Types.SET_JOURNEY_DATA, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getJourneyReview({ commit }, sku, res) {
    commit(Types.SET_JOURNEY_REVIEW, res);

    api.GetReviewBySku(sku)
      .then((res) => {
        console.log(res);
        commit(Types.SET_JOURNEY_REVIEW, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  removeItinerary({ commit }, sku) {
    commit(Types.REMOVE_ITINERARY);

    api.RemoveItinerary(sku)
      .then((res) => {
        commit(Types.REMOVE_ITINERARY, res);
        console.log(`Successfully delete itinerary with sku: ${sku}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  journeyData: (state) => state.journeyData,
  journeyReview: (state) => state.journeyReview,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_JOURNEY_DATA](state, res) {
    state.journeyData = res;
  },
  [Types.SET_JOURNEY_REVIEW](state, res) {
    state.journeyReview = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
