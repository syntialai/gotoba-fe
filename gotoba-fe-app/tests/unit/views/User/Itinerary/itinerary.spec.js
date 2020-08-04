import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Itinerary from '@/views/User/Itinerary/Itinerary.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $router = {
  push: jest.fn(),
};

describe('Itinerary.vue', () => {
  const expectedData = {
    userSku: 'USER_0001',
    addItinerary: '/itinerary/add',
  };
  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      getSchedule: jest.fn(),
    };
    getters = {
      schedule: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(Itinerary, {
      mocks: {
        $router,
      },
      localVue,
      store,
      stubs: ['font-awesome-icon'],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check getSchedule actions when created', () => {
    expect(actions.getSchedule).toHaveBeenCalledTimes(1);
    expect(actions.getSchedule.mock.calls[0][1]).toMatch(expectedData.userSku);
  });

  it('Check addItinerary method to call router', () => {
    wrapper.vm.addItinerary();

    expect($router.push).toHaveBeenCalledTimes(1);
    expect($router.push).toHaveBeenCalledWith(expectedData.addItinerary);
  });
});
