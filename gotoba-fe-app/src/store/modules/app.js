/* eslint-disable no-shadow */
import * as Types from '../types';

const state = {
  showAlert: false,
  showToast: false,
  alertMessage: '',
  alertSuccess: false,
  toastMessage: '',
};

const actions = {
  setShowAlert({ commit }, status) {
    commit(Types.SHOW_ALERT, status);
  },
  setShowToast({ commit }, status) {
    commit(Types.SHOW_TOAST, status);
  },
  setAlertMessage({ commit }, message) {
    commit(Types.SET_ALERT_MESSAGE, message);
  },
  setAlertSuccess({ commit }, status) {
    commit(Types.SET_ALERT_SUCCESS, status);
  },
  setToastMessage({ commit }, message) {
    commit(Types.SET_TOAST_MESSAGE, message);
  },
};

const getters = {
  showToast: (state) => state.showToast,
  showAlert: (state) => state.showAlert,
  alertMessage: (state) => state.alertMessage,
  alertSuccess: (state) => state.alertSuccess,
  toastMessage: (state) => state.toastMessage,
};

const mutations = {
  [Types.SHOW_ALERT](state, status) {
    state.showAlert = status;
  },
  [Types.SHOW_TOAST](state, status) {
    state.showToast = status;
  },
  [Types.SET_ALERT_MESSAGE](state, res) {
    state.alertMessage = res;
  },
  [Types.SET_ALERT_SUCCESS](state, status) {
    state.alertSuccess = status;
  },
  [Types.SET_TOAST_MESSAGE](state, res) {
    state.toastMessage = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
