import api from '@/api/api';
import * as Types from '@/store/types';
import ticket from '@/store/modules/ticket';

jest.mock('@/api/api', () => ({
  GetTickets: jest.fn(),
  GetTicketBySku: jest.fn(),
  GetTicketByMerchant: jest.fn(),
  GetRestaurantTicket: jest.fn(),
  GetJourneyTicket: jest.fn(),
  RemoveTicket: jest.fn(),
}));

const store = ticket;

describe('Ticket modules', () => {
  const data = {
    state: {
      ticketDatas: [],
      ticketData: {},
      ticketByMerchant: [],
      ticketRestaurantByMerchant: [],
      ticketItineraryByMerchant: [],
      ticketRestaurant: [],
      ticketJourney: [],
      ticketPromotion: [],
    },
    getters: {
      ticketDatas: [{
        sku: 'SKU_0001',
        expiredDate: '2020-12-12',
        discount: 50000,
        category: 'journey',
      }, {
        sku: 'SKU_0002',
        expiredDate: '2019-12-12',
        discount: 50000,
        category: 'restaurant',
      }, {
        sku: 'SKU_0003',
        expiredDate: '2020-12-12',
        discount: 0,
        category: 'wisata',
      }],
      ticketData: {
        sku: 'SKU_0001',
        expiredDate: '2020-12-12',
        discount: 50000,
      },
      ticketByMerchant: [{
        sku: 'SKU_0001',
        expiredDate: '2020-12-12',
        discount: 50000,
        merchantSku: 'MERC_0001',
      }],
      ticketRestaurantByMerchant: [{
        sku: 'SKU_0002',
        expiredDate: '2019-12-12',
        discount: 50000,
        category: 'restaurant',
      }],
      ticketItineraryByMerchant: [{
        sku: 'SKU_0001',
        expiredDate: '2020-12-12',
        discount: 50000,
        category: 'journey',
      }, {
        sku: 'SKU_0003',
        expiredDate: '2020-12-12',
        discount: 0,
        category: 'wisata',
      }],
      ticketRestaurant: [{
        sku: 'SKU_0001',
        expiredDate: '2020-12-12',
        discount: 50000,
      }],
      ticketJourney: [{
        sku: 'SKU_0005',
        expiredDate: '2020-12-12',
        discount: 50000,
      }],
      ticketPromotion: [{
        sku: 'SKU_0001',
        expiredDate: '2020-12-12',
        discount: 50000,
        category: 'journey',
      }],
    },
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.ticketDatas(state)).toStrictEqual(state.ticketDatas);
    expect(store.getters.ticketData(state)).toStrictEqual(state.ticketData);
    expect(store.getters.ticketByMerchant(state)).toStrictEqual(
      state.ticketByMerchant,
    );
    expect(store.getters.ticketRestaurantByMerchant(state)).toStrictEqual(
      state.ticketRestaurantByMerchant,
    );
    expect(store.getters.ticketItineraryByMerchant(state)).toStrictEqual(
      state.ticketItineraryByMerchant,
    );
    expect(store.getters.ticketRestaurant(state)).toStrictEqual(
      state.ticketRestaurant,
    );
    expect(store.getters.ticketJourney(state)).toStrictEqual(
      state.ticketJourney,
    );
    expect(store.getters.ticketPromotion(state)).toStrictEqual(
      state.ticketPromotion,
    );
  });

  it('Mutations', () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_TICKET_DATA](state, res.ticketDatas);
    expect(state.ticketDatas).toStrictEqual(res.ticketDatas);

    store.mutations[Types.SET_TICKET_BY_SKU](state, res.ticketData);
    expect(state.ticketData).toStrictEqual(res.ticketData);

    store.mutations[Types.SET_TICKET_BY_MERCHANT](state, res.ticketByMerchant);
    expect(state.ticketByMerchant).toStrictEqual(res.ticketByMerchant);

    store.mutations[Types.SET_TICKET_RESTAURANT_BY_MERCHANT](
      state,
      res.ticketDatas,
    );
    expect(state.ticketRestaurantByMerchant).toStrictEqual(res.ticketRestaurantByMerchant);

    store.mutations[Types.SET_TICKET_ITINERARY_BY_MERCHANT](
      state,
      res.ticketDatas,
    );
    expect(state.ticketItineraryByMerchant).toStrictEqual(res.ticketItineraryByMerchant);

    store.mutations[Types.SET_TICKET_RESTAURANT](state, res.ticketRestaurant);
    expect(state.ticketRestaurant).toStrictEqual(res.ticketRestaurant);

    store.mutations[Types.SET_TICKET_JOURNEY](state, res.ticketJourney);
    expect(state.ticketJourney).toStrictEqual(res.ticketJourney);

    store.mutations[Types.SET_TICKET_PROMOTION](state, res.ticketDatas);
    expect(state.ticketPromotion).toStrictEqual(res.ticketPromotion);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getTicketData - success', async () => {
      api.GetTickets.mockResolvedValue({
        data: data.getters.ticketDatas,
      });

      await store.actions.getTicketData({ commit });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenNthCalledWith(
        1,
        Types.SET_TICKET_DATA,
        data.getters.ticketDatas,
      );
      expect(commit).toHaveBeenNthCalledWith(
        2,
        Types.SET_TICKET_PROMOTION,
        data.getters.ticketDatas,
      );
    });

    it('getTicketData - error', async () => {
      api.GetTickets.mockRejectedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getTicketData({ commit });

      expect(commit).not.toHaveBeenCalled();
    });

    it('getTicketBySku - success', async () => {
      api.GetTicketBySku.mockResolvedValue({
        data: data.getters.ticketData,
      });

      await store.actions.getTicketBySku({ commit }, data.getters.ticketData.sku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_TICKET_BY_SKU,
        data.getters.ticketData,
      );
    });

    it('getTicketBySku - error', async () => {
      api.GetTicketBySku.mockRejectedValue({
        status: 400,
        error: 'Bad Request',
      });

      await store.actions.getTicketBySku({ commit }, data.getters.ticketData.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getTicketByMerchant - success', async () => {
      api.GetTicketByMerchant.mockResolvedValue({
        code: 200,
        status: 'OK',
        data: data.getters.ticketByMerchant,
      });

      await store.actions.getTicketByMerchant({ commit }, 'MERC_0001');

      expect(commit).toHaveBeenCalledTimes(6);
      expect(commit).toHaveBeenNthCalledWith(
        4,
        Types.SET_TICKET_BY_MERCHANT,
        data.getters.ticketByMerchant,
      );
      expect(commit).toHaveBeenNthCalledWith(
        5,
        Types.SET_TICKET_RESTAURANT_BY_MERCHANT,
        data.getters.ticketByMerchant,
      );
      expect(commit).toHaveBeenNthCalledWith(
        6,
        Types.SET_TICKET_ITINERARY_BY_MERCHANT,
        data.getters.ticketByMerchant,
      );
    });

    it('getTicketByMerchant - error', async () => {
      api.GetTicketByMerchant.mockRejectedValue(new Error());

      await store.actions.getTicketByMerchant({ commit }, 'MERC_0001');

      expect(commit).toHaveBeenCalledTimes(3);
    });

    it('setTicketBySku', () => {
      store.actions.setTicketBySku({ commit }, data.getters.ticketData);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_TICKET_BY_SKU,
        data.getters.ticketData,
      );
    });

    it('getTicketRestaurant - success', async () => {
      api.GetRestaurantTicket.mockResolvedValue({
        data: data.getters.ticketRestaurant,
      });

      await store.actions.getTicketRestaurant(
        { commit },
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_TICKET_RESTAURANT,
        data.getters.ticketRestaurant,
      );
    });

    it('getTicketRestaurant - error', async () => {
      api.GetRestaurantTicket.mockRejectedValue(new Error());

      await store.actions.getTicketRestaurant(
        { commit },
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getTicketJourney - success', async () => {
      api.GetJourneyTicket.mockResolvedValue({
        data: data.getters.ticketJourney,
      });

      await store.actions.getTicketJourney(
        { commit },
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_TICKET_JOURNEY,
        data.getters.ticketJourney,
      );
    });

    it('getTicketJourney - error', async () => {
      api.GetJourneyTicket.mockRejectedValue(new Error());

      await store.actions.getTicketJourney(
        { commit },
      );

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getTicketPromotion', async () => {
      const getters = {
        ticketDatas: data.getters.ticketDatas,
      };

      await store.actions.getTicketPromotion({ commit, getters });

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_TICKET_PROMOTION,
        data.getters.ticketPromotion,
      );
    });

    it('removeTicket - success', async () => {
      api.RemoveTicket.mockResolvedValue({
        code: 200,
        status: 'OK',
      });

      await store.actions.removeTicket({ commit }, data.getters.ticketData.sku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.REMOVE_TICKET,
        data.getters.ticketData.sku,
      );
    });

    it('removeTicket - error', async () => {
      api.RemoveTicket.mockRejectedValue(new Error());

      await store.actions.removeTicket({ commit }, data.getters.ticketData.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });
  });
});
