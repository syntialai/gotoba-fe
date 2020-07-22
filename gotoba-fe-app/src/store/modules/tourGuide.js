/* eslint-disable no-shadow */
import api from '../../api/api';
import * as Types from '../types';

const state = {
  tourGuideDatas: [],
  tourGuideData: {},
  tourGuideReview: [],
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  setTourGuideBySku({ commit }, res) {
    commit(Types.SET_TOUR_GUIDE_DATA_BY_SKU, res);
  },

  getTourGuideReview({ commit }, sku) {
    commit(Types.SET_TOUR_GUIDE_REVIEW);

    api.GetReviewBySku(sku)
      .then((res) => {
        commit(Types.SET_TOUR_GUIDE_REVIEW, res);
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
  tourGuideReview: (state) => state.tourGuideReview,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_TOUR_GUIDE_DATA](state, res) {
    state.tourGuideDatas = res;
  },
  [Types.SET_TOUR_GUIDE_DATA_BY_SKU](state, res) {
    const tourGuide = { ...res };

    tourGuide.availableLocation = res.availableLocation.join(', ');
    tourGuide.language = res.language.join(', ');

    state.tourGuideData = tourGuide;
  },
  [Types.SET_TOUR_GUIDE_REVIEW](state, res) {
    state.tourGuideReview = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
