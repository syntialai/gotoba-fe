import api from '@/api/api';
import * as Types from '@/store/types';
import tourGuide from '@/store/modules/tourGuide';

jest.mock('@/api/api', () => ({
  GetTourGuides: jest.fn(),
  GetTourGuideBySku: jest.fn(),
  RemoveTourGuide: jest.fn(),
}));

const store = tourGuide;

describe('Tour Guide modules', () => {
  const data = {
    state: {
      tourGuideDatas: [],
      tourGuideData: {},
    },
    getters: {
      tourGuideDatas: [{
        sku: 'PHOT_0001',
      }],
      tourGuideData: {
        sku: 'PHOT_0001',
        availableLocation: ['Parapat', 'Silangit'],
        language: ['English'],
      },
    },
    tourGuide: {
      sku: 'PHOT_0001',
      availableLocation: 'Parapat, Silangit',
      language: 'English',
    },
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.tourGuideDatas(state)).toStrictEqual(state.tourGuideDatas);
    expect(store.getters.tourGuideData(state)).toStrictEqual(state.tourGuideData);
  });

  it('Mutations', async () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_TOUR_GUIDE_DATA](state, res.tourGuideDatas);
    expect(state.tourGuideDatas).toStrictEqual(res.tourGuideDatas);

    store.mutations[Types.SET_TOUR_GUIDE_DATA_BY_SKU](state, res.tourGuideData);
    expect(state.tourGuideData).toStrictEqual(data.tourGuide);

    store.mutations[Types.SET_TOUR_GUIDE_DATA_BY_SKU](state, {});
    expect(state.tourGuideData).toStrictEqual({});

    store.mutations[Types.REMOVE_TOUR_GUIDE](state, res.tourGuideData.sku);
    expect(state.tourGuideDatas).toStrictEqual([]);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getTourGuideData - success', async () => {
      api.GetTourGuides.mockResolvedValue({
        data: data.getters.tourGuideDatas,
      });

      await store.actions.getTourGuideData({ commit });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_TOUR_GUIDE_DATA,
        data.getters.tourGuideDatas,
      );
    });

    it('getTourGuideData - error promise', async () => {
      api.GetTourGuides.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getTourGuideData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getTourGuideData - error', async () => {
      api.GetTourGuides.mockRejectedValue(new Error());

      await store.actions.getTourGuideData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getTourGuideBySku - success', async () => {
      api.GetTourGuideBySku.mockResolvedValue({
        data: data.getters.tourGuideData,
      });

      await store.actions.getTourGuideBySku({ commit }, data.getters.tourGuideData.sku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_TOUR_GUIDE_DATA_BY_SKU,
        data.getters.tourGuideData,
      );
    });

    it('getTourGuideBySku - error promise', async () => {
      api.GetTourGuideBySku.mockResolvedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getTourGuideBySku({ commit }, data.getters.tourGuideData.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getTourGuideBySku - error', async () => {
      api.GetTourGuideBySku.mockRejectedValue(new Error());

      await store.actions.getTourGuideBySku({ commit }, data.getters.tourGuideData.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('setTourGuideBySku', () => {
      store.actions.setTourGuideBySku({ commit }, data.getters.tourGuideData);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_TOUR_GUIDE_DATA_BY_SKU,
        data.getters.tourGuideData,
      );
    });

    it('removeTourGuide - success', async () => {
      api.RemoveTourGuide.mockResolvedValue({
        code: 200,
        status: 'OK',
      });

      await store.actions.removeTourGuide({ commit }, data.getters.tourGuideData.sku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.REMOVE_TOUR_GUIDE,
        data.getters.tourGuideData.sku,
      );
    });

    it('removeTourGuide - error promise', async () => {
      api.RemoveTourGuide.mockResolvedValue({
        status: 404,
        error: 'Not Found',
      });

      await store.actions.removeTourGuide({ commit }, data.getters.tourGuideData.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('removeTourGuide - error', async () => {
      api.RemoveTourGuide.mockRejectedValue(new Error());

      await store.actions.removeTourGuide({ commit }, data.getters.tourGuideData.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });
  });
});
