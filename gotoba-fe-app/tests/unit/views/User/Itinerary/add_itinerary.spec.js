import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import AddItinerary from '@/views/User/Itinerary/AddItinerary.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $router = {
  push: jest.fn(),
  go: jest.fn(),
};

describe('AddItinerary.vue', () => {
  // const expectedData = {
  //   userSku: 'USER_0001',
  //   link: '/itinerary',
  // };
  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      getLocationData: jest.fn(),
      setLocationKeyword: jest.fn(),
      clearNewSchedule: jest.fn(),
      setLocationOpen: jest.fn(),
    };
    getters = {
      schedule: () => [],
      userSku: () => 'USER_0001',
      locationData: () => [],
      newSchedule: () => [],
      selectedDate: () => ({
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      }),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(AddItinerary, {
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

  it('Check getLocationData actions when created', () => {
    expect(actions.getLocationData).toHaveBeenCalledTimes(1);
  });

  it('Check setDefault method to call actions and method', () => {
    wrapper.vm.setDefault();

    expect(actions.setLocationKeyword).toHaveBeenCalledTimes(1);
    expect(actions.setLocationKeyword.mock.calls[0][1]).toMatch('');

    expect(actions.setLocationOpen).toHaveBeenCalledTimes(1);
    expect(actions.setLocationOpen.mock.calls[0][1]).toBe(true);

    expect(actions.clearNewSchedule).toHaveBeenCalledTimes(1);
  });

  it('Check goBack method to call router', () => {
    const setDefault = jest.spyOn(wrapper.vm, 'setDefault');
    wrapper.vm.goBack();

    expect(setDefault).toHaveBeenCalledTimes(1);

    expect($router.go).toHaveBeenCalledTimes(1);
    expect($router.go).toHaveBeenCalledWith(-1);
  });
});
