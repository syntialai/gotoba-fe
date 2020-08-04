import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import api from '@/api/api';
import AddItinerary from '@/views/User/Itinerary/AddItinerary.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  PostTravellingSchedule: jest.fn(),
  EditTravellingSchedule: jest.fn(),
}));

const $router = {
  push: jest.fn(),
  go: jest.fn(),
};

describe('AddItinerary.vue - POST', () => {
  const expectedData = {
    userSku: 'USER_0001',
    link: '/itinerary',
    post: {
      userSku: 'USER_0001',
      date: '2020-12-12',
      schedule: [{
        time: '12:00 AM',
        destination: 'Mikie',
      }],
    },
  };
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
      newSchedule: () => [{
        date: '2020-12-12',
        schedule: [{
          time: '12:00 AM',
          destination: 'Mikie',
        }],
      }],
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

  it('Check submitTravellingSchedule method to call PostTravellingSchedule', async () => {
    api.PostTravellingSchedule.mockResolvedValue({
      code: 200,
      status: 'OK',
    });
    const setDefault = jest.spyOn(wrapper.vm, 'setDefault');

    wrapper.vm.submitTravellingSchedule();
    await flushPromises();

    expect(api.PostTravellingSchedule).toHaveBeenCalledTimes(1);
    expect(api.PostTravellingSchedule).toHaveBeenCalledWith(
      expectedData.userSku,
      expectedData.post,
    );

    expect(setDefault).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData.link);
  });

  it('Check submitTravellingSchedule method to call PostTravellingSchedule - error', async () => {
    api.PostTravellingSchedule.mockRejectedValue({
      error: 'Bad Request',
    });
    const setDefault = jest.spyOn(wrapper.vm, 'setDefault');

    wrapper.vm.submitTravellingSchedule();
    await flushPromises();

    expect(api.PostTravellingSchedule).toHaveBeenCalledTimes(1);
    expect(api.PostTravellingSchedule).toHaveBeenCalledWith(
      expectedData.userSku,
      expectedData.post,
    );

    expect(setDefault).not.toHaveBeenCalled();
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
  });
});

describe('AddItinerary.vue - EDIT', () => {
  const expectedData = {
    userSku: 'USER_0001',
    link: '/itinerary',
    edit: {
      date: '2020-12-12',
      sku: 'TRAV_0001',
      schedule: [{
        time: '12:00 AM',
        destination: 'Mikie',
      }, {
        time: '09:00 AM',
        destination: 'Warung',
      }],
    },
  };
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
      schedule: () => [{
        date: '2020-12-12',
        sku: 'TRAV_0001',
        schedule: [{
          time: '09:00 AM',
          destination: 'Warung',
        }],
      }],
      userSku: () => 'USER_0001',
      locationData: () => [],
      newSchedule: () => [{
        date: '2020-12-12',
        sku: 'TRAV_0001',
        schedule: [{
          time: '12:00 AM',
          destination: 'Mikie',
        }],
      }],
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

  it('Check submitTravellingSchedule method to call EditTravellingSchedule', async () => {
    api.EditTravellingSchedule.mockResolvedValue({
      code: 200,
      status: 'OK',
    });
    const setDefault = jest.spyOn(wrapper.vm, 'setDefault');

    wrapper.vm.submitTravellingSchedule();
    await flushPromises();

    expect(api.EditTravellingSchedule).toHaveBeenCalledTimes(1);
    expect(api.EditTravellingSchedule).toHaveBeenCalledWith(
      expectedData.edit.schedule[0].sku,
      expectedData.edit,
    );

    expect(setDefault).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData.link);
  });

  it('Check submitTravellingSchedule method to call EditTravellingSchedule - error', async () => {
    api.EditTravellingSchedule.mockRejectedValue({
      error: 'Bad Request',
    });
    const setDefault = jest.spyOn(wrapper.vm, 'setDefault');

    wrapper.vm.submitTravellingSchedule();
    await flushPromises();

    expect(api.EditTravellingSchedule).toHaveBeenCalledTimes(1);
    expect(api.EditTravellingSchedule).toHaveBeenCalledWith(
      expectedData.schedule[0].sku,
      expectedData.edit,
    );

    expect(setDefault).not.toHaveBeenCalled();
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
  });
});
