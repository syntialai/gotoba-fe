import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import api from '@/api/api';
import previewImage from '@/utils/fileHelper';
import { setAlert } from '@/utils/tool';
// eslint-disable-next-line no-unused-vars
import getLocation from '@/utils/location';
import EditSpot from '@/views/Merchant/Spot/EditSpot.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  EditItinerary: jest.fn(),
  ReverseGeocoding: jest.fn(),
  GetSearchLocationResult: jest.fn(),
  imageUrl: jest.fn().mockImplementation(() => 'http://localhost:8800/image/img.png'),
}));
jest.mock('@/utils/tool');
jest.mock('@/utils/fileHelper', () => jest.fn());
jest.mock('@/utils/location', () => jest.fn());

const $route = {
  params: {
    sku: 'JOUR_0001',
  },
};

describe('EditSpot.vue', () => {
  const expectedData = {
    spot: {
      sku: 'JOUR_0001',
      name: 'Resto',
      title: 'Resto',
      image: '/img.png',
      longitude: 2.5,
      latitude: 99.7,
      location: 'Medan',
      price: 100,
      rating: 5,
      createdBy: 'USER_0001',
      description: 'Resto is the best',
      phone: '081990333364',
      address: 'Jl. Demak No. 5E, Medan',
      hoursOpen: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
    },
    spot2: {
      sku: 'JOUR_0001',
      name: 'Resto',
      image: 'http://localhost:8800/image/img.png',
      longitude: 2.5,
      latitude: 99.7,
      location: 'Jl. Demak No. 5E, Medan',
      rating: 5,
      createdBy: 'USER_0001',
      description: 'Resto is the best',
      phone: '081990333364',
      address: 'Jl. Demak No. 5E, Medan',
      hoursOpen: {
        monday: ['09:00 AM', '10:00 PM'],
        tuesday: ['09:00 AM', '10:00 PM'],
        wednesday: ['09:00 AM', '10:00 PM'],
        thursday: ['09:00 AM', '10:00 PM'],
        friday: ['09:00 AM', '10:00 PM'],
        saturday: ['09:00 AM', '10:00 PM'],
        sunday: ['09:00 AM', '10:00 PM'],
      },
    },
    spot3: {
      sku: 'JOUR_0001',
      title: 'Resto',
      name: 'Resto',
      image: '/img.png',
      longitude: 2.5,
      latitude: 99.7,
      location: 'Medan',
      price: 100,
      rating: 5,
      createdBy: 'USER_0001',
      description: 'Resto is the best',
      phone: '081990333364',
      address: 'Jl. Demak No. 5E, Medan',
      hoursOpen: {
        monday: ['09:00 AM', '10:00 PM'],
        tuesday: ['09:00 AM', '10:00 PM'],
        wednesday: ['09:00 AM', '10:00 PM'],
        thursday: ['09:00 AM', '10:00 PM'],
        friday: ['09:00 AM', '10:00 PM'],
        saturday: ['09:00 AM', '10:00 PM'],
        sunday: ['09:00 AM', '10:00 PM'],
      },
    },
    locationList: [{}],
    imageUrl: 'http://localhost:8800/image/img.png',
    image: 'image.png',
  };
  const data_getters = {
    journeyDataBySku: {
      sku: 'JOUR_0001',
      name: 'Resto',
      image: '/img.png',
      longitude: 2.5,
      latitude: 99.7,
      rating: 5,
      phone: '081990333364',
      address: 'Jl. Demak No. 5E, Medan',
      createdBy: 'USER_0001',
      description: 'Resto is the best',
      hoursOpen: {
        monday: ['09:00 AM', '10:00 PM'],
        tuesday: ['09:00 AM', '10:00 PM'],
        wednesday: ['09:00 AM', '10:00 PM'],
        thursday: ['09:00 AM', '10:00 PM'],
        friday: ['09:00 AM', '10:00 PM'],
        saturday: ['09:00 AM', '10:00 PM'],
        sunday: ['09:00 AM', '10:00 PM'],
      },
    },
    userSku: 'USER_0001',
    open: '09:00 AM',
    close: '10:00 PM',
  };

  let actions;
  let getters;
  let store;
  let wrapper;
  let event;

  beforeEach(() => {
    actions = {
      getJourneyDataBySku: jest.fn(),
    };
    getters = {
      journeyDataBySku: () => data_getters.journeyDataBySku,
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({ actions, getters });
    wrapper = shallowMount(EditSpot, {
      data() {
        return {
          spot: {
            name: '',
            title: '',
            image: null,
            location: '',
            longitude: 0.0,
            latitude: 0.0,
            createdBy: '',
            price: '',
            address: '',
            description: '',
            hoursOpen: {
              monday: [],
              tuesday: [],
              wednesday: [],
              thursday: [],
              friday: [],
              saturday: [],
              sunday: [],
            },
          },
          locationList: null,
          open: null,
          close: null,
        };
      },
      mocks: {
        $route,
      },
      localVue,
      store,
      stubs: ['ValidationProvider', 'ValidationObserver'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check actions called when created', () => {
    expect(actions.getJourneyDataBySku).toHaveBeenCalledTimes(1);
    expect(actions.getJourneyDataBySku.mock.calls[0][1]).toMatch($route.params.sku);
  });

  it('Check watcher to change data', async () => {
    store.hotUpdate({
      getters: {
        journeyDataBySku: () => data_getters.journeyDataBySku,
        userSku: () => data_getters.userSku,
      },
    });
    await flushPromises();

    expect(wrapper.vm.$data.spot).toStrictEqual(expectedData.spot2);
    expect(wrapper.vm.$data.spot.image).toStrictEqual(expectedData.spot2.image);
    expect(wrapper.vm.$data.spot.location).toStrictEqual(expectedData.spot2.address);
    expect(wrapper.vm.$data.open).toMatch(expectedData.spot2.hoursOpen.monday[0]);
    expect(wrapper.vm.$data.close).toMatch(expectedData.spot2.hoursOpen.monday[1]);
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check updateSpot method to call api EditItinerary', async () => {
    api.EditItinerary.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    wrapper.setData({
      spot: expectedData.spot,
      open: '09:00 AM',
      close: '10:00 PM',
    });
    await flushPromises();

    wrapper.vm.updateSpot();
    await flushPromises();

    expect(api.EditItinerary).toHaveBeenCalledTimes(1);
    expect(api.EditItinerary).toHaveBeenCalledWith(
      expectedData.spot3.sku,
      expectedData.spot3,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('updated your spot', true);
  });

  it('Check updateSpot method to call api EditItinerary - error', async () => {
    api.EditItinerary.mockRejectedValue(new Error());

    wrapper.setData({
      spot: expectedData.spot,
      open: '09:00 AM',
      close: '10:00 PM',
    });
    await flushPromises();

    wrapper.vm.updateSpot();
    await flushPromises();

    expect(api.EditItinerary).toHaveBeenCalledTimes(1);
    expect(api.EditItinerary).toHaveBeenCalledWith(
      expectedData.spot3.sku,
      expectedData.spot3,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('update your spot', false);
  });

  it('Check loadImage method to success change image data', async () => {
    previewImage.mockResolvedValue('image.png');
    event = {
      target: { files: ['image.png'] },
    };
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);
    expect(wrapper.vm.$data.spot.image).toMatch(expectedData.image);
  });

  it('Check loadImage method not to change image data', async () => {
    previewImage.mockRejectedValue(new Error());
    event = {
      target: { files: ['image.png'] },
    };
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('to show photo', false);
  });

  it('Check loadImage method to fail change image data', async () => {
    event = {
      target: {},
    };
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).not.toHaveBeenCalled();
  });

  it('Check removePhoto method to remove spot image data', async () => {
    wrapper.setData({
      spot: {
        image: 'image.png',
      },
    });
    wrapper.vm.removePhoto();
    await flushPromises();
    expect(wrapper.vm.$data.spot.image).toBeNull();
  });

  it('Check locationSuggestions method to called when journeyDataBySku.location is exist',
    async () => {
      wrapper.setData({
        spot: { ...expectedData.spot2 },
        open: data_getters.open,
        close: data_getters.close,
      });
      api.GetSearchLocationResult.mockResolvedValue([{
        display_name: 'Medan',
      }, {
        display_name: 'Medan City',
      }]);

      wrapper.vm.locationSuggestions();
      await flushPromises();

      expect(api.GetSearchLocationResult).toHaveBeenCalledTimes(1);
      expect(api.GetSearchLocationResult).toHaveBeenCalledWith(
        expectedData.spot2.location,
      );
      expect(wrapper.vm.$data.locationList).toStrictEqual(['Medan', 'Medan City']);
    });

  it('Check locationSuggestions method to called when journeyDataBySku.location is exist and catch error',
    async () => {
      wrapper.setData({
        spot: { ...expectedData.spot2 },
        open: data_getters.open,
        close: data_getters.close,
      });
      api.GetSearchLocationResult.mockRejectedValue(new Error());

      wrapper.vm.locationSuggestions();
      await flushPromises();

      expect(api.GetSearchLocationResult).toHaveBeenCalledTimes(1);
      expect(api.GetSearchLocationResult).toHaveBeenCalledWith(
        expectedData.spot2.location,
      );
      expect(wrapper.vm.$data.locationList).toBe(null);
    });

  it('Check locationSuggestions method to called when journeyDataBySku.location is not exist and catch error',
    async () => {
      wrapper.setData({
        spot: {
          location: null,
        },
        open: data_getters.open,
        close: data_getters.close,
      });
      api.GetSearchLocationResult.mockRejectedValue(new Error());

      wrapper.vm.locationSuggestions();
      await flushPromises();

      expect(api.GetSearchLocationResult).not.toHaveBeenCalled();
    });

  it('Check getLocation and api.ReverseGeocoding to called when mounted', async () => {
    // getLocation.mockImplementation(() => ({
    //   position: {
    //     coords: {
    //       latitude: 2.5,
    //       longitude: 98.6,
    //     },
    //   },
    // }));
    api.ReverseGeocoding.mockResolvedValue({
      display_name: 'Medan',
      address: {
        suburb: 'Medan Area',
        city: 'Medan',
      },
    });
    await flushPromises();

    expect(api.ReverseGeocoding).toHaveBeenCalledTimes(1);
    expect(api.ReverseGeocoding).toHaveBeenCalledWith(98.6, 2.5);

    expect(actions.setLocation).toHaveBeenCalledTimes(1);
    expect(actions.setLocation.mock.calls[0][1]).toStrictEqual({
      ...expectedData.locationSet,
    });
  });

  it('Check getLocation and api.ReverseGeocoding to called when mounted - catch error', async () => {
    // getLocation.mockImplementation(() => ({
    //   position: {
    //     coords: {
    //       latitude: 2.5,
    //       longitude: 98.6,
    //     },
    //   },
    // }));
    api.ReverseGeocoding.mockRejectedValue(new Error());
    await flushPromises();

    expect(api.ReverseGeocoding).toHaveBeenCalledTimes(1);
    expect(api.ReverseGeocoding).toHaveBeenCalledWith(98.6, 2.5);

    expect(actions.setLocation).not.toHaveBeenCalled();
  });
});
