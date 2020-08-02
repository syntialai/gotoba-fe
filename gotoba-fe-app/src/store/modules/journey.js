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
};

const actions = {
  getJourneyData({ commit }) {
    commit(Types.SET_JOURNEY_DATA, []);

    api.GetItineraries()
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_JOURNEY_DATA, res.data);
        }
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
    commit(Types.SET_JOURNEY_DATA_BY_MERCHANT_SKU, []);

    api.GetItineraryByMerchantSku(merchantSku)
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_JOURNEY_DATA_BY_MERCHANT_SKU, res.data);
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  removeItinerary({ commit }, sku) {
    commit(Types.REMOVE_ITINERARY);

    api.RemoveItinerary(sku)
      .then((res) => {
        if (!res.error) {
          commit(Types.REMOVE_ITINERARY, sku);
        }
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
  [Types.REMOVE_ITINERARY](state, sku) {
    const filteredData = state.journeyData.filter((item) => item.sku !== sku);
    state.journeyData = filteredData;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
