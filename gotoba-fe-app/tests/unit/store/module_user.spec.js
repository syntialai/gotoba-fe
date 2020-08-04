import api from '@/api/api';
import * as Types from '@/store/types';
import user from '@/store/modules/user';

jest.mock('@/api/api', () => ({
  GetUsers: jest.fn(),
  GetUserBySku: jest.fn(),
}));

const store = user;

describe('User modules', () => {
  const data = {
    state: {
      userData: [],
      userDataBySku: {},
    },
    getters: {
      userData: [{
        sku: 'USER_0001',
      }],
      userDataBySku: {
        sku: 'USER_0001',
      },
    },
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.userData(state)).toStrictEqual(state.userData);
    expect(store.getters.userDataBySku(state)).toStrictEqual(state.userDataBySku);
  });

  it('Mutations', () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_USER_DATA](state, res.userData);
    store.mutations[Types.SET_USER_DATA_BY_SKU](state, res.userDataBySku);

    expect(state.userData).toStrictEqual(res.userData);
    expect(state.userDataBySku).toStrictEqual(res.userDataBySku);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getUserData - success', async () => {
      api.GetUsers.mockResolvedValue({
        data: data.getters.userData,
      });

      await store.actions.getUserData({ commit });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_USER_DATA,
        data.getters.userData,
      );
    });

    it('getUserData - error', async () => {
      api.GetUsers.mockRejectedValue(new Error());

      await store.actions.getUserData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getUserBySku - success', async () => {
      api.GetUserBySku.mockResolvedValue({
        data: data.getters.userDataBySku,
      });

      await store.actions.getUserBySku({ commit }, data.getters.userDataBySku.sku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_USER_DATA_BY_SKU,
        data.getters.userDataBySku,
      );
    });

    it('getUserBySku - error', async () => {
      api.GetUserBySku.mockRejectedValue(new Error());

      await store.actions.getUserBySku({ commit }, data.getters.userDataBySku.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });
  });
});
