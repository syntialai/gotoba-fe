import api from '@/api/api';
import * as Types from '@/store/types';
import journey from '@/store/modules/journey';

jest.mock('@/api/api', () => ({
  GetItineraries: jest.fn(),
  GetItineraryBySku: jest.fn(),
  GetItineraryByMerchantSku: jest.fn(),
  RemoveItinerary: jest.fn(),
}));

const store = journey;

describe('Journey modules', () => {
  const data = {
    state: {
      journeyData: [],
      journeyDataBySku: {
        name: '',
        title: '',
        image: null,
        location: '',
        longitude: 0,
        latitude: 0,
        price: 0,
        address: '',
        description: '',
        createdBy: '',
        hoursOpen: [],
      },
      journeyDataByMerchantSku: [],
    },
    getters: {
      journeyData: [{ sku: 'JOUR_0001' }],
      journeyDataBySku: { sku: 'JOUR_0001' },
      journeyDataByMerchantSku: [{ sku: 'JOUR_0002', merchantSku: 'MERC_0001' }],
    },
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.journeyData(state)).toStrictEqual(state.journeyData);
    expect(store.getters.journeyDataBySku(state)).toStrictEqual(state.journeyDataBySku);
    expect(store.getters.journeyDataByMerchantSku(state)).toStrictEqual(
      state.journeyDataByMerchantSku,
    );
  });

  it('Mutations', async () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_JOURNEY_DATA](state, res.journeyData);
    expect(state.journeyData).toStrictEqual(res.journeyData);

    store.mutations[Types.SET_JOURNEY_DATA_BY_SKU](state, res.journeyDataBySku);
    expect(state.journeyDataBySku).toStrictEqual(res.journeyDataBySku);

    store.mutations[Types.SET_JOURNEY_DATA_BY_MERCHANT_SKU](state, res.journeyDataByMerchantSku);
    expect(state.journeyDataByMerchantSku).toStrictEqual(res.journeyDataByMerchantSku);

    await store.mutations[Types.REMOVE_ITINERARY](state, res.journeyDataBySku.sku);
    expect(state.journeyData).toStrictEqual([]);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getJourneyData - success', async () => {
      api.GetItineraries.mockResolvedValue({
        data: data.getters.journeyData,
      });

      await store.actions.getJourneyData({ commit });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_JOURNEY_DATA,
        data.getters.journeyData,
      );
    });

    it('getJourneyData - error promise', async () => {
      api.GetItineraries.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getJourneyData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getJourneyData - error', async () => {
      api.GetItineraries.mockRejectedValue(new Error());

      await store.actions.getJourneyData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getJourneyDataBySku - success', async () => {
      api.GetItineraryBySku.mockResolvedValue({
        data: data.getters.journeyDataBySku,
      });

      await store.actions.getJourneyDataBySku({ commit }, data.getters.journeyDataBySku.sku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_JOURNEY_DATA_BY_SKU,
        data.getters.journeyDataBySku,
      );
    });

    it('getJourneyDataBySku - error promise', async () => {
      api.GetItineraryBySku.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getJourneyDataBySku({ commit }, data.getters.journeyDataBySku.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getJourneyDataBySku - error', async () => {
      api.GetItineraryBySku.mockRejectedValue(new Error());

      await store.actions.getJourneyDataBySku({ commit }, data.getters.journeyDataBySku.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('setJourneyDataBySku', () => {
      store.actions.setJourneyDataBySku({ commit }, data.getters.journeyDataBySku);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_JOURNEY_DATA_BY_SKU,
        data.getters.journeyDataBySku,
      );
    });

    it('getJourneyDataByMerchantSku - success', async () => {
      api.GetItineraryByMerchantSku.mockResolvedValue({
        data: data.getters.journeyDataByMerchantSku,
      });

      await store.actions.getJourneyDataByMerchantSku(
        { commit },
        data.getters.journeyDataByMerchantSku.merchantSku,
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_JOURNEY_DATA_BY_MERCHANT_SKU,
        data.getters.journeyDataByMerchantSku,
      );
    });

    it('getJourneyDataByMerchantSku - error promise', async () => {
      api.GetItineraryByMerchantSku.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getJourneyDataByMerchantSku(
        { commit },
        data.getters.journeyDataByMerchantSku.merchantSku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getJourneyDataByMerchantSku - error', async () => {
      api.GetItineraryByMerchantSku.mockRejectedValue(new Error());

      await store.actions.getJourneyDataByMerchantSku(
        { commit },
        data.getters.journeyDataByMerchantSku.merchantSku,
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('removeItinerary - success', async () => {
      api.RemoveItinerary.mockResolvedValue({
        code: 200,
        status: 'OK',
      });

      await store.actions.removeItinerary({ commit }, data.getters.journeyDataBySku.sku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.REMOVE_ITINERARY,
        data.getters.journeyDataBySku.sku,
      );
    });

    it('removeItinerary - error promise', async () => {
      api.RemoveItinerary.mockResolvedValue({
        status: 404,
        error: 'Not Found',
      });

      await store.actions.removeItinerary({ commit }, data.getters.journeyDataBySku.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('removeItinerary - error', async () => {
      api.RemoveItinerary.mockRejectedValue(new Error());

      await store.actions.removeItinerary({ commit }, data.getters.journeyDataBySku.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });
  });
});
