import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import TourGuideProfile from '@/views/User/TourGuide/TourGuideProfile.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  params: {
    sku: 'TOUR_0001',
  },
};

describe('TourGuideProfile.vue', () => {
  // eslint-disable-next-line no-unused-vars
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      tourGuideData: () => ({
        image: '',
        name: 'TourGuide 1',
        sku: 'TOUR_0001',
      }),
    };
    actions = {
      getTourGuideBySku: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(TourGuideProfile, {
      mocks: {
        $route,
      },
      store,
      localVue,
      stubs: [
        'font-awesome-icon',
        'b-icon',
        'router-link',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check getTourGuideBySku and actions to be called when created', () => {
    expect(actions.getTourGuideBySku).toHaveBeenCalledTimes(1);
    expect(actions.getTourGuideBySku.mock.calls[0][1]).toEqual($route.params.sku);
  });
});
