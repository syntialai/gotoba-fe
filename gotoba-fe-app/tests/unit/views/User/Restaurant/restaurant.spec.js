import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Restaurant from '@/views/User/Restaurant/Restaurant.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  restaurant: '/restaurant/REST_0001',
  ticket: '/ticket/TICK__0001',
};

const $router = { push: jest.fn() };

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
      mocks: {
        $route,
        $router,
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

  it('Check getTicketRestaurant and getRestaurantData actions to be called when created', () => {
    expect(actions.getRestaurantData).toHaveBeenCalled();
    expect(actions.getTicketRestaurant).toHaveBeenCalled();
  });

  it('Check goToProfile method to navigate to Restaurant details', () => {
    wrapper.vm.goToProfile('REST_0001');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.restaurant);
  });

  it('Check goToDetails method to navigate to Ticket details', () => {
    wrapper.vm.goToDetails('TICK__0001');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.ticket);
  });
});
