import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Journey from '@/views/User/Journey/Journey.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  journey: '/journey/WIST_0001',
  ticket: '/ticket/TICK__0001',
};

const $router = { push: jest.fn() };

describe('Journey.vue', () => {
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      journeyData: () => ([
        {
          image: '',
          title: 'Journey 1',
          sku: 'WIST_0001',
          price: 100000,
        },
      ]),
      ticketJourney: () => ([
        {
          image: '',
          title: 'Journey 1',
          sku: 'TICK_0001',
          price: 100000,
        },
      ]),
    };
    actions = {
      getJourneyData: jest.fn(),
      getTicketJourney: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(Journey, {
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

  it('Check getTicketJourney and getJourneyData actions to be called when created', () => {
    expect(actions.getJourneyData).toHaveBeenCalled();
    expect(actions.getTicketJourney).toHaveBeenCalled();
  });

  it('Check goToProfile method to navigate to Journey details', () => {
    wrapper.vm.goToProfile('WIST_0001');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.journey);
  });

  it('Check goToDetails method to navigate to Ticket details', () => {
    wrapper.vm.goToDetails('TICK__0001');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.ticket);
  });
});
