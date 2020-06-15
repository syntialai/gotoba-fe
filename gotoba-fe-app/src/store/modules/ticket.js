/* eslint-disable no-shadow */
import * as Types from '../types';
import api from '../../api/api';

const state = {
  ticketDatas: [],
  ticketData: {},
  ticketByMerchant: [],
  ticketRestaurant: [],
  ticketJourney: [],
  ticketHotel: [],
};

const actions = {
  getTicketData({ commit }, userSku, res) {
    commit(Types.GET_TICKET_DATA, res);

    api.GetTicketByUser(userSku)
      .then((res) => {
        console.log(res);
        commit(Types.GET_TICKET_DATA, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getTicketBySku({ commit }, sku, res) {
    commit(Types.GET_TICKET_BY_SKU, res);

    api.GetTicketBySku(sku)
      .then((res) => {
        console.log(res);
        commit(Types.GET_TICKET_BY_SKU, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getTicketByMerchant({ commit }, merchantSku, res) {
    commit(Types.GET_TICKET_BY_MERCHANT, res);

    api.GetTicketByMerchant(merchantSku)
      .then((res) => {
        console.log(res);
        commit(Types.GET_TICKET_BY_MERCHANT, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getTicketRestaurant({ commit }, res) {
    commit(Types.GET_TICKET_RESTAURANT, res);

    api.GetRestaurantTicket()
      .then((res) => {
        console.log(res);
        commit(Types.GET_TICKET_RESTAURANT, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getTicketJourney({ commit }, res) {
    commit(Types.GET_TICKET_JOURNEY, res);

    api.GetJourneyTicket()
      .then((res) => {
        console.log(res);
        commit(Types.GET_TICKET_JOURNEY, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getTicketHotel({ commit }, res) {
    commit(Types.GET_TICKET_HOTEL, res);

    api.GetHotelTicket()
      .then((res) => {
        console.log(res);
        commit(Types.GET_TICKET_HOTEL, res);
      })
      .catch((err) => {
        console.log(err);
      });
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
  ticketHotel: (state) => state.ticketHotel,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.GET_TICKET_DATA](state, res) {
    state.ticketDatas = res;
  },
  [Types.GET_TICKET_BY_SKU](state, res) {
    state.ticketData = res;
  },
  [Types.GET_TICKET_BY_MERCHANT](state, res) {
    state.ticketByMerchant = res;
  },
  [Types.GET_TICKET_RESTAURANT](state, res) {
    state.ticketRestaurant = res;
  },
  [Types.GET_TICKET_JOURNEY](state, res) {
    state.ticketJourney = res;
  },
  [Types.GET_TICKET_HOTEL](state, res) {
    state.ticketHotel = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
