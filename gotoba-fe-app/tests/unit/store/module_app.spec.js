import * as Types from '@/store/types';
import app from '@/store/modules/app';

const store = app;

describe('App modules', () => {
  const data = {
    state: {
      showAlert: false,
      showToast: false,
      alertMessage: '',
      alertSuccess: false,
      toastMessage: '',
    },
    getters: {
      showAlert: true,
      showToast: true,
      alertMessage: 'alert called',
      alertSuccess: true,
      toastMessage: 'toast called',
    },
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.showToast(state)).toStrictEqual(state.showToast);
    expect(store.getters.showAlert(state)).toStrictEqual(state.showAlert);
    expect(store.getters.alertMessage(state)).toStrictEqual(state.alertMessage);
    expect(store.getters.alertSuccess(state)).toStrictEqual(state.alertSuccess);
    expect(store.getters.toastMessage(state)).toStrictEqual(state.toastMessage);
  });

  it('Mutations', () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SHOW_ALERT](state, res.showAlert);
    store.mutations[Types.SHOW_TOAST](state, res.showToast);
    store.mutations[Types.SET_TOAST_MESSAGE](state, res.toastMessage);
    store.mutations[Types.SET_ALERT_MESSAGE](state, res.alertMessage);
    store.mutations[Types.SET_ALERT_SUCCESS](state, res.alertSuccess);

    expect(state.showAlert).toBe(res.showAlert);
    expect(state.showToast).toBe(res.showToast);
    expect(state.alertMessage).toBe(res.alertMessage);
    expect(state.alertSuccess).toBe(res.alertSuccess);
    expect(state.toastMessage).toBe(res.toastMessage);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('setShowAlert', () => {
      store.actions.setShowAlert({ commit }, data.getters.showAlert);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SHOW_ALERT,
        data.getters.showAlert,
      );
    });

    it('setShowToast', () => {
      store.actions.setShowToast({ commit }, data.getters.showToast);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SHOW_TOAST,
        data.getters.showToast,
      );
    });

    it('setAlertMessage', () => {
      store.actions.setAlertMessage({ commit }, data.getters.alertMessage);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_ALERT_MESSAGE,
        data.getters.alertMessage,
      );
    });

    it('setAlertSuccess', () => {
      store.actions.setAlertSuccess({ commit }, data.getters.alertSuccess);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_ALERT_SUCCESS,
        data.getters.alertSuccess,
      );
    });

    it('setToastMessage', () => {
      store.actions.setToastMessage({ commit }, data.getters.toastMessage);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_TOAST_MESSAGE,
        data.getters.toastMessage,
      );
    });
  });
});
