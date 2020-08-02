import api from '@/api/api';
import * as Types from '@/store/types';
import location from '@/store/modules/location';

jest.mock('@/api/api', () => ({
  GetItineraries: jest.fn(),
  GetRestaurants: jest.fn(),
}));

const store = location;

describe('Location modules', () => {
  const data = {
    state: {
      locationData: [],
      locationSet: {},
      locationKeyword: '',
      locationOpen: true,
    },
    getters: {
      locationData: [{ sku: 'REST_0001' }],
      locationSet: { location: 'Medan' },
      locationKeyword: 'Medan',
      locationOpen: false,
    },
    itinerary: [],
    restaurant: [{ sku: 'REST_0001' }],
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.locationData(state)).toStrictEqual(state.locationData);
    expect(store.getters.locationSet(state)).toStrictEqual(state.locationSet);
    expect(store.getters.locationKeyword(state)).toStrictEqual(state.locationKeyword);
    expect(store.getters.locationOpen(state)).toStrictEqual(state.locationOpen);
  });

  it('Mutations', async () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_LOCATION_DATA](state, res.locationData);
    expect(state.locationData).toStrictEqual(res.locationData);

    store.mutations[Types.SET_LOCATION](state, res.locationSet);
    expect(state.locationSet).toStrictEqual(res.locationSet);

    store.mutations[Types.SET_LOCATION_KEYWORD](state, res.locationKeyword);
    expect(state.locationKeyword).toMatch(res.locationKeyword);

    store.mutations[Types.SET_LOCATION_OPEN](state, res.locationOpen);
    expect(state.locationOpen).toBe(res.locationOpen);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getLocationData - success', async () => {
      api.GetItineraries.mockResolvedValue({
        data: data.itinerary,
      });
      api.GetRestaurants.mockResolvedValue({
        data: data.restaurant,
      });

      await store.actions.getLocationData({ commit });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_LOCATION_DATA,
        data.getters.locationData,
      );
    });

    it('getLocationData - error promise in restaurant api', async () => {
      api.GetItineraries.mockResolvedValue({
        data: data.itinerary,
      });
      api.GetRestaurants.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getLocationData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getLocationData - error promise in itinerary api', async () => {
      api.GetItineraries.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });
      api.GetRestaurants.mockResolvedValue({
        data: data.itinerary,
      });

      await store.actions.getLocationData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getLocationData - error', async () => {
      api.GetItineraries.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });
      api.GetRestaurants.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getLocationData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('setLocation', () => {
      store.actions.setLocation({ commit }, data.getters.locationSet);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_LOCATION,
        data.getters.locationSet,
      );
    });

    it('setLocationKeyword', () => {
      store.actions.setLocationKeyword({ commit }, data.getters.locationKeyword);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_LOCATION_KEYWORD,
        data.getters.locationKeyword,
      );
    });

    it('setLocationOpen', () => {
      store.actions.setLocationOpen({ commit }, data.getters.locationOpen);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_LOCATION_OPEN,
        data.getters.locationOpen,
      );
    });
  });
});
