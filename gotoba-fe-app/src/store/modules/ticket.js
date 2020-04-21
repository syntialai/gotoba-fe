/* eslint-disable no-shadow */
import * as Types from '../types';

const state = {
  ticketData: {},
};

const actions = {
  getTicketData({ commit }, res) {
    commit(Types.GET_TICKET_DATA, res);
  },
};

const getters = {
  ticketData: (state) => state.ticketData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.GET_TICKET_DATA](state, res) {
    state.ticketData = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
