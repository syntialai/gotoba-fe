/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  locationData: [],
  locationSet: {},
  locationKeyword: '',
  locationOpen: true,
};

const actions = {
  async getLocationData({ commit }) {
    commit(Types.SET_LOCATION_DATA, []);

    const wist = await api.GetItineraries();
    const rest = await api.GetRestaurants();

    if (!rest.error && !wist.error) {
      commit(Types.SET_LOCATION_DATA, [...rest.data, ...wist.data]);
    }
  },
  setLocation({ commit }, res) {
    commit(Types.SET_LOCATION, res);
  },
  setLocationKeyword({ commit }, keyword) {
    commit(Types.SET_LOCATION_KEYWORD, keyword);
  },
  setLocationOpen({ commit }, status) {
    commit(Types.SET_LOCATION_OPEN, status);
  },
};

const getters = {
  locationData: (state) => state.locationData,
  locationSet: (state) => state.locationSet,
  locationKeyword: (state) => state.locationKeyword,
  locationOpen: (state) => state.locationOpen,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_LOCATION_DATA](state, res) {
    state.locationData = res;
  },
  [Types.SET_LOCATION](state, res) {
    state.locationSet = res;
  },
  [Types.SET_LOCATION_KEYWORD](state, res) {
    state.locationKeyword = res;
  },
  [Types.SET_LOCATION_OPEN](state, status) {
    state.locationOpen = status;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
