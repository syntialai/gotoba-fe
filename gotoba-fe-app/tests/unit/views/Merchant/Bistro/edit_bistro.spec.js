import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import api from '@/api/api';
import previewImage from '@/utils/fileHelper';
import { setAlert } from '@/utils/tool';
// eslint-disable-next-line no-unused-vars
import getLocation from '@/utils/location';
import EditBistro from '@/views/Merchant/Bistro/EditBistro.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  PostRestaurant: jest.fn(),
  EditRestaurant: jest.fn(),
  ReverseGeocoding: jest.fn(),
  imageUrl: jest.fn().mockImplementation(() => 'http://localhost:8800/image/img.png'),
}));
jest.mock('@/utils/tool');
jest.mock('@/utils/fileHelper', () => jest.fn());
jest.mock('@/utils/location', () => jest.fn());

const $router = {
  push: jest.fn(),
};

describe('EditBistro.vue - POST', () => {
  const event = {
    target: { files: ['image.png'] },
  };
  const expectedData = {
    bistro: {
      name: 'Resto',
      image: 'http://localhost:8800/image/img.png',
      longitude: 2.5,
      latitude: 99.7,
      rating: 5,
      bistroType: 'All-day cafe',
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
      merchantSku: 'USER_0001',
    },
    bistro2: {
      name: 'Resto',
      image: 'http://localhost:8800/image/img.png',
      longitude: 2.5,
      latitude: 99.7,
      location: 'Jl. Demak No. 5E, Medan',
      rating: 5,
      bistroType: 'All-day cafe',
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
    bistro3: {
      name: 'Resto',
      image: '/img.png',
      longitude: 2.5,
      latitude: 99.7,
      location: 'Medan',
      rating: 5,
      bistroType: 'All-day cafe',
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
      merchantSku: 'USER_0001',
    },
    imageUrl: 'http://localhost:8800/image/img.png',
    image: 'image.png',
  };
  const data_getters = {
    restaurantData: [{
      name: 'Resto',
      image: '/img.png',
      longitude: 2.5,
      latitude: 99.7,
      rating: 5,
      bistroType: 'All-day cafe',
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
    }],
    bistroType: ['All-day cafe'],
    userSku: 'USER_0001',
    locationSet: {
      location: 'Medan',
      address: 'Medan Area',
      latitude: 2.5,
      longitude: 98.6,
    },
    open: '09:00 AM',
    close: '10:00 PM',
  };

  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    previewImage.mockResolvedValue('image.png');
    actions = {
      getRestaurantDataByMerchantSku: jest.fn(),
      getRestaurantBistroType: jest.fn(),
      setLocation: jest.fn(),
    };
    getters = {
      restaurantData: () => [],
      bistroType: () => ['All-day cafe'],
      userSku: () => 'USER_0001',
      locationSet: () => ({
        location: 'Medan',
        address: 'Medan Area',
        latitude: 2.5,
        longitude: 98.6,
      }),
    };
    store = new Vuex.Store({ actions, getters });
    wrapper = shallowMount(EditBistro, {
      data() {
        return {
          open: '',
          close: '',
          bistro: {
            name: '',
            image: null,
            location: '',
            longitude: 0,
            latitude: 0,
            rating: 0.0,
            bistroType: '',
            phone: '',
            address: '',
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
          image: null,
        };
      },
      mocks: {
        $router,
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
    expect(actions.getRestaurantDataByMerchantSku).toHaveBeenCalledTimes(1);
    expect(actions.getRestaurantDataByMerchantSku.mock.calls[0][1]).toMatch(data_getters.userSku);

    expect(actions.getRestaurantBistroType).toHaveBeenCalledTimes(1);

    expect(wrapper.vm.$data.bistro).toMatchObject(data_getters.locationSet);
  });

  it('Check watcher to change data', async () => {
    store.hotUpdate({
      getters: {
        restaurantData: () => data_getters.restaurantData,
      },
    });
    await flushPromises();

    expect(wrapper.vm.$data.bistro).toStrictEqual(expectedData.bistro2);
    expect(wrapper.vm.$data.bistro.image).toStrictEqual(expectedData.bistro2.image);
    expect(wrapper.vm.$data.bistro.location).toStrictEqual(expectedData.bistro2.address);
    expect(wrapper.vm.$data.open).toMatch(expectedData.bistro2.hoursOpen.monday[0]);
    expect(wrapper.vm.$data.close).toMatch(expectedData.bistro2.hoursOpen.monday[1]);
  });

  it('Check updateBistro method to call api PostRestaurant', async () => {
    api.PostRestaurant.mockResolvedValue({
      code: 201,
      status: 'Created',
    });

    wrapper.setData({
      bistro: data_getters.restaurantData[0],
      open: data_getters.open,
      close: data_getters.close,
    });
    wrapper.vm.updateBistro();
    await flushPromises();

    expect(api.PostRestaurant).toHaveBeenCalledTimes(1);
    expect(api.PostRestaurant).toHaveBeenCalledWith(
      data_getters.userSku,
      expectedData.bistro3,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('added your bistro', true);

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/merchant/bistro');
  });

  it('Check updateBistro method to call api PostRestaurant', async () => {
    api.PostRestaurant.mockRejectedValue(new Error());

    wrapper.setData({
      bistro: data_getters.restaurantData[0],
      open: data_getters.open,
      close: data_getters.close,
    });
    wrapper.vm.updateBistro();
    await flushPromises();

    expect(api.PostRestaurant).toHaveBeenCalledTimes(1);
    expect(api.PostRestaurant).toHaveBeenCalledWith(
      data_getters.userSku,
      expectedData.bistro3,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('add your bistro', false);

    expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
  });

  it('Check loadImage method to success change image data', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);
    expect(wrapper.vm.$data.bistro.image).toMatch(expectedData.image);
  });

  it('Check removePhoto method to remove galleryPhoto image data', async () => {
    wrapper.setData({
      bistro: {
        image: 'image.png',
      },
    });
    wrapper.vm.removePhoto();
    await flushPromises();
    expect(wrapper.vm.$data.bistro.image).toBeNull();
  });
});

describe('EditBistro.vue - EDIT', () => {
  const event = {
    target: { files: ['image.png'] },
  };
  const expectedData = {
    bistro: {
      name: 'Resto',
      image: 'http://localhost:8800/image/img.png',
      longitude: 2.5,
      latitude: 99.7,
      rating: 5,
      bistroType: 'All-day cafe',
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
      merchantSku: 'USER_0001',
    },
    bistro2: {
      name: 'Resto',
      image: 'http://localhost:8800/image/img.png',
      longitude: 2.5,
      latitude: 99.7,
      location: 'Jl. Demak No. 5E, Medan',
      rating: 5,
      bistroType: 'All-day cafe',
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
    bistro3: {
      sku: 'REST_0001',
      name: 'Resto',
      image: '/img.png',
      longitude: 2.5,
      latitude: 99.7,
      location: 'Medan',
      rating: 5,
      bistroType: 'All-day cafe',
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
      merchantSku: 'USER_0001',
    },
    imageUrl: 'http://localhost:8800/image/img.png',
    image: 'image.png',
  };
  const data_getters = {
    restaurantData: [{
      sku: 'REST_0001',
      name: 'Resto',
      image: '/img.png',
      longitude: 2.5,
      latitude: 99.7,
      rating: 5,
      bistroType: 'All-day cafe',
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
    }],
    bistroType: ['All-day cafe'],
    userSku: 'USER_0001',
    locationSet: {
      location: 'Medan',
      address: 'Medan Area',
      latitude: 2.5,
      longitude: 98.6,
    },
    open: '09:00 AM',
    close: '10:00 PM',
  };

  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    previewImage.mockRejectedValue(new Error());
    actions = {
      getRestaurantDataByMerchantSku: jest.fn(),
      getRestaurantBistroType: jest.fn(),
      setLocation: jest.fn(),
    };
    getters = {
      restaurantData: () => [{
        sku: 'REST_0001',
        name: 'Resto',
        image: '/img.png',
        longitude: 2.5,
        latitude: 99.7,
        rating: 5,
        bistroType: 'All-day cafe',
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
      }],
      bistroType: () => ['All-day cafe'],
      userSku: () => 'USER_0001',
      locationSet: () => ({
        location: 'Medan',
        address: 'Medan Area',
        latitude: 2.5,
        longitude: 98.6,
      }),
    };
    store = new Vuex.Store({ actions, getters });
    wrapper = shallowMount(EditBistro, {
      data() {
        return {
          open: '',
          close: '',
          bistro: {
            name: '',
            image: null,
            location: '',
            longitude: 0,
            latitude: 0,
            rating: 0.0,
            bistroType: '',
            phone: '',
            address: '',
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
          image: null,
        };
      },
      mocks: {
        $router,
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

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check updateBistro method to call api EditRestaurant', async () => {
    api.EditRestaurant.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    wrapper.setData({
      bistro: data_getters.restaurantData[0],
      open: data_getters.open,
      close: data_getters.close,
    });
    wrapper.vm.updateBistro();
    await flushPromises();

    expect(api.EditRestaurant).toHaveBeenCalledTimes(1);
    expect(api.EditRestaurant).toHaveBeenCalledWith(
      expectedData.bistro3.sku,
      expectedData.bistro3,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('updated your bistro', true);
  });

  it('Check updateBistro method to call api EditRestaurant - error', async () => {
    api.EditRestaurant.mockRejectedValue(new Error());

    wrapper.setData({
      bistro: data_getters.restaurantData[0],
      open: data_getters.open,
      close: data_getters.close,
    });
    wrapper.vm.updateBistro();
    await flushPromises();

    expect(api.EditRestaurant).toHaveBeenCalledTimes(1);
    expect(api.EditRestaurant).toHaveBeenCalledWith(
      expectedData.bistro3.sku,
      expectedData.bistro3,
    );

    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith('update your bistro', false);

    expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
  });

  it('Check loadImage method to fail change image data', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);
  });
});

describe('EditBistro.vue - Returned', () => {
  const event = {
    target: {},
  };
  const expectedData = {
    locationSet: {
      location: 'Medan Area, Medan',
      address: 'Medan',
      latitude: 2.5,
      longitude: 98.6,
    },
  };

  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      getRestaurantDataByMerchantSku: jest.fn(),
      getRestaurantBistroType: jest.fn(),
      setLocation: jest.fn(),
    };
    getters = {
      restaurantData: () => [],
      bistroType: () => ['All-day cafe'],
      userSku: () => 'USER_0001',
      locationSet: () => ({}),
    };
    store = new Vuex.Store({ actions, getters });
    wrapper = shallowMount(EditBistro, {
      data() {
        return {
          open: '',
          close: '',
          bistro: {
            name: '',
            image: null,
            location: '',
            longitude: 0,
            latitude: 0,
            rating: 0.0,
            bistroType: '',
            phone: '',
            address: '',
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
          image: null,
        };
      },
      mocks: {
        $router,
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

  it('Check updateBistro method to call api EditRestaurant', async () => {
    wrapper.vm.updateBistro();
    await flushPromises();

    expect(api.PostRestaurant).not.toHaveBeenCalled();
    expect(api.EditRestaurant).not.toHaveBeenCalled();

    expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
  });

  it('Check loadImage method to fail change image data', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).not.toHaveBeenCalled();
  });
});
