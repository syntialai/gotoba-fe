/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  newSchedule: [],
  schedule: [],
  selectedDate: {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
};

const actions = {
  async getSchedule({ commit }, userSku) {
    commit(Types.SET_SCHEDULE, []);

    try {
      const res = await api.GetTravellingSchedule(userSku);
      if (!res.error) {
        const schedules = res.data;
        commit(Types.SET_SCHEDULE, schedules.sort((a, b) => new Date(a) - new Date(b)));
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  },
  clearNewSchedule({ commit }) {
    commit(Types.CLEAR_NEW_SCHEDULE);
  },
  addNewSchedule({ commit, state }, res) {
    const index = state.newSchedule.findIndex((item) => item.date === res.date);
    if (index === -1) {
      commit(Types.SET_NEW_SCHEDULE, res);
      return;
    }
    commit(Types.SET_NEW_SCHEDULE_DETAIL, {
      schedule: res.schedule,
      index,
    });
  },
  setSelectedDate({ commit }, date) {
    commit(Types.SET_SELECTED_DATE, date);
  },
};

const getters = {
  schedule: (state) => state.schedule,
  newSchedule: (state) => state.newSchedule,
  selectedDate: (state) => state.selectedDate,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_SCHEDULE](state, res) {
    state.schedule = res;
  },
  [Types.SET_NEW_SCHEDULE](state, res) {
    state.newSchedule.push(res);
  },
  [Types.CLEAR_NEW_SCHEDULE](state) {
    state.newSchedule = [];
  },
  [Types.SET_NEW_SCHEDULE_DETAIL](state, res) {
    state.newSchedule[res.index].schedule.push(
      ...res.schedule,
    );
  },
  [Types.SET_SELECTED_DATE](state, date) {
    state.selectedDate = {
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
