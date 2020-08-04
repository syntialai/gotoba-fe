import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import TourGuide from '@/views/User/TourGuide/TourGuide.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = '/tour-guide/TOUR_0001';

describe('TourGuide.vue', () => {
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      tourGuideDatas: () => ([
        {
          image: '',
          title: 'TourGuide 1',
          sku: 'TOUR_0001',
          price: 100000,
        },
      ]),
    };
    actions = {
      getTourGuideData: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(TourGuide, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check getTourGuideData actions to be called when created', () => {
    expect(actions.getTourGuideData).toHaveBeenCalled();
  });
});
