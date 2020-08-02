import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
// eslint-disable-next-line no-unused-vars
import api from '@/api/api';
import GalleryDetail from '@/views/Admin/GalleryDetail.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  imageUrl: jest.fn().mockImplementation(() => 'http://localhost:8800/image/img.png'),
}));

const $route = {
  params: {
    sku: 'PHOT_0001',
  },
};
const $router = {
  push: jest.fn(),
};

describe('GalleryDetail.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    galleryPhoto: {
      image: '/img.png',
      title: 'Photo 1',
      sku: 'PHOT_0001',
    },
    routerPush: '/admin/gallery',
  };
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      galleryPhoto: () => ({
        image: '/img.png',
        title: 'Photo 1',
        sku: 'PHOT_0001',
      }),
    };
    actions = {
      getGalleryPhoto: jest.fn(),
      removeGalleryPhoto: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(GalleryDetail, {
      mocks: {
        $route,
        $router,
      },
      store,
      localVue,
      stubs: ['b-button', 'b-modal'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check getGalleryPhoto actions to be called when created', () => {
    expect(actions.getGalleryPhoto).toHaveBeenCalledTimes(1);
  });

  it('Check imageUrl computed to return url of image', () => {
    expect(wrapper.vm.imageUrl).toBe(expectedData.imageUrl);
  });

  it('Check deleteGalleryPhoto method to call actions and $router', () => {
    wrapper.vm.deleteGalleryPhoto();

    expect(actions.removeGalleryPhoto).toHaveBeenCalledTimes(1);
    expect(actions.removeGalleryPhoto.mock.calls[0][1]).toMatch(expectedData.galleryPhoto.sku);

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData.routerPush);
  });

  it('Check confirmModal method to call bvModal and call method', async () => {
    const deleteGalleryPhoto = jest.spyOn(wrapper.vm, 'deleteGalleryPhoto');
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm')
      .mockResolvedValue(true);

    wrapper.vm.confirmModal();
    await flushPromises();

    expect(bvModal).toHaveBeenCalledTimes(1);
    expect(deleteGalleryPhoto).toHaveBeenCalledTimes(1);
  });

  it('Check confirmModal method to call bvModal and not call method', async () => {
    const deleteGalleryPhoto = jest.spyOn(wrapper.vm, 'deleteGalleryPhoto');
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm')
      .mockResolvedValue(false);

    wrapper.vm.confirmModal();
    await flushPromises();

    expect(bvModal).toHaveBeenCalledTimes(1);
    expect(deleteGalleryPhoto).not.toHaveBeenCalled();
  });

  it('Check confirmModal method to call bvModal and not call method - error', async () => {
    const deleteGalleryPhoto = jest.spyOn(wrapper.vm, 'deleteGalleryPhoto');
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm')
      .mockRejectedValue(new Error());

    wrapper.vm.confirmModal();
    await flushPromises();

    expect(bvModal).toHaveBeenCalledTimes(1);
    expect(deleteGalleryPhoto).not.toHaveBeenCalled();
  });
});
