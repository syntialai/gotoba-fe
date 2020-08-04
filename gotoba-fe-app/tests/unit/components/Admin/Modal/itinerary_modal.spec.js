import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import ItineraryModal from '@/components/Admin/Modal/ItineraryModal.vue';
import api from '@/api/api';
import { setAlert } from '@/utils/tool';
import previewImage from '@/utils/fileHelper';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  PostItinerary: jest.fn(),
  EditItinerary: jest.fn(),
  GetSearchLocationResult: jest.fn(),
  imageUrl: jest.fn()
    .mockImplementation(() => 'http://localhost:8800/image/img.png'),
}));
jest.mock('@/utils/tool');
jest.mock('@/utils/fileHelper', () => jest.fn());

describe('ItineraryModal.vue - POST', () => {
  const event = {
    target: { files: ['image.png'] },
  };
  const expectedData = {
    userSku: 'USER_0001',
    itinerary: {
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
    data: {
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
    data2: {
      sku: 'JOUR_0001',
      name: 'Resto',
      image: '/img.png',
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
    locationList: [{}],
    imageUrl: 'http://localhost:8800/image/img.png',
    image: 'image.png',
    open: '09:00 AM',
    close: '10:00 PM',
  };
  const data = {
    itinerary: {
      name: '',
      title: '',
      image: null,
      location: '',
      longitude: 0,
      latitude: 0,
      price: 0,
      address: '',
      description: '',
      createdBy: '',
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
    data: {
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
    itineraryChanged2: {
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
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
    },
    itineraryChanged: {
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
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      journeyDataBySku: () => ({
        ...data.data,
      }),
      userSku: () => 'USER_0001',
    };
    actions = {
      setJourneyDataBySku: jest.fn(),
      getJourneyDataBySku: jest.fn(),
      getJourneyData: jest.fn(),
      getJourneyDataByMerchantSku: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(ItineraryModal, {
      data() {
        return {
          itinerary: data.itinerary,
          open: null,
          close: null,
          locationList: null,
        };
      },
      localVue,
      store,
      stubs: [
        'ValidationObserver',
        'ValidationProvider',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check setJourneyDataBySku action called if title props is not defined', () => {
    expect(actions.setJourneyDataBySku).toHaveBeenCalled();
    expect(actions.setJourneyDataBySku.mock.calls[0][1]).toStrictEqual({});
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check submitItinerary method to call api PostItinerary', async () => {
    api.PostItinerary.mockResolvedValue({
      code: 201,
      status: 'Created',
    });

    wrapper.setData({
      itinerary: data.itineraryChanged2,
      open: '09:00 AM',
      close: '10:00 PM',
    });
    wrapper.vm.submitItinerary();
    await flushPromises();

    expect(api.PostItinerary).toHaveBeenCalledTimes(1);
    expect(api.PostItinerary).toHaveBeenCalledWith(expectedData.data2);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('added itinerary', true);

    expect(actions.getJourneyData).toHaveBeenCalledTimes(1);
    expect(actions.getJourneyDataByMerchantSku).toHaveBeenCalledTimes(1);
    expect(actions.getJourneyDataByMerchantSku.mock.calls[0][1])
      .toMatch(expectedData.userSku);
  });

  it('Check submitItinerary method to call api PostItinerary - error promise', async () => {
    api.PostItinerary.mockResolvedValue({
      status: 401,
      error: 'Unauthorized',
    });

    wrapper.setData({
      itinerary: data.itineraryChanged2,
      open: '09:00 AM',
      close: '10:00 PM',
    });
    wrapper.vm.submitItinerary();
    await flushPromises();

    expect(api.PostItinerary).toHaveBeenCalledTimes(1);
    expect(api.PostItinerary).toHaveBeenCalledWith(expectedData.data2);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('add itinerary', false);
  });

  it('Check submitItinerary method to call api PostItinerary - error', async () => {
    api.PostItinerary.mockRejectedValue(new Error());

    wrapper.setData({
      itinerary: data.itineraryChanged2,
      open: '09:00 AM',
      close: '10:00 PM',
    });
    wrapper.vm.submitItinerary();
    await flushPromises();

    expect(api.PostItinerary).toHaveBeenCalledTimes(1);
    expect(api.PostItinerary).toHaveBeenCalledWith(expectedData.data2);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('add itinerary', false);
  });

  it('Check loadImage method to success change image data', async () => {
    previewImage.mockResolvedValue('image.png');
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);
    expect(wrapper.vm.itinerary.image).toMatch(expectedData.image);
  });

  it('Check loadImage method to fail change image data and show alert', async () => {
    previewImage.mockRejectedValue(new Error());
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);
  });

  it('Check removePhoto method to remove itinerary image data', async () => {
    wrapper.setData({
      itinerary: {
        image: 'image.png',
      },
    });
    wrapper.vm.removePhoto();
    await flushPromises();
    expect(wrapper.vm.itinerary.image).toBeNull();
  });

  it('Check locationSuggestions method to called when journeyDataBySku.location is exist',
    async () => {
      wrapper.setData({
        itinerary: { ...expectedData.itinerary },
        open: expectedData.open,
        close: expectedData.close,
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
        expectedData.itinerary.location,
      );
      expect(wrapper.vm.$data.locationList).toStrictEqual(['Medan', 'Medan City']);
    });

  it('Check locationSuggestions method to called when journeyDataBySku.location is exist and catch error',
    async () => {
      wrapper.setData({
        itinerary: { ...expectedData.itinerary },
        open: expectedData.open,
        close: expectedData.close,
      });
      api.GetSearchLocationResult.mockRejectedValue(new Error());

      wrapper.vm.locationSuggestions();
      await flushPromises();

      expect(api.GetSearchLocationResult).toHaveBeenCalledTimes(1);
      expect(api.GetSearchLocationResult).toHaveBeenCalledWith(
        expectedData.itinerary.location,
      );
      expect(wrapper.vm.$data.locationList).toBe(null);
    });

  it('Check locationSuggestions method to called when journeyDataBySku.location is not exist and catch error',
    async () => {
      wrapper.setData({
        itinerary: {
          location: '',
        },
        open: expectedData.open,
        close: expectedData.close,
      });
      api.GetSearchLocationResult.mockRejectedValue(new Error());

      wrapper.vm.locationSuggestions();
      await flushPromises();

      expect(api.GetSearchLocationResult).not.toHaveBeenCalled();
    });
});

describe('ItineraryModal.vue - EDIT', () => {
  const expectedData = {
    userSku: 'USER_0001',
    itinerary: {
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
    data: {
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
    data2: {
      sku: 'JOUR_0001',
      name: 'Resto',
      image: '/img.png',
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
    locationList: [{}],
    imageUrl: 'http://localhost:8800/image/img.png',
    image: 'image.png',
    open: '09:00 AM',
    close: '10:00 PM',
  };
  const data = {
    itinerary: {
      name: '',
      title: '',
      image: null,
      location: '',
      longitude: 0,
      latitude: 0,
      price: 0,
      address: '',
      description: '',
      createdBy: '',
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
    data: {
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
    itineraryChanged2: {
      sku: 'JOUR_0001',
      name: 'Resto',
      image: '/img.png',
      longitude: 2.5,
      latitude: 99.7,
      rating: 5,
      phone: '081990333364',
      location: 'Jl. Demak No. 5E, Medan',
      address: 'Jl. Demak No. 5E, Medan',
      createdBy: 'USER_0001',
      description: 'Resto is the best',
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
    itineraryChanged: {
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
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      journeyDataBySku: () => ({
        ...data.data,
      }),
      userSku: () => 'USER_0001',
    };
    actions = {
      setJourneyDataBySku: jest.fn(),
      getJourneyDataBySku: jest.fn(),
      getJourneyData: jest.fn(),
      getJourneyDataByMerchantSku: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(ItineraryModal, {
      propsData: {
        title: 'Edit',
      },
      data() {
        return {
          itinerary: data.itinerary,
          open: null,
          close: null,
          locationList: null,
        };
      },
      localVue,
      store,
      stubs: [
        'ValidationObserver',
        'ValidationProvider',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check watcher to change itinerary data when title is Edit', () => {
    const itinerary = { ...data.itineraryChanged2 };
    itinerary.image = expectedData.imageUrl;

    expect(wrapper.vm.title).toMatch('Edit');
    expect(wrapper.vm.$data.itinerary).toStrictEqual(itinerary);
    expect(wrapper.vm.$data.itinerary.image).toMatch(expectedData.imageUrl);
  });

  it('Check submitItinerary method to call api EditItinerary', async () => {
    api.EditItinerary.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    wrapper.setData({
      itinerary: data.itineraryChanged2,
      open: '09:00 AM',
      close: '10:00 PM',
    });
    wrapper.vm.submitItinerary();
    await flushPromises();

    expect(api.EditItinerary).toHaveBeenCalledTimes(1);
    expect(api.EditItinerary).toHaveBeenCalledWith(
      expectedData.data2.sku,
      expectedData.data2,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('updated itinerary', true);
  });

  it('Check submitItinerary method to call api EditItinerary - error promise', async () => {
    api.EditItinerary.mockResolvedValue({
      status: 401,
      error: 'Unauthorized',
    });

    wrapper.setData({
      itinerary: data.itineraryChanged2,
      open: '09:00 AM',
      close: '10:00 PM',
    });
    wrapper.vm.submitItinerary();
    await flushPromises();

    expect(api.EditItinerary).toHaveBeenCalledTimes(1);
    expect(api.EditItinerary).toHaveBeenCalledWith(
      expectedData.data2.sku,
      expectedData.data2,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('update itinerary', false);
  });

  it('Check submitItinerary method to call api EditItinerary - error', async () => {
    api.EditItinerary.mockRejectedValue(new Error());

    wrapper.setData({
      itinerary: data.itineraryChanged2,
      open: '09:00 AM',
      close: '10:00 PM',
    });
    wrapper.vm.submitItinerary();
    await flushPromises();

    expect(api.EditItinerary).toHaveBeenCalledTimes(1);
    expect(api.EditItinerary).toHaveBeenCalledWith(
      expectedData.data2.sku,
      expectedData.data2,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('update itinerary', false);
  });
});

describe('ItineraryModal.vue check function returned', () => {
  const event = {
    target: {},
  };
  const data = {
    itinerary: {
      name: '',
      title: '',
      image: null,
      location: '',
      longitude: 0,
      latitude: 0,
      price: 0,
      address: '',
      description: '',
      createdBy: '',
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
    data: {
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
    itineraryChanged: {
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
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      journeyDataBySku: () => ({
        ...data.itinerary,
      }),
      userSku: () => 'USER_0001',
    };
    actions = {
      setJourneyDataBySku: jest.fn(),
      getJourneyDataBySku: jest.fn(),
      getJourneyData: jest.fn(),
      getJourneyDataByMerchantSku: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(ItineraryModal, {
      data() {
        return {
          itinerary: data.itinerary,
          open: null,
          close: null,
          locationList: null,
        };
      },
      localVue,
      store,
      stubs: [
        'ValidationObserver',
        'ValidationProvider',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check submitItinerary method to returned', async () => {
    wrapper.vm.submitItinerary();
    await flushPromises();

    expect(api.PostItinerary).not.toHaveBeenCalled();
    expect(api.EditItinerary).not.toHaveBeenCalled();
  });

  it('Check loadImage method to returned', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).not.toHaveBeenCalled();
  });
});
