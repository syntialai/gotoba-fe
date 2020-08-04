import api from '@/api/api';
import * as Types from '@/store/types';
import auth from '@/store/modules/auth';

jest.mock('@/api/api', () => ({
  CheckToken: jest.fn(),
  Logout: jest.fn(),
}));

const store = auth;

describe('Auth modules', () => {
  const data = {
    state: {
      userLoginStatus: false,
      userName: '',
      userSku: '',
      userImage: '',
      userRole: '',
      isAuthenticated: false,
    },
    getters: {
      userLoginStatus: true,
      userName: 'Syntia',
      userSku: 'SYNT_0001',
      userImage: '/img/SYNT_0001',
      userRole: 'ROLE_USER',
      isAuthenticated: true,
    },
    res: {
      name: 'Syntia',
      sku: 'SYNT_0001',
      role: 'ROLE_USER',
      image: '/img/SYNT_0001',
    },
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.userLoginStatus(state)).toStrictEqual(state.userLoginStatus);
    expect(store.getters.isAuthenticated(state)).toStrictEqual(state.isAuthenticated);
    expect(store.getters.userName(state)).toStrictEqual(state.userName);
    expect(store.getters.userSku(state)).toStrictEqual(state.userSku);
    expect(store.getters.userImage(state)).toStrictEqual(state.userImage);
    expect(store.getters.userRole(state)).toStrictEqual(state.userRole);
  });

  it('Mutations', () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_USER_LOGIN_STATUS](state, res.userLoginStatus);
    store.mutations[Types.SET_IS_AUTHENTICATED](state, res.isAuthenticated);
    store.mutations[Types.SET_USER_NAME](state, res.userName);
    store.mutations[Types.SET_USER_SKU](state, res.userSku);
    store.mutations[Types.SET_USER_IMAGE](state, res.userImage);
    store.mutations[Types.SET_USER_ROLE](state, res.userRole);

    expect(state.isAuthenticated).toBe(res.isAuthenticated);
    expect(state.userLoginStatus).toBe(res.userLoginStatus);
    expect(state.userName).toBe(res.userName);
    expect(state.userSku).toBe(res.userSku);
    expect(state.userImage).toBe(res.userImage);
    expect(state.userRole).toBe(res.userRole);
  });

  describe('Actions', () => {
    let commit;
    let removeItem;
    let setItem;

    beforeEach(() => {
      commit = jest.fn();
      removeItem = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'removeItem');
      setItem = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    });

    afterEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
    });

    it('setUserInfo', () => {
      store.actions.setUserInfo({ commit }, data.res);

      expect(setItem).toHaveBeenCalledTimes(5);
      expect(setItem).toHaveBeenNthCalledWith(
        1,
        'userName',
        data.getters.userName,
      );
      expect(setItem).toHaveBeenNthCalledWith(
        2,
        'userSku',
        data.getters.userSku,
      );
      expect(setItem).toHaveBeenNthCalledWith(
        3,
        'userLoginStatus',
        data.getters.userLoginStatus,
      );
      expect(setItem).toHaveBeenNthCalledWith(
        4,
        'userRole',
        data.getters.userRole,
      );
      expect(setItem).toHaveBeenNthCalledWith(
        5,
        'userImage',
        data.getters.userImage,
      );

      expect(commit).toHaveBeenCalledTimes(5);
      expect(commit).toHaveBeenNthCalledWith(
        1,
        Types.SET_USER_NAME,
        data.getters.userName,
      );
      expect(commit).toHaveBeenNthCalledWith(
        2,
        Types.SET_USER_SKU,
        data.getters.userSku,
      );
      expect(commit).toHaveBeenNthCalledWith(
        3,
        Types.SET_USER_LOGIN_STATUS,
        data.getters.userLoginStatus,
      );
      expect(commit).toHaveBeenNthCalledWith(
        4,
        Types.SET_USER_ROLE,
        data.getters.userRole,
      );
      expect(commit).toHaveBeenNthCalledWith(
        5,
        Types.SET_USER_IMAGE,
        data.getters.userImage,
      );
    });

    it('setIsAuthenticated', () => {
      store.actions.setIsAuthenticated({ commit }, data.getters.isAuthenticated);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_IS_AUTHENTICATED,
        data.getters.isAuthenticated,
      );
    });

    it('getIsAuthenticated - success', async () => {
      api.CheckToken.mockResolvedValue({
        code: 200,
        status: 'OK',
      });

      await store.actions.getIsAuthenticated({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_IS_AUTHENTICATED,
        data.getters.isAuthenticated,
      );
    });

    it('getIsAuthenticated - errors', async () => {
      api.CheckToken.mockRejectedValue(new Error());

      await store.actions.getIsAuthenticated({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_IS_AUTHENTICATED,
        !data.getters.isAuthenticated,
      );
    });

    it('setLogOut - success', async () => {
      api.Logout.mockResolvedValue({
        code: 200,
        status: 'OK',
      });

      await store.actions.setLogOut({ commit });

      expect(removeItem).toHaveBeenCalledTimes(5);
      expect(removeItem).toHaveBeenNthCalledWith(
        1,
        'userName',
      );
      expect(removeItem).toHaveBeenNthCalledWith(
        2,
        'userSku',
      );
      expect(removeItem).toHaveBeenNthCalledWith(
        3,
        'userLoginStatus',
      );
      expect(removeItem).toHaveBeenNthCalledWith(
        4,
        'userRole',
      );
      expect(removeItem).toHaveBeenNthCalledWith(
        5,
        'userImage',
      );

      expect(commit).toHaveBeenCalledTimes(5);
      expect(commit).toHaveBeenNthCalledWith(
        1,
        Types.SET_USER_NAME,
        '',
      );
      expect(commit).toHaveBeenNthCalledWith(
        2,
        Types.SET_USER_SKU,
        '',
      );
      expect(commit).toHaveBeenNthCalledWith(
        3,
        Types.SET_USER_LOGIN_STATUS,
        false,
      );
      expect(commit).toHaveBeenNthCalledWith(
        4,
        Types.SET_USER_ROLE,
        '',
      );
      expect(commit).toHaveBeenNthCalledWith(
        5,
        Types.SET_USER_IMAGE,
        '',
      );
    });

    it('setLogOut - error', async () => {
      api.Logout.mockRejectedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.setLogOut({ commit });

      expect(removeItem).not.toHaveBeenCalled();
      expect(commit).not.toHaveBeenCalled();
    });
  });
});
