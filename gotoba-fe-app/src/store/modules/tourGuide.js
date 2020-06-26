/* eslint-disable no-shadow */
import api from '../../api/api';
import * as Types from '../types';

const state = {
  tourGuideDatas: [],
  tourGuideData: {},
};

const actions = {
  getTourGuideData({ commit }) {
    commit(Types.SET_TOUR_GUIDE_DATA);

    api.GetTourGuides()
      .then((res) => {
        commit(Types.SET_TOUR_GUIDE_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getTourGuideBySku({ commit }, sku) {
    commit(Types.SET_TOUR_GUIDE_DATA_BY_SKU);

    api.GetTourGuideBySku(sku)
      .then((res) => {
        commit(Types.SET_TOUR_GUIDE_DATA_BY_SKU, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  removeTourGuide({ commit }, sku) {
    commit(Types.REMOVE_TOUR_GUIDE);

    api.RemoveTourGuide(sku)
      .then((res) => {
        commit(Types.REMOVE_TOUR_GUIDE, res);
        console.log(`Successfully delete tour guide with sku: ${sku}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  tourGuideDatas: (state) => state.tourGuideDatas,
  tourGuideData: (state) => state.tourGuideData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_TOUR_GUIDE_DATA](state, res) {
    state.tourGuideDatas = res;
  },
  [Types.SET_TOUR_GUIDE_DATA_BY_SKU](state, res) {
    state.tourGuideData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
