/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  restaurantData: {},
  restaurantDatas: [],
  restaurantMenu: {},
  restaurantMenus: [],
};

const actions = {
  getRestaurantData({ commit }, res) {
    commit(Types.GET_RESTAURANT_DATA, res);

    api.GetRestaurants()
      .then((res) => {
        commit(Types.GET_RESTAURANT_DATA, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getRestaurantDataBySku({ commit }, sku, res) {
    commit(Types.GET_RESTAURANT_DATA_BY_SKU, res);

    api.GetRestaurantBySku(sku)
      .then((res) => {
        commit(Types.GET_RESTAURANT_DATA_BY_SKU, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getRestaurantMenu({ commit }, sku, res) {
    commit(Types.GET_RESTAURANT_MENU, res);

    api.GetRestaurantMenus(sku)
      .then((res) => {
        commit(Types.GET_RESTAURANT_MENU, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getRestaurantMenuById({ commit }, id, res) {
    commit(Types.GET_RESTAURANT_MENU_BY_ID, res);

    api.GetRestaurantMenus(id)
      .then((res) => {
        commit(Types.GET_RESTAURANT_MENU_BY_ID, res);
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
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.GET_RESTAURANT_DATA](state, res) {
    state.restaurantData = res;
  },
  [Types.GET_RESTAURANT_DATA_BY_SKU](state, res) {
    state.restaurantDatas = res;
  },
  [Types.GET_RESTAURANT_MENU](state, res) {
    state.restaurantMenus = res;
  },
  [Types.GET_RESTAURANT_MENU_BY_ID](state, res) {
    state.restaurantMenu = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
