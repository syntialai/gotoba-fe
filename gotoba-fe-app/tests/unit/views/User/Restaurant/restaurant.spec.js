import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Restaurant from '@/views/User/Restaurant/Restaurant.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  restaurant: '/restaurant/REST_0001',
  ticket: '/ticket/TICK__0001',
};

describe('Restaurant.vue', () => {
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      restaurantDatas: () => ([
        {
          image: '',
          title: 'Restaurant 1',
          sku: 'REST_0001',
          price: 100000,
        },
      ]),
      ticketRestaurant: () => ([
        {
          image: '',
          title: 'Restaurant 1',
          sku: 'TICK_0001',
          price: 100000,
        },
      ]),
    };
    actions = {
      getRestaurantData: jest.fn(),
      getTicketRestaurant: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(Restaurant, {
      store,
      localVue,
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check getTicketRestaurant and getRestaurantData actions to be called when created', () => {
    expect(actions.getRestaurantData).toHaveBeenCalledTimes(1);
    expect(actions.getTicketRestaurant).toHaveBeenCalledTimes(1);
  });

  it('Check goToProfile method to return link to Restaurant details', () => {
    const goToProfile = wrapper.vm.goToProfile('REST_0001');

    expect(goToProfile).toMatch($route.restaurant);
  });

  it('Check goToDetails method to return link to Ticket details', () => {
    const goToTicket = wrapper.vm.goToDetails('TICK__0001');

    expect(goToTicket).toMatch($route.ticket);
  });
});
