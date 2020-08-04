import api from '@/api/api';
import * as Types from '@/store/types';
import restaurant from '@/store/modules/restaurant';

jest.mock('@/api/api', () => ({
  GetRestaurants: jest.fn(),
  GetRestaurantBySku: jest.fn(),
  GetRestaurantByMerchantSku: jest.fn(),
  GetRestaurantMenus: jest.fn(),
  GetRestaurantMenuById: jest.fn(),
  GetBistroType: jest.fn(),
}));

const store = restaurant;

describe('Restaurant modules', () => {
  const data = {
    state: {
      restaurantData: {},
      restaurantDatas: [],
      restaurantMenu: {},
      restaurantMenus: [],
      bistroType: [],
    },
    getters: {
      restaurantDatas: [{
        sku: 'JOUR_0001',
      }],
      restaurantData: {
        sku: 'JOUR_0001',
        merchantSku: 'MERC_0001',
      },
      restaurantMenus: [{
        id: 2432321,
      }],
      restaurantMenu: { id: 2432321 },
      bistroType: [{
        id: 12345,
        name: 'All-day Cafe',
      }],
    },
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.restaurantDatas(state)).toStrictEqual(state.restaurantDatas);
    expect(store.getters.restaurantData(state)).toStrictEqual(state.restaurantData);
    expect(store.getters.restaurantMenus(state)).toStrictEqual(state.restaurantMenus);
    expect(store.getters.restaurantMenu(state)).toStrictEqual(state.restaurantMenu);
    expect(store.getters.bistroType(state)).toStrictEqual(state.bistroType);
  });

  it('Mutations', async () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_RESTAURANT_DATA](state, res.restaurantDatas);
    expect(state.restaurantDatas).toStrictEqual(res.restaurantDatas);

    store.mutations[Types.SET_RESTAURANT_DATA_BY_SKU](state, res.restaurantData);
    expect(state.restaurantData).toStrictEqual(res.restaurantData);

    store.mutations[Types.SET_RESTAURANT_MENU](state, res.restaurantMenus);
    expect(state.restaurantMenus).toStrictEqual(res.restaurantMenus);

    store.mutations[Types.SET_RESTAURANT_MENU_BY_ID](state, res.restaurantMenu);
    expect(state.restaurantMenu).toStrictEqual(res.restaurantMenu);

    store.mutations[Types.SET_RESTAURANT_BISTRO_TYPE](state, res.bistroType);
    expect(state.bistroType).toStrictEqual(res.bistroType);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getRestaurantData - success', async () => {
      api.GetRestaurants.mockResolvedValue({
        data: data.getters.restaurantDatas,
      });

      await store.actions.getRestaurantData({ commit });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_RESTAURANT_DATA,
        data.getters.restaurantDatas,
      );
    });

    it('getRestaurantData - error promise', async () => {
      api.GetRestaurants.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getRestaurantData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getRestaurantData - error', async () => {
      api.GetRestaurants.mockRejectedValue(new Error());

      await store.actions.getRestaurantData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getRestaurantDataBySku - success', async () => {
      api.GetRestaurantBySku.mockResolvedValue({
        data: data.getters.restaurantData,
      });

      await store.actions.getRestaurantDataBySku(
        { commit },
        data.getters.restaurantData.sku,
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_RESTAURANT_DATA_BY_SKU,
        data.getters.restaurantData,
      );
    });

    it('getRestaurantDataBySku - error promise', async () => {
      api.GetRestaurantBySku.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getRestaurantDataBySku(
        { commit },
        data.getters.restaurantData.sku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getRestaurantDataBySku - error', async () => {
      api.GetRestaurantBySku.mockRejectedValue(new Error());

      await store.actions.getRestaurantDataBySku(
        { commit },
        data.getters.restaurantData.sku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getRestaurantDataByMerchantSku - success', async () => {
      api.GetRestaurantByMerchantSku.mockResolvedValue({
        code: 200,
        status: 'OK',
        data: data.getters.restaurantData,
      });

      await store.actions.getRestaurantDataByMerchantSku(
        { commit },
        data.getters.restaurantData.merchantSku,
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_RESTAURANT_DATA_BY_SKU,
        data.getters.restaurantData,
      );
    });

    it('getRestaurantDataByMerchantSku - error promise', async () => {
      api.GetRestaurantByMerchantSku.mockResolvedValue({
        status: 400,
        error: 'Not Found',
      });

      await store.actions.getRestaurantDataByMerchantSku(
        { commit },
        data.getters.restaurantData.merchantSku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getRestaurantDataByMerchantSku - error', async () => {
      api.GetRestaurantByMerchantSku.mockRejectedValue(new Error());

      await store.actions.getRestaurantDataByMerchantSku(
        { commit },
        data.getters.restaurantData.merchantSku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getRestaurantMenu - success', async () => {
      api.GetRestaurantMenus.mockResolvedValue({
        data: data.getters.restaurantMenus,
      });

      await store.actions.getRestaurantMenu(
        { commit },
        data.getters.restaurantData.sku,
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_RESTAURANT_MENU,
        data.getters.restaurantMenus,
      );
    });

    it('getRestaurantMenu - error promise', async () => {
      api.GetRestaurantMenus.mockResolvedValue({
        status: 404,
        error: 'Not Found',
      });

      await store.actions.getRestaurantMenu(
        { commit },
        data.getters.restaurantData.sku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getRestaurantMenu - error', async () => {
      api.GetRestaurantMenus.mockRejectedValue(new Error());

      await store.actions.getRestaurantMenu(
        { commit },
        data.getters.restaurantData.sku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getRestaurantMenuById - success', async () => {
      api.GetRestaurantMenuById.mockResolvedValue({
        data: data.getters.restaurantMenu,
      });

      await store.actions.getRestaurantMenuById(
        { commit },
        data.getters.restaurantMenu.id,
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_RESTAURANT_MENU_BY_ID,
        data.getters.restaurantMenu,
      );
    });

    it('getRestaurantMenuById - error promise', async () => {
      api.GetRestaurantMenuById.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getRestaurantMenuById(
        { commit },
        data.getters.restaurantMenu.id,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getRestaurantMenuById - error', async () => {
      api.GetRestaurantMenuById.mockRejectedValue(new Error());

      await store.actions.getRestaurantMenuById(
        { commit },
        data.getters.restaurantMenu.id,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('setRestaurantMenu', () => {
      store.actions.setRestaurantMenu({ commit }, data.getters.restaurantMenu);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_RESTAURANT_MENU_BY_ID,
        data.getters.restaurantMenu,
      );
    });

    it('getRestaurantBistroType - success', async () => {
      api.GetBistroType.mockResolvedValue({
        data: data.getters.bistroType,
      });

      await store.actions.getRestaurantBistroType(
        { commit },
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_RESTAURANT_BISTRO_TYPE,
        data.getters.bistroType.map((item) => item.name),
      );
    });

    it('getRestaurantBistroType - error promise', async () => {
      api.GetBistroType.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getRestaurantBistroType(
        { commit },
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getRestaurantBistroType - error', async () => {
      api.GetBistroType.mockRejectedValue(new Error());

      await store.actions.getRestaurantBistroType(
        { commit },
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });
  });
});
