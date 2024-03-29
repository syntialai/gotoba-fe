import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import TourGuideModal from '@/components/Admin/Modal/TourGuideModal.vue';
import api from '@/api/api';
import { setAlert } from '@/utils/tool';
import previewImage from '@/utils/fileHelper';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  PostTourGuide: jest.fn(),
  EditTourGuide: jest.fn(),
  GetSearchLocationResult: jest.fn(),
  imageUrl: jest.fn()
    .mockImplementation(() => 'http://localhost:8800/image/img.png'),
}));
jest.mock('@/utils/tool');
jest.mock('@/utils/fileHelper', () => jest.fn());

const $route = {
  params: {
    sku: 'TOUR_0001_0001',
  },
};

describe('TourGuideModal.vue', () => {
  const event = {
    target: { files: ['image.png'] },
  };
  const expectedData = {
    tourGuideData: {
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
    data: {
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
    image: 'image.png',
  };
  const data = {
    tourGuide: {
      name: '',
      image: null,
      age: 0,
      rating: 1,
      occupation: '',
      location: '',
      language: [],
      availableLocation: [],
      phone: '',
      email: '',
      whatsapp: '',
      experience: '',
      description: '',
    },
    data: {
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
    tourGuideChanged: {
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: 'http://localhost:8800/image/image/image.png',
    },
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.PostTourGuide.mockResolvedValue({
      code: 201,
      status: 'Created',
    });
    api.EditTourGuide.mockResolvedValue({
      code: 200,
      status: 'OK',
    });
    previewImage.mockResolvedValue('image.png');

    getters = {
      tourGuideData: () => ({
        ...data.data,
      }),
    };
    actions = {
      setTourGuideBySku: jest.fn(),
      getTourGuideBySku: jest.fn(),
      getTourGuideData: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(TourGuideModal, {
      mocks: {
        $route,
      },
      data() {
        return {
          tourGuide: data.tourGuide,
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

  it('Check setTourGuideBySku action called if title props is not defined', () => {
    expect(actions.setTourGuideBySku).toHaveBeenCalled();
    expect(actions.setTourGuideBySku.mock.calls[0][1]).toStrictEqual({});
  });

  it('Check tourGuideData computed getters return expected data', () => {
    expect(wrapper.vm.tourGuideData).toStrictEqual(expectedData.tourGuideData);
  });

  it('Check submitTourGuide method to call api PostTourGuide', async () => {
    wrapper.setData({
      tourGuide: data.data,
    });
    wrapper.vm.submitTourGuide();
    await flushPromises();

    expect(api.PostTourGuide).toHaveBeenCalledTimes(1);
    expect(api.PostTourGuide).toHaveBeenCalledWith(expectedData.data);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('added tour guide', true);

    expect(actions.getTourGuideData).toHaveBeenCalledTimes(1);
  });

  it('Check loadImage method to success change image data', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);
    expect(wrapper.vm.tourGuide.image).toMatch(expectedData.image);
  });

  it('Check removePhoto method to remove tourGuideData image data', async () => {
    wrapper.setData({
      tourGuide: {
        image: 'image.png',
      },
    });
    wrapper.vm.removePhoto();
    await flushPromises();
    expect(wrapper.vm.tourGuide.image).toBeNull();
  });
});

describe('TourGuideModal.vue with title props', () => {
  const expectedData = {
    data: {
      sku: 'HANN_0001',
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
    imageUrl: 'http://localhost:8800/image/img.png',
  };
  const data = {
    tourGuide: {
      name: '',
      image: null,
      age: 0,
      rating: 1,
      occupation: '',
      location: '',
      language: [],
      availableLocation: [],
      phone: '',
      email: '',
      whatsapp: '',
      experience: '',
      description: '',
    },
    tourGuide2: {
      sku: 'HANN_0001',
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
    tourGuideWatch: {
      sku: 'HANN_0001',
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: 'English,Indonesia',
      availableLocation: 'Parapat,Silangit',
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
    tourGuideChanged: {
      sku: 'HANN_0001',
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: 'http://localhost:8800/image/img.png',
    },
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.PostTourGuide.mockResolvedValue({
      code: 201,
      status: 'Created',
    });
    api.EditTourGuide.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    getters = {
      tourGuideData: () => ({
        ...data.data,
      }),
    };
    actions = {
      setTourGuideBySku: jest.fn(),
      getTourGuideBySku: jest.fn(),
    };
    store = new Vuex.Store({ actions, getters });
    wrapper = shallowMount(TourGuideModal, {
      propsData: {
        title: 'Edit',
      },
      mocks: {
        $route,
      },
      data() {
        return {
          tourGuide: data.tourGuide,
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

  it('Check getTourGuideBySku action called if title props is Edit', () => {
    expect(actions.getTourGuideBySku).toHaveBeenCalled();
    expect(actions.getTourGuideBySku.mock.calls[0][1]).toEqual($route.params.sku);
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check watcher to change tourGuide data when title is Edit', async () => {
    store.hotUpdate({
      getters: {
        tourGuideData: () => data.tourGuideWatch,
      },
    });
    await flushPromises();
    expect(wrapper.vm.title).toMatch('Edit');
    expect(wrapper.vm.$data.tourGuide).toStrictEqual(data.tourGuideChanged);
    expect(wrapper.vm.$data.tourGuide.image).toMatch(expectedData.imageUrl);
  });

  it('Check submitTourGuide method to call api EditTourGuide', async () => {
    wrapper.setData({
      tourGuide: data.tourGuide2,
    });
    wrapper.vm.submitTourGuide();
    await flushPromises();

    expect(api.EditTourGuide).toHaveBeenCalledTimes(1);
    expect(api.EditTourGuide).toHaveBeenCalledWith(
      $route.params.sku,
      expectedData.data,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('updated tour guide', true);
  });
});

describe('TourGuideModal.vue check function returned', () => {
  const event = {
    target: {},
  };
  const data = {
    tourGuide: {
      name: '',
      image: null,
      age: 0,
      rating: 1,
      occupation: '',
      location: '',
      language: [],
      availableLocation: [],
      phone: '',
      email: '',
      whatsapp: '',
      experience: '',
      description: '',
    },
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      tourGuideData: () => ({
        title: 'OK',
        image: null,
        description: 'Gallery mock',
      }),
    };
    actions = {
      setTourGuideBySku: jest.fn(),
      getTourGuideBySku: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(TourGuideModal, {
      mocks: {
        $route,
      },
      data() {
        return {
          tourGuide: data.tourGuide,
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

  it('Check submitTourGuide method to returned', async () => {
    wrapper.vm.submitTourGuide();
    await flushPromises();

    expect(api.PostTourGuide).not.toHaveBeenCalled();
    expect(api.EditTourGuide).not.toHaveBeenCalled();
  });

  it('Check loadImage method to returned', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).not.toHaveBeenCalled();
  });
});

describe('TourGuideModal.vue check error api promise', () => {
  const expectedData = {
    tourGuideData: {
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
    data: {
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
    image: 'image.png',
  };
  const data = {
    tourGuide: {
      name: '',
      image: null,
      age: 0,
      rating: 1,
      occupation: '',
      location: '',
      language: [],
      availableLocation: [],
      phone: '',
      email: '',
      whatsapp: '',
      experience: '',
      description: '',
    },
    tourGuide2: {
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.PostTourGuide.mockResolvedValue({
      status: 400,
      error: 'Bad Request',
    });
    api.EditTourGuide.mockResolvedValue({
      status: 401,
      error: 'Not Authorized',
    });

    getters = {
      tourGuideData: () => ({
        ...data.data,
      }),
    };
    actions = {
      setTourGuideBySku: jest.fn(),
      getTourGuideBySku: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(TourGuideModal, {
      mocks: {
        $route,
      },
      data() {
        return {
          ...data,
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

  it('Check submitTourGuide method to call api PostTourGuide and show error', async () => {
    wrapper.setData({
      tourGuide: expectedData.tourGuideData,
    });
    wrapper.vm.submitTourGuide();
    await flushPromises();

    expect(api.PostTourGuide).toHaveBeenCalledTimes(1);
    expect(api.PostTourGuide).toHaveBeenCalledWith(expectedData.tourGuideData);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('add tour guide', false);
  });

  it('Check submitTourGuide method to call api EditTourGuide and show error', async () => {
    wrapper.setProps({
      title: 'Edit',
    });
    wrapper.setData({
      tourGuide: data.tourGuide2,
    });
    await flushPromises();

    wrapper.vm.submitTourGuide();
    await flushPromises();

    expect(api.EditTourGuide).toHaveBeenCalledTimes(1);
    expect(api.EditTourGuide).toHaveBeenCalledWith(
      $route.params.sku,
      data.tourGuide2,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('update tour guide', false);
  });

  it('Check locationSuggestions method to called when tourGuide.location is exist',
    async () => {
      wrapper.setData({
        tourGuide: { ...expectedData.tourGuideData },
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
        expectedData.tourGuideData.location,
      );
      expect(wrapper.vm.$data.locationList).toStrictEqual(['Medan', 'Medan City']);
    });

  it('Check locationSuggestions method to called when tourGuideData.location is exist and catch error',
    async () => {
      wrapper.setData({
        tourGuide: { ...data.tourGuide2 },
      });
      api.GetSearchLocationResult.mockRejectedValue(new Error());

      wrapper.vm.locationSuggestions();
      await flushPromises();

      expect(api.GetSearchLocationResult).toHaveBeenCalledTimes(1);
      expect(api.GetSearchLocationResult).toHaveBeenCalledWith(
        data.tourGuide2.location,
      );
      expect(wrapper.vm.$data.locationList).toBe(null);
    });

  it('Check locationSuggestions method to called when tourGuideData.location is not exist and catch error',
    async () => {
      wrapper.setData({
        tourGuide: {
          location: null,
        },
      });
      api.GetSearchLocationResult.mockRejectedValue(new Error());

      wrapper.vm.locationSuggestions();
      await flushPromises();

      expect(api.GetSearchLocationResult).not.toHaveBeenCalled();
    });
});

describe('TourGuideModal.vue check catch error while making a request', () => {
  const event = {
    target: { files: ['image.png'] },
  };
  const expectedData = {
    tourGuideData: {
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: 'http://localhost:8800/image/image/image.png',
    },
    data: {
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
    image: 'image.png',
  };
  const data = {
    tourGuide: {
      name: '',
      image: null,
      age: 0,
      rating: 1,
      occupation: '',
      location: '',
      language: [],
      availableLocation: [],
      phone: '',
      email: '',
      whatsapp: '',
      experience: '',
      description: '',
    },
    tourGuide2: {
      name: 'Hannah Marcella',
      age: 20,
      occupation: 'Tour Guide',
      location: 'City of Medan, North Sumatra, Indonesia',
      rating: 4.9,
      language: ['English', 'Indonesia'],
      availableLocation: ['Parapat', 'Silangit'],
      phone: '081333336666',
      email: 'hannah.marcella@gmail.com',
      whatsapp: '081333336666',
      experience: '1 year experienced in tour guiding',
      description: 'I\'m a young tour guide that experienced',
      gender: 'female',
      image: '/img.png',
    },
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.PostTourGuide.mockRejectedValue(new Error());
    api.EditTourGuide.mockRejectedValue(new Error());
    previewImage.mockRejectedValue(new Error());

    getters = {
      tourGuideData: () => ({
        ...data.data,
      }),
    };
    actions = {
      setTourGuideBySku: jest.fn(),
      getTourGuideBySku: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(TourGuideModal, {
      mocks: {
        $route,
      },
      data() {
        return {
          ...data,
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

  it('Check submitTourGuide method to call api PostTourGuide and show error', async () => {
    wrapper.setData({
      tourGuide: expectedData.tourGuideData,
    });
    wrapper.vm.submitTourGuide();
    await flushPromises();

    expect(api.PostTourGuide).toHaveBeenCalledTimes(1);
    expect(api.PostTourGuide).toHaveBeenCalledWith(expectedData.tourGuideData);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('add tour guide', false);
  });

  it('Check submitTourGuide method to call api EditTourGuide and show error', async () => {
    wrapper.setData({
      tourGuide: data.tourGuide2,
    });
    wrapper.setProps({
      title: 'Edit',
    });
    wrapper.vm.submitTourGuide();
    await flushPromises();

    expect(api.EditTourGuide).toHaveBeenCalledTimes(1);
    expect(api.EditTourGuide).toHaveBeenCalledWith($route.params.sku, expectedData.data);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('update tour guide', false);
  });

  it('Check loadImage method to fail change image data and show alert', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('to show tour guide', false);
  });
});
