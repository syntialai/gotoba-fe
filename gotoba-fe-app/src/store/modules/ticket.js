/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';
import { isPassed, sortDate } from '../../utils/filter';

const state = {
  ticketDatas: [],
  ticketData: {},
  ticketByMerchant: [],
  ticketRestaurantByMerchant: [],
  ticketItineraryByMerchant: [],
  ticketRestaurant: [],
  ticketJourney: [],
  ticketPromotion: [],
};

const actions = {
  getTicketData({ commit }) {
    api.GetTickets()
      .then((res) => {
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
        commit(Types.SET_TICKET_BY_SKU, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getTicketByMerchant({ commit }, merchantSku) {
    commit(Types.SET_TICKET_BY_MERCHANT, []);
    commit(Types.SET_TICKET_RESTAURANT_BY_MERCHANT, []);
    commit(Types.SET_TICKET_ITINERARY_BY_MERCHANT, []);

    api.GetTicketByMerchant(merchantSku)
      .then((res) => {
        commit(Types.SET_TICKET_BY_MERCHANT, res.data);
        commit(Types.SET_TICKET_RESTAURANT_BY_MERCHANT, res.data);
        commit(Types.SET_TICKET_ITINERARY_BY_MERCHANT, res.data);
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
        commit(Types.SET_TICKET_RESTAURANT, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getTicketJourney({ commit }) {
    commit(Types.SET_TICKET_JOURNEY);

    api.GetJourneyTicket()
      .then((res) => {
        commit(Types.SET_TICKET_JOURNEY, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getTicketPromotion({ commit, getters }) {
    const tickets = getters.ticketDatas;

    const filterPromoTickets = tickets
      .filter((ticket) => !isPassed(new Date(ticket.expiredDate)) && ticket.discount > 0);

    commit(Types.SET_TICKET_PROMOTION, filterPromoTickets);
  },

  removeTicket({ commit }, sku) {
    commit(Types.REMOVE_TICKET);

    api.RemoveTicket(sku)
      .then((res) => {
        console.log(res);
        commit(Types.REMOVE_TICKET, sku);
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
  ticketRestaurantByMerchant: (state) => state.ticketRestaurantByMerchant,
  ticketItineraryByMerchant: (state) => state.ticketItineraryByMerchant,
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
  [Types.SET_TICKET_RESTAURANT_BY_MERCHANT](state, res) {
    state.ticketRestaurantByMerchant = res.filter((item) => item.category === 'restaurant');
  },
  [Types.SET_TICKET_ITINERARY_BY_MERCHANT](state, res) {
    state.ticketItineraryByMerchant = res.filter((item) => item.category === 'journey' || item.category === 'wisata');
  },
  [Types.SET_TICKET_RESTAURANT](state, res) {
    state.ticketRestaurant = res;
  },
  [Types.SET_TICKET_JOURNEY](state, res) {
    state.ticketJourney = res;
  },
  [Types.SET_TICKET_PROMOTION](state, res) {
    const filterPromoTickets = res
      .filter((ticket) => !isPassed(new Date(ticket.expiredDate)) && ticket.discount > 0);

    const sortedTicket = sortDate(filterPromoTickets, 'expiredDate');

    state.ticketPromotion = sortedTicket;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
