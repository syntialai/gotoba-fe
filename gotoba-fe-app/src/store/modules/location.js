/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  locationData: [],
  locationSet: {},
  locationKeyword: '',
  newSchedule: [],
  schedule: [],
  selectedDate: {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
};

const actions = {
  async getLocationData({ commit }) {
    commit(Types.SET_LOCATION_DATA, []);

    const wist = await api.GetItineraries();
    const rest = await api.GetRestaurants();

    if (!rest.error && !wist.error) {
      commit(Types.SET_LOCATION_DATA, [...rest.data, ...wist.data]);
      console.log([...rest.data, ...wist.data]);
    }
  },

  async getSchedule({ commit }, userSku) {
    commit(Types.SET_SCHEDULE);

    try {
      const res = await api.GetTravellingSchedule(userSku);
      if (!res.error) {
        commit(Types.SET_SCHEDULE, res.data.map((item) => ({
          destination: item.address,
          time: new Date(item.date),
          formattedTime: item.date.split()[4],
        })));
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  },

  setLocation({ commit }, res) {
    commit(Types.SET_LOCATION, res);
  },

  setLocationKeyword({ commit }, keyword) {
    commit(Types.SET_LOCATION_KEYWORD, keyword);
  },

  addNewSchedule({ commit }, res) {
    commit(Types.SET_NEW_SCHEDULE, res);
  },

  setSelectedDate({ commit }, date) {
    commit(Types.SET_SELECTED_DATE, date);
  },
};

const getters = {
  locationData: (state) => state.locationData,
  locationSet: (state) => state.locationSet,
  locationKeyword: (state) => state.locationKeyword,
  schedule: (state) => state.schedule,
  newSchedule: (state) => state.newSchedule,
  selectedDate: (state) => state.selectedDate,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_LOCATION_DATA](state, res) {
    state.locationData = res;
  },
  [Types.SET_LOCATION](state, res) {
    state.locationSet = res;
    console.log(res);
  },
  [Types.SET_LOCATION_KEYWORD](state, res) {
    state.locationKeyword = res;
  },
  [Types.SET_SCHEDULE](state, res) {
    state.schedule = res;
  },
  [Types.SET_NEW_SCHEDULE](state, res) {
    state.newSchedule.push(res);
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
