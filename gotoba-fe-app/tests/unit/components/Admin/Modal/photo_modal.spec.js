import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import PhotoModal from '@/components/Admin/Modal/PhotoModal.vue';
import api from '@/api/api';
import { alert } from '@/utils/tool';
import previewImage from '@/utils/fileHelper';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  PostGalleryPhoto: jest.fn(),
  EditGalleryPhoto: jest.fn(),
}));
jest.mock('@/utils/tool');
jest.mock('@/utils/fileHelper', () => {
  return jest.fn();
});

const $route = {
  params: {
    sku: 'PHOT_0001_0001',
  },
};

describe('PhotoModal.vue', () => {
  const event = {
    target: { files: ['image.png'] },
  };
  const expectedData = {
    galleryPhoto: {
      title: 'Image',
      image: '/image/image.png',
      description: 'Gallery mock',
    },
    data: {
      name: 'Image',
      title: 'Image',
      description: 'Gallery mock',
      image: '/image/image.png',
      show: true,
    },
    image: 'image.png',
  };
  const data = {
    photo: {
      title: '',
      image: null,
      description: '',
    },
    image: null,
  };
  const props = {
    title: 'Edit',
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.PostGalleryPhoto.mockResolvedValue({
      code: 201,
      status: 'Created',
    });
    api.EditGalleryPhoto.mockResolvedValue({
      code: 200,
      status: 'OK',
    });
    previewImage.mockResolvedValue('image.png');

    getters = {
      galleryPhoto: () => ({
        title: 'Image',
        image: '/image/image.png',
        description: 'Gallery mock',
      }),
    };
    actions = {
      setGalleryPhoto: jest.fn(),
      getGalleryPhoto: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(PhotoModal, {
      mocks: {
        $route,
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

  it('Check setGalleryPhoto action called if title props is not defined', () => {
    expect(actions.setGalleryPhoto).toHaveBeenCalled();
    expect(actions.setGalleryPhoto.mock.calls[0][1]).toStrictEqual({});
  });

  it('Check galleryPhoto computed getters return expected data', () => {
    expect(wrapper.vm.galleryPhoto).toStrictEqual(expectedData.galleryPhoto);
  });

  it('Check submitPhoto method to call api PostGalleryPhoto', async () => {
    wrapper.vm.submitPhoto();
    await flushPromises();

    expect(api.PostGalleryPhoto).toHaveBeenCalledTimes(1);
    expect(api.PostGalleryPhoto).toHaveBeenCalledWith(expectedData.data);
    
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('added photo', true);
  });

  it('Check loadImage method to success change image data', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);
    expect(wrapper.vm.galleryPhoto.image).toMatch(expectedData.image);
  });

  it('Check removePhoto method to remove galleryPhoto image data', async () => {
    wrapper.vm.removePhoto();
    await flushPromises();
    expect(wrapper.vm.galleryPhoto.image).toBeNull();
  });
});

describe('PhotoModal.vue with title props', () => {
  const expectedData = {
    data: {
      name: 'Image',
      title: 'Image',
      description: 'Gallery mock',
      image: '/image/image.png',
      show: true,
    },
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.PostGalleryPhoto.mockResolvedValue({
      code: 201,
      status: 'Created',
    });
    api.EditGalleryPhoto.mockResolvedValue({
      code: 200,
      status: 'OK',
    });

    getters = {
      galleryPhoto: () => ({
        title: 'Image',
        image: '/image/image.png',
        description: 'Gallery mock',
      }),
    };
    actions = {
      setGalleryPhoto: jest.fn(),
      getGalleryPhoto: jest.fn(),
    };
    store = new Vuex.Store({ actions, getters });
    wrapper = shallowMount(PhotoModal, {
      propsData: {
        title: 'Edit',
      },
      mocks: {
        $route,
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

  it('Check getGalleryPhoto action called if title props is Edit', () => {
    expect(actions.getGalleryPhoto).toHaveBeenCalled();
    expect(actions.getGalleryPhoto.mock.calls[0][1]).toEqual($route.params.sku);
  });

  it('Check submitPhoto method to call api EditGalleryPhoto', async () => {
    wrapper.vm.submitPhoto();
    await flushPromises();

    expect(api.EditGalleryPhoto).toHaveBeenCalledTimes(1);
    expect(api.EditGalleryPhoto).toHaveBeenCalledWith($route.params.sku, expectedData.data);
    
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('updated photo', true);
  });
});

describe('PhotoModal.vue check function returned', () => {
  const event = {
    target: {},
  };
  const expectedData = {
    data: {
      name: 'Image',
      title: 'Image',
      description: 'Gallery mock',
      image: '/image/image.png',
      show: true,
    },
    image: 'image.png',
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      galleryPhoto: () => ({
        title: 'OK',
        image: null,
        description: 'Gallery mock',
      }),
    };
    actions = {
      setGalleryPhoto: jest.fn(),
      getGalleryPhoto: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(PhotoModal, {
      mocks: {
        $route,
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

  it('Check submitPhoto method to returned', async () => {
    wrapper.vm.submitPhoto();
    await flushPromises();

    expect(api.PostGalleryPhoto).not.toHaveBeenCalled();
    expect(api.EditGalleryPhoto).not.toHaveBeenCalled();
  });

  it('Check loadImage method to returned', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).not.toHaveBeenCalled();
  });
});

describe('PhotoModal.vue check error api promise', () => {
  const event = {
    target: { files: ['image.png'] },
  };
  const expectedData = {
    galleryPhoto: {
      title: 'Image',
      image: '/image/image.png',
      description: 'Gallery mock',
    },
    data: {
      name: 'Image',
      title: 'Image',
      description: 'Gallery mock',
      image: '/image/image.png',
      show: true,
    },
    image: 'image.png',
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.PostGalleryPhoto.mockResolvedValue({
      status: 400,
      error: 'Bad Request',
    }),
    api.EditGalleryPhoto.mockResolvedValue({
      status: 401,
      error: 'Not Authorized',
    });

    getters = {
      galleryPhoto: () => ({
        title: 'Image',
        image: '/image/image.png',
        description: 'Gallery mock',
      }),
    };
    actions = {
      setGalleryPhoto: jest.fn(),
      getGalleryPhoto: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(PhotoModal, {
      mocks: {
        $route,
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

  it('Check submitPhoto method to call api PostGalleryPhoto and show error', async () => {
    wrapper.vm.submitPhoto();
    await flushPromises();

    expect(api.PostGalleryPhoto).toHaveBeenCalledTimes(1);
    expect(api.PostGalleryPhoto).toHaveBeenCalledWith(expectedData.data);
    
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('to add photo', false);
  });

  it('Check submitPhoto method to call api EditGalleryPhoto and show error', async () => {
    wrapper.setProps({
      title: 'Edit',
    });
    wrapper.vm.submitPhoto();
    await flushPromises();

    expect(api.EditGalleryPhoto).toHaveBeenCalledTimes(1);
    expect(api.EditGalleryPhoto).toHaveBeenCalledWith($route.params.sku, expectedData.data);
    
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('to update photo', false);
  });
});

describe('PhotoModal.vue check catch error while making a request', () => {
  const event = {
    target: { files: ['image.png'] },
  };
  const expectedData = {
    galleryPhoto: {
      title: 'Image',
      image: '/image/image.png',
      description: 'Gallery mock',
    },
    data: {
      name: 'Image',
      title: 'Image',
      description: 'Gallery mock',
      image: '/image/image.png',
      show: true,
    },
    image: 'image.png',
  };
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.PostGalleryPhoto.mockRejectedValue(new Error()),
    api.EditGalleryPhoto.mockRejectedValue(new Error());
    previewImage.mockRejectedValue(new Error());

    getters = {
      galleryPhoto: () => ({
        title: 'Image',
        image: '/image/image.png',
        description: 'Gallery mock',
      }),
    };
    actions = {
      setGalleryPhoto: jest.fn(),
      getGalleryPhoto: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(PhotoModal, {
      mocks: {
        $route,
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

  it('Check submitPhoto method to call api PostGalleryPhoto and show error', async () => {
    wrapper.vm.submitPhoto();
    await flushPromises();

    expect(api.PostGalleryPhoto).toHaveBeenCalledTimes(1);
    expect(api.PostGalleryPhoto).toHaveBeenCalledWith(expectedData.data);
    
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('to add photo', false);
  });

  it('Check submitPhoto method to call api EditGalleryPhoto and show error', async () => {
    wrapper.setProps({
      title: 'Edit',
    });
    wrapper.vm.submitPhoto();
    await flushPromises();

    expect(api.EditGalleryPhoto).toHaveBeenCalledTimes(1);
    expect(api.EditGalleryPhoto).toHaveBeenCalledWith($route.params.sku, expectedData.data);
    
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('to update photo', false);
  });

  it('Check loadImage method to fail change image data and show alert', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('to show photo', false);
  });
});
