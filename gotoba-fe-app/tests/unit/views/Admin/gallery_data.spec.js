import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import GalleryData from '@/views/Admin/GalleryData.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('GalleryData.vue', () => {
  const expectedData = {
    dataStart: 1,
    dataEnd: {
      if: 2,
      else: 3,
    },
  };
  const data = {
    currentPage: 1,
    perPage: 5,
  };
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      galleryData: () => ([
        {
          image: '',
          title: 'Photo 1',
          sku: 'PHOT_0001',
        },
        {
          image: '',
          title: 'Photo 1',
          sku: 'PHOT_0001',
        },
        {
          image: '',
          title: 'Photo 1',
          sku: 'PHOT_0001',
        },
      ]),
    };
    actions = {
      getGalleryData: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(GalleryData, {
      data() {
        return data;
      },
      store,
      localVue,
      stubs: ['b-button', 'b-modal'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('Check getGalleryData actions to be called when created', () => {
    expect(actions.getGalleryData).toHaveBeenCalled();
  });

  it('Check dataStart computed to return begin data', () => {
    expect(wrapper.vm.dataStart).toBe(expectedData.dataStart);
  });

  it('Check dataEnd computed to return end data when galleryData length is more than counted end data', () => {
    wrapper.setData({ perPage: 2 });
    expect(wrapper.vm.dataEnd).toBe(expectedData.dataEnd.if);
  });

  it('Check dataEnd computed to return end data when galleryData length is less than counted end data', () => {
    wrapper.setData({ perPage: 5 });
    expect(wrapper.vm.dataEnd).toBe(expectedData.dataEnd.else);
  });
});
