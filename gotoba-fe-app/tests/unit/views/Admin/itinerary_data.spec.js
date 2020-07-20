import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ItineraryData from '@/views/Admin/ItineraryData.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ItineraryData.vue', () => {
  const expectedData = {
    dataStart: 1,
    dataEnd: {
      if: 2,
      else: 3,
    },
  };
  const data = {
    currentPage: 1,
    perPage: 5,
  };
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      journeyData: () => ([
        {
          image: '',
          name: 'Tour Guide 1',
          sku: 'TOUR_0001',
        },
        {
          image: '',
          name: 'Tour Guide 1',
          sku: 'TOUR_0001',
        },
        {
          image: '',
          name: 'Tour Guide 1',
          sku: 'TOUR_0001',
        },
      ]),
    };
    actions = {
      getJourneyData: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(ItineraryData, {
      data() {
        return data;
      },
      store,
      localVue,
      stubs: ['b-button', 'b-modal'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('Check getJourneyData actions to be called when created', () => {
    expect(actions.getJourneyData).toHaveBeenCalled();
  });

  it('Check dataStart computed to return begin data', () => {
    expect(wrapper.vm.dataStart).toBe(expectedData.dataStart);
  });

  it('Check dataEnd computed to return end data when journeyData length is more than counted end data', () => {
    wrapper.setData({ perPage: 2 });
    expect(wrapper.vm.dataEnd).toBe(expectedData.dataEnd.if);
  });

  it('Check dataEnd computed to return end data when journeyData length is less than counted end data', () => {
    wrapper.setData({ perPage: 5 });
    expect(wrapper.vm.dataEnd).toBe(expectedData.dataEnd.else);
  });
});
