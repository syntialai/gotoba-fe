/* eslint-disable no-unused-vars */
import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Vuex from 'vuex';
import api from '@/api/api';
import AddDestination from '@/views/User/Itinerary/AddDestination.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  ReverseGeocoding: jest.fn(),
}));
jest.mock('leaflet/dist/images/marker-icon.png', () => ({
  icon: jest.fn(),
}));
jest.mock('leaflet/dist/images/marker-icon-2x.png', () => ({
  iconRetina: jest.fn(),
}));
jest.mock('leaflet/dist/images/marker-shadow.png', () => ({
  iconShadow: jest.fn(),
}));
jest.mock('leaflet/dist/leaflet.css', () => jest.fn());

const $router = {
  replace: jest.fn(),
};

describe('AddDestination.vue', () => {
  const expectedData = {
    link: '/itinerary/add',
  };

  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      locationData: () => [],
    };
    actions = {
      getLocationData: jest.fn(),
      setLocationKeyword: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(AddDestination, {
      data() {
        return {
          zoom: 9,
          center: [2.6, 98.7],
          bounds: null,
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          latLong: [2.6, 98.7],
          locationSelected: null,
          location: {
            name: '',
            address: '',
          },
        };
      },
      mocks: {
        $router,
      },
      localVue,
      store,
      stubs: [
        'font-awesome-icon',
        'font-awesome-layers',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check actions called when created', () => {
    expect(actions.getLocationData).toHaveBeenCalledTimes(1);
  });

  it('Check setLocation to call api and success change data', async () => {
    api.ReverseGeocoding.mockResolvedValue({
      display_name: 'Medan',
      address: {
        town: 'Medan City',
        state: 'Sumatra',
      },
    });
    wrapper.vm.setLocation({
      latlng: {
        lat: 2.6,
        lng: 99.8,
      },
    });
    await flushPromises();

    expect(wrapper.vm.$data.location.address).toMatch('Medan');
    expect(wrapper.vm.$data.location.name).toMatch('Medan City, Sumatra');
  });

  it('Check setLocation to call api and not change data', async () => {
    api.ReverseGeocoding.mockRejectedValue(new Error());
    wrapper.vm.setLocation({
      latlng: {
        lat: 2.6,
        lng: 99.8,
      },
    });
    await flushPromises();

    expect(wrapper.vm.$data.location.address).toMatch('');
    expect(wrapper.vm.$data.location.name).toMatch('');
  });

  it('Check setSavedLocation method to change location data when called', async () => {
    wrapper.vm.setSavedLocation({
      name: 'Medan',
      address: 'North Sumatra',
    });
    await flushPromises();

    expect(wrapper.vm.$data.location).toStrictEqual({
      name: 'Medan',
      address: 'North Sumatra',
    });
  });

  it('Check setDestinationLocation method to call actions and $router', async () => {
    wrapper.vm.setSavedLocation({
      name: 'Medan',
      address: 'North Sumatra',
    });
    await flushPromises();

    wrapper.vm.setDestinationLocation();
    await flushPromises();

    expect(actions.setLocationKeyword).toHaveBeenCalledTimes(1);
    expect(actions.setLocationKeyword.mock.calls[0][1]).toMatch('Medan: North Sumatra');

    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.replace).toHaveBeenCalledWith(expectedData.link);
  });

  it('Check zoomUpdated method to change zoom data when called', async () => {
    wrapper.vm.zoomUpdated(13);
    await flushPromises();

    expect(wrapper.vm.$data.zoom).toBe(13);
  });

  it('Check centerUpdated method to change center data when called', async () => {
    wrapper.vm.centerUpdated([2.6, 99.8]);
    await flushPromises();

    expect(wrapper.vm.$data.center).toStrictEqual([2.6, 99.8]);
  });

  it('Check boundsUpdated method to change bounds data when called', async () => {
    wrapper.vm.boundsUpdated(13);
    await flushPromises();

    expect(wrapper.vm.$data.bounds).toBe(13);
  });
});
