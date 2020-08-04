import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Journey from '@/views/User/Journey/Journey.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  journey: '/journey/WIST_0001',
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
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('Check getTicketJourney and getJourneyData actions to be called when created', () => {
    expect(actions.getJourneyData).toHaveBeenCalledTimes(1);
    expect(actions.getTicketJourney).toHaveBeenCalledTimes(1);
  });

  it('Check goToDetails method to navigate to Ticket details', () => {
    const goToDetail = wrapper.vm.goToDetail('journey', 'WIST_0001');

    expect(goToDetail).toMatch($route.journey);
  });
});
