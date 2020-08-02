import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Spot from '@/views/Merchant/Spot/Spot.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('Spot.vue', () => {
  const expectedData = {
    cardInfo: {
      info1: 'Spots Active',
      value1: 1,
      info2: 'Recent Orders',
      value2: 2,
    },
    userSku: 'USER_0001',
    itineraries: [{
      sku: 'JOUR_0001',
    }],
  };

  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      getJourneyDataByMerchantSku: jest.fn(),
      getMerchantOrderCount: jest.fn(),
    };
    getters = {
      merchantOrderCount: () => ({
        itinerary: 2,
        restaurant: 1,
      }),
      userSku: () => 'USER_0001',
      journeyDataByMerchantSku: () => [{
        sku: 'JOUR_0001',
      }],
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(Spot, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check cardInfo computed to return count of ordered ticket', () => {
    expect(wrapper.vm.cardInfo).toStrictEqual(expectedData.cardInfo);
  });

  it('Check itineraries computed to return getters value', () => {
    expect(wrapper.vm.itineraries).toStrictEqual(expectedData.itineraries);
  });

  it('Check actions called when created', () => {
    expect(actions.getJourneyDataByMerchantSku).toHaveBeenCalledTimes(1);
    expect(actions.getJourneyDataByMerchantSku.mock.calls[0][1]).toMatch(expectedData.userSku);

    expect(actions.getMerchantOrderCount).toHaveBeenCalledTimes(1);
  });
});
