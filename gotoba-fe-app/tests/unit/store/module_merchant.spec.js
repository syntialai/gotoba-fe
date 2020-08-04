import api from '@/api/api';
import * as Types from '@/store/types';
import merchant from '@/store/modules/merchant';

jest.mock('@/api/api', () => ({
  GetMerchants: jest.fn(),
  GetMerchantBySku: jest.fn(),
}));

const store = merchant;

describe('Merchant modules', () => {
  const data = {
    state: {
      merchantDatas: [],
      merchantData: {},
    },
    getters: {
      merchantDatas: [{
        sku: 'MERC_0001',
      }],
      merchantData: {
        sku: 'MERC_0001',
      },
    },
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.merchantDatas(state)).toStrictEqual(state.merchantDatas);
    expect(store.getters.merchantData(state)).toStrictEqual(state.merchantData);
  });

  it('Mutations', () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_MERCHANT_DATA](state, res.merchantDatas);
    store.mutations[Types.SET_MERCHANT_DATA_BY_SKU](state, res.merchantData);

    expect(state.merchantDatas).toStrictEqual(res.merchantDatas);
    expect(state.merchantData).toStrictEqual(res.merchantData);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getMerchantData - success', async () => {
      api.GetMerchants.mockResolvedValue({
        data: data.getters.merchantDatas,
      });

      await store.actions.getMerchantData({ commit });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_MERCHANT_DATA,
        data.getters.merchantDatas,
      );
    });

    it('getMerchantData - error', async () => {
      api.GetMerchants.mockRejectedValue(new Error());

      await store.actions.getMerchantData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getMerchantDataBySku - success', async () => {
      api.GetMerchantBySku.mockResolvedValue({
        data: data.getters.merchantData,
      });

      await store.actions.getMerchantDataBySku({ commit }, data.getters.merchantData.sku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_MERCHANT_DATA_BY_SKU,
        data.getters.merchantData,
      );
    });

    it('getMerchantDataBySku - error', async () => {
      api.GetMerchantBySku.mockRejectedValue(new Error());

      await store.actions.getMerchantDataBySku({ commit }, data.getters.merchantData.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });
  });
});
