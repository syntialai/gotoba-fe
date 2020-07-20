import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Promotion from '@/views/User/Home/Promotion.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = '/ticket/TICK__0001';

const $router = { push: jest.fn() };

describe('Promotion.vue', () => {
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      ticketPromotion: () => ([
        {
          image: '',
          title: 'Promotion 1',
          sku: 'TICK_0001',
          price: 100000,
        },
      ]),
    };
    actions = {
      getTicketPromotion: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(Promotion, {
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

  it('Check getTicketPromotion actions to be called when created', () => {
    expect(actions.getTicketPromotion).toHaveBeenCalled();
  });

  it('Check goToDetails method to navigate to Ticket details', () => {
    wrapper.vm.goToDetails('TICK__0001');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route);
  });
});
