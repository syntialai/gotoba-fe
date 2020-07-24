/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';
import { isPassed } from '../../utils/filter';

const state = {
  ticketDatas: [],
  ticketData: {},
  ticketByMerchant: [],
  ticketRestaurant: [],
  ticketJourney: [],
  ticketPromotion: [],
};

const actions = {
  getTicketData({ commit }) {
    commit(Types.SET_TICKET_DATA);

    api.GetTickets()
      .then((res) => {
        console.log(res);
        commit(Types.SET_TICKET_DATA, res.data);
        commit(Types.SET_TICKET_PROMOTION, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  setTicketBySku({ commit }, res) {
    commit(Types.SET_TICKET_BY_SKU, res);
  },

  getTicketBySku({ commit }, sku) {
    commit(Types.SET_TICKET_BY_SKU);

    api.GetTicketBySku(sku)
      .then((res) => {
        console.log(res.data);
        commit(Types.SET_TICKET_BY_SKU, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getTicketByMerchant({ commit }, merchantSku) {
    commit(Types.SET_TICKET_BY_MERCHANT);

    api.GetTicketByMerchant(merchantSku)
      .then((res) => {
        console.log(res);
        commit(Types.SET_TICKET_BY_MERCHANT, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getTicketRestaurant({ commit }) {
    commit(Types.SET_TICKET_RESTAURANT);

    api.GetRestaurantTicket()
      .then((res) => {
        console.log(res);
        commit(Types.SET_TICKET_RESTAURANT, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getTicketJourney({ commit }) {
    commit(Types.SET_TICKET_JOURNEY);

    api.GetJourneyTicket()
      .then((res) => {
        console.log(res);
        commit(Types.SET_TICKET_JOURNEY, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getTicketPromotion({ commit, getters }) {
    const tickets = getters.ticketDatas;
    const filterPromoTickets = tickets
      .filter((ticket) => !isPassed(ticket.expiredDate) && ticket.discount > 0)
      .sort((a, b) => b.expiredDate - a.expiredDate);

    commit(Types.SET_TICKET_PROMOTION, filterPromoTickets);
  },

  removeTicket({ commit }, sku) {
    commit(Types.REMOVE_TICKET);

    api.RemoveTicket(sku)
      .then((res) => {
        commit(Types.REMOVE_TICKET, res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  ticketDatas: (state) => state.ticketDatas,
  ticketData: (state) => state.ticketData,
  ticketByMerchant: (state) => state.ticketByMerchant,
  ticketRestaurant: (state) => state.ticketRestaurant,
  ticketJourney: (state) => state.ticketJourney,
  ticketPromotion: (state) => state.ticketPromotion,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_TICKET_DATA](state, res) {
    state.ticketDatas = res;
  },
  [Types.SET_TICKET_BY_SKU](state, res) {
    state.ticketData = res;
  },
  [Types.SET_TICKET_BY_MERCHANT](state, res) {
    state.ticketByMerchant = res;
  },
  [Types.SET_TICKET_RESTAURANT](state, res) {
    state.ticketRestaurant = res;
  },
  [Types.SET_TICKET_JOURNEY](state, res) {
    state.ticketJourney = res;
  },
  [Types.SET_TICKET_PROMOTION](state, res) {
    const filterPromoTickets = res
      .filter((ticket) => !isPassed(ticket.expiredDate) && ticket.discount > 0)
      .sort((a, b) => b.expiredDate - a.expiredDate);

    state.ticketPromotion = filterPromoTickets;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
