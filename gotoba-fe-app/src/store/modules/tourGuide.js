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
        if (!res.error) {
          commit(Types.SET_TOUR_GUIDE_DATA, res.data);
        }
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
        if (!res.error) {
          commit(Types.SET_TOUR_GUIDE_DATA_BY_SKU, res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  setTourGuideBySku({ commit }, res) {
    commit(Types.SET_TOUR_GUIDE_DATA_BY_SKU, res);
  },

  removeTourGuide({ commit }, sku) {
    commit(Types.REMOVE_TOUR_GUIDE);

    api.RemoveTourGuide(sku)
      .then((res) => {
        if (!res.error) {
          commit(Types.REMOVE_TOUR_GUIDE, sku);
        }
        console.log(res);
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
    const tourGuide = { ...res };

    if (Object.keys(res).length > 0) {
      tourGuide.availableLocation = res.availableLocation.join(', ');
      tourGuide.language = res.language.join(', ');
    }

    state.tourGuideData = tourGuide;
  },
  [Types.REMOVE_TOUR_GUIDE](state, sku) {
    const filteredData = state.tourGuideDatas.filter((item) => item.sku !== sku);
    state.tourGuideDatas = filteredData;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
