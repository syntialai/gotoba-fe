/* eslint-disable no-shadow */
import * as Types from '../types';

const state = {
  restaurantData: {},
};

const actions = {
  getRestaurantData({ commit }, res) {
    commit(Types.GET_RESTAURANT_DATA, res);
  },
};

const getters = {
  restaurantData: state => state.restaurantData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.GET_RESTAURANT_DATA](state, res) {
		state.restaurantData = res
	},
};

export default {
  state,
  actions,
  getters,
  mutations,
};
