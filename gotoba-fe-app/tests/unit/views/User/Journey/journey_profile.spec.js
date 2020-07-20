import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import JourneyProfile from '@/views/User/Journey/JourneyProfile.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  params: {
    sku: 'WIST_0001',
  },
};

describe('JourneyProfile.vue', () => {
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      journeyDataBySku: () => ({
        image: '',
        title: 'Journey 1',
        sku: 'WIST_0001',
        price: 100000,
      }),
    };
    actions = {
      getJourneyDataBySku: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(JourneyProfile, {
      mocks: {
        $route,
      },
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('Check getJourneyDataBySku actions to be called when created', () => {
    expect(actions.getJourneyDataBySku).toHaveBeenCalledTimes(1);
    expect(actions.getJourneyDataBySku.mock.calls[0][1]).toEqual($route.params.sku);
  });
});
