/* eslint-disable no-shadow */
import api from '../../api/api';
import * as Types from '../types';

const state = {
  tourGuideDatas: [],
  tourGuideData: {},
};

const actions = {
  getTourGuideData({ commit }, res) {
    commit(Types.GET_TOUR_GUIDE_DATA, res);

    api.GetTourGuides()
      .then((res) => {
        commit(Types.GET_TOUR_GUIDE_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getTourGuideBySku({ commit }, sku, res) {
    commit(Types.GET_TOUR_GUIDE_DATA_BY_SKU, res);

    api.GetTourGuideBySku(sku)
      .then((res) => {
        commit(Types.GET_TOUR_GUIDE_DATA_BY_SKU, res);
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
  [Types.GET_TOUR_GUIDE_DATA](state, res) {
    state.tourGuideDatas = res;
  },
  [Types.GET_TOUR_GUIDE_DATA_BY_SKU](state, res) {
    state.tourGuideData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
