/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  restaurantData: {},
  restaurantDatas: [],
  restaurantMenu: {},
  restaurantMenus: [],
  bistroType: [],
};

const actions = {
  getRestaurantBistroType({ commit }) {
    commit(Types.SET_RESTAURANT_BISTRO_TYPE);

    api.GetBistroType()
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_RESTAURANT_BISTRO_TYPE, res.data.map((item) => item.name));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRestaurantData({ commit }) {
    commit(Types.SET_RESTAURANT_DATA, []);

    api.GetRestaurants()
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_RESTAURANT_DATA, res.data);
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRestaurantDataBySku({ commit }, sku) {
    commit(Types.SET_RESTAURANT_DATA_BY_SKU);

    api.GetRestaurantBySku(sku)
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_RESTAURANT_DATA_BY_SKU, res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRestaurantDataByMerchantSku({ commit }, merchantSku) {
    commit(Types.SET_RESTAURANT_DATA_BY_SKU);

    api.GetRestaurantByMerchantSku(merchantSku)
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_RESTAURANT_DATA_BY_SKU, res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRestaurantMenu({ commit }, sku) {
    commit(Types.SET_RESTAURANT_MENU);

    api.GetRestaurantMenus(sku)
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_RESTAURANT_MENU, res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRestaurantMenuById({ commit }, id) {
    commit(Types.SET_RESTAURANT_MENU_BY_ID);

    api.GetRestaurantMenuById(id)
      .then((res) => {
        if (!res.error) {
          commit(Types.SET_RESTAURANT_MENU_BY_ID, res);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  setRestaurantMenu({ commit }, res) {
    commit(Types.SET_RESTAURANT_MENU_BY_ID, res);
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
  bistroType: (state) => state.bistroType,
  restaurantData: (state) => state.restaurantData,
  restaurantDatas: (state) => state.restaurantDatas,
  restaurantMenu: (state) => state.restaurantMenu,
  restaurantMenus: (state) => state.restaurantMenus,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_RESTAURANT_BISTRO_TYPE](state, res) {
    state.bistroType = res;
  },
  [Types.SET_RESTAURANT_DATA](state, res) {
    state.restaurantDatas = res;
  },
  [Types.SET_RESTAURANT_DATA_BY_SKU](state, res) {
    state.restaurantData = res;
  },
  [Types.SET_RESTAURANT_MENU](state, res) {
    state.restaurantMenus = res;
  },
  [Types.SET_RESTAURANT_MENU_BY_ID](state, res) {
    state.restaurantMenu = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
