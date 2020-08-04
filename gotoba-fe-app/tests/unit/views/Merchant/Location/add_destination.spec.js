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
import AddDestination from '@/views/Merchant/Location/AddDestination.vue';

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

const $route = {
  params: {
    category: 'spot',
  },
};

const $router = {
  replace: jest.fn(),
};

describe('AddDestination.vue', () => {
  const expectedData = {
    link: '/merchant/spot/edit',
  };

  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      locationData: () => [],
      locationSet: () => ({}),
    };
    actions = {
      getLocationData: jest.fn(),
      setLocation: jest.fn(),
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
          location: {
            location: '',
            address: '',
            latitude: 2.6,
            longitude: 98.7,
          },
        };
      },
      mocks: {
        $route,
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

  it('Check watcher to change location data when locationSet is changed', async () => {
    store.hotUpdate({
      getters: {
        locationSet: () => ({
          location: 'Medan',
          address: 'Medan',
          latitude: 2.6,
          longitude: 98.7,
        }),
      },
    });
    await flushPromises();

    expect(wrapper.vm.$data.location).toStrictEqual({
      location: 'Medan',
      address: 'Medan',
      latitude: 2.6,
      longitude: 98.7,
    });
  });

  it('Check setLocationClick to call api and success change data', async () => {
    api.ReverseGeocoding.mockResolvedValue({
      display_name: 'Medan',
      address: {
        city: 'Medan City',
      },
    });
    wrapper.vm.setLocationClick({
      latlng: {
        lat: 2.6,
        lng: 99.8,
      },
    });
    await flushPromises();

    expect(wrapper.vm.$data.location.address).toMatch('Medan');
    expect(wrapper.vm.$data.location.location).toMatch('Medan City');
  });

  it('Check setLocationClick to call api and not change data', async () => {
    api.ReverseGeocoding.mockRejectedValue(new Error());
    wrapper.vm.setLocationClick({
      latlng: {
        lat: 2.6,
        lng: 99.8,
      },
    });
    await flushPromises();

    expect(wrapper.vm.$data.location.address).toMatch('');
    expect(wrapper.vm.$data.location.location).toMatch('');
  });

  it('Check setDestinationLocation method to call actions and $router', async () => {
    wrapper.vm.setLocationClick({
      latlng: {
        lat: 2.6,
        lng: 99.8,
      },
    });
    await flushPromises();

    wrapper.vm.setDestinationLocation();
    await flushPromises();

    expect(actions.setLocation).toHaveBeenCalledTimes(1);
    expect(actions.setLocation.mock.calls[0][1]).toStrictEqual({
      location: '',
      address: '',
      latitude: 2.6,
      longitude: 99.8,
    });

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
