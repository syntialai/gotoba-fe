/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  restaurantData: {},
  restaurantDatas: [],
  restaurantMenu: {},
  restaurantMenus: [],
  restaurantReview: [],
};

const actions = {
  getRestaurantData({ commit }) {
    commit(Types.SET_RESTAURANT_DATA);

    api.GetRestaurants()
      .then((res) => {
        commit(Types.SET_RESTAURANT_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRestaurantDataByMerchantSku({ commit }, merchantSku) {
    commit(Types.SET_RESTAURANT_DATA_BY_MERCHANT_SKU);

    api.GetRestaurantByMerchantSku(merchantSku)
      .then((res) => {
        commit(Types.SET_RESTAURANT_DATA_BY_MERCHANT_SKU, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRestaurantMenu({ commit }, sku) {
    commit(Types.SET_RESTAURANT_MENU);

    api.GetRestaurantMenus(sku)
      .then((res) => {
        commit(Types.SET_RESTAURANT_MENU, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRestaurantMenuById({ commit }, id) {
    commit(Types.SET_RESTAURANT_MENU_BY_ID);

    api.GetRestaurantMenus(id)
      .then((res) => {
        commit(Types.SET_RESTAURANT_MENU_BY_ID, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRestaurantReview({ commit }, sku) {
    commit(Types.SET_RESTAURANT_REVIEW);

    api.GetRestaurantMenus(sku)
      .then((res) => {
        commit(Types.SET_RESTAURANT_REVIEW, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  removeRestaurantMenu({ commit }, sku, id) {
    commit(Types.REMOVE_RESTAURANT_MENU);

    api.RemoveRestaurantMenu(sku, id)
      .then((res) => {
        commit(Types.REMOVE_RESTAURANT_MENU);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  restaurantData: (state) => state.restaurantData,
  restaurantDatas: (state) => state.restaurantDatas,
  restaurantMenu: (state) => state.restaurantMenu,
  restaurantMenus: (state) => state.restaurantMenus,
  restaurantReview: (state) => state.restaurantReview,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_RESTAURANT_DATA](state, res) {
    state.restaurantDatas = res;
  },
  [Types.SET_RESTAURANT_DATA_BY_MERCHANT_SKU](state, res) {
    state.restaurantData = res;
  },
  [Types.SET_RESTAURANT_MENU](state, res) {
    state.restaurantMenus = res;
  },
  [Types.SET_RESTAURANT_MENU_BY_ID](state, res) {
    state.restaurantMenu = res;
  },
  [Types.SET_RESTAURANT_REVIEW](state, res) {
    state.restaurantReview = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
