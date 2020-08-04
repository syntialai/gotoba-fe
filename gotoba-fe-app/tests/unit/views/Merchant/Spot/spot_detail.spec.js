import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import SpotDetail from '@/views/Merchant/Spot/SpotDetail.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  params: { sku: 'WIST_0001' },
};

describe('SpotDetail.vue', () => {
  const expectedData = {
    userSku: 'USER_0001',
  };

  let actions;
  let getters;
  let store;
  // eslint-disable-next-line no-unused-vars
  let wrapper;

  beforeEach(() => {
    getters = {
      journeyDataBySku: () => ({}),
      userSku: () => 'USER_0001',
      ticketItineraryByMerchant: () => [],
    };
    actions = {
      getJourneyDataBySku: jest.fn(),
      getTicketByMerchant: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(SpotDetail, {
      mocks: {
        $route,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(actions.getJourneyDataBySku).toHaveBeenCalledTimes(1);
    expect(actions.getJourneyDataBySku.mock.calls[0][1]).toMatch($route.params.sku);

    expect(actions.getTicketByMerchant).toHaveBeenCalledTimes(1);
    expect(actions.getTicketByMerchant.mock.calls[0][1]).toMatch(expectedData.userSku);
  });
});
