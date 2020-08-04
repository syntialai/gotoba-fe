import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
// eslint-disable-next-line no-unused-vars
import VueAgile from 'vue-agile';
import Home from '@/views/User/Home/Home.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('vue-agile', () => ({
  VueAgile: jest.fn(),
}));

describe('Home.vue', () => {
  const expectedData = '/journey/SKU_0001';
  const data = {
    category: 'journey',
    sku: 'SKU_0001',
  };
  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      getGalleryData: jest.fn(),
      getRestaurantData: jest.fn(),
      getJourneyData: jest.fn(),
      getTicketData: jest.fn(),
    };
    getters = {
      restaurantDatas: () => [],
      journeyData: () => [],
      ticketPromotion: () => [],
      galleryData: () => [],
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(Home, {
      data() {
        return {
          mainMenus: [
            {
              name: 'Journey',
              link: '/more/journey',
              icon: 'map-marked-alt',
              color: 'green',
            },
            {
              name: 'Bistro',
              link: '/more/restaurant',
              icon: 'utensils',
              color: 'orange',
            },
            {
              name: 'Tour Guide',
              link: '/more/tour-guide',
              icon: 'user-tie',
              color: 'purple',
            },
          ],
        };
      },
      localVue,
      store,
      stubs: [
        'router-link',
        'font-awesome-icon',
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(actions.getGalleryData).toHaveBeenCalledTimes(1);
    expect(actions.getRestaurantData).toHaveBeenCalledTimes(1);
    expect(actions.getJourneyData).toHaveBeenCalledTimes(1);
    expect(actions.getTicketData).toHaveBeenCalledTimes(1);
  });

  it('Check goToDetails method to return link by category and sku params', () => {
    const goToDetails = wrapper.vm.goToDetails(data.category, data.sku);

    expect(goToDetails).toMatch(expectedData);
  });
});
