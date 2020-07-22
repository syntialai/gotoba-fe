/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  journeyData: [],
  journeyDataBySku: {
    name: '',
    title: '',
    image: null,
    location: '',
    longitude: 0,
    latitude: 0,
    price: 0,
    address: '',
    description: '',
    createdBy: '',
    hoursOpen: [],
  },
  journeyDataByMerchantSku: [],
  journeyReview: [],
};

const actions = {
  getJourneyData({ commit }) {
    commit(Types.SET_JOURNEY_DATA, []);

    api.GetItineraries()
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_JOURNEY_DATA, res.data);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getJourneyDataBySku({ commit }, sku) {
    commit(Types.SET_JOURNEY_DATA_BY_SKU);

    api.GetItineraryBySku(sku)
      .then((res) => {
        if (!res.error) {
          console.log(res);
          commit(Types.SET_JOURNEY_DATA_BY_SKU, res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  setJourneyDataBySku({ commit }, res) {
    commit(Types.SET_JOURNEY_DATA_BY_SKU, res);
  },

  getJourneyDataByMerchantSku({ commit }, merchantSku) {
    commit(Types.SET_JOURNEY_DATA_BY_MERCHANT_SKU);

    api.GetItineraryByMerchantSku(merchantSku)
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_JOURNEY_DATA_BY_MERCHANT_SKU, res.data);
          console.log(res);
          return;
        }

        commit(Types.SET_JOURNEY_DATA_BY_MERCHANT_SKU, []);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getJourneyReview({ commit }, sku) {
    commit(Types.SET_JOURNEY_REVIEW);

    api.GetReviewBySku(sku)
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_JOURNEY_REVIEW, res);
        }
        console.log(res);
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
  journeyDataByMerchantSku: (state) => state.journeyDataByMerchantSku,
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
  [Types.SET_JOURNEY_DATA_BY_MERCHANT_SKU](state, res) {
    state.journeyDataByMerchantSku = res;
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
