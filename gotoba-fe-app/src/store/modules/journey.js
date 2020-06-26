/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  journeyData: [],
  journeyDataBySku: {},
  journeyReview: [],
};

const actions = {
  getJourneyData({ commit }) {
    commit(Types.SET_JOURNEY_DATA);

    api.GetItineraries()
      .then((res) => {
        console.log(res);
        commit(Types.SET_JOURNEY_DATA, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getJourneyDataBySku({ commit }, sku) {
    commit(Types.SET_JOURNEY_DATA_BY_SKU);

    api.GetItineraryBySku(sku)
      .then((res) => {
        console.log(res);
        commit(Types.SET_JOURNEY_DATA_BY_SKU, res);
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
  journeyDataBySku: (state) => state.journeyDataBySku,
  journeyReview: (state) => state.journeyReview,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_JOURNEY_DATA](state, res) {
    state.journeyData = res;
  },
  [Types.SET_JOURNEY_DATA_BY_SKU](state, res) {
    state.journeyDataBySku = res;
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
