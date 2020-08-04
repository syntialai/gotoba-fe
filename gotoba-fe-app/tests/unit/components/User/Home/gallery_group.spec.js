import { shallowMount } from '@vue/test-utils';
// eslint-disable-next-line no-unused-vars
import VueGallery from 'vue-gallery';
import GalleryGroup from '@/components/User/Home/GalleryGroup.vue';

jest.mock('vue-gallery', () => ({
  VueGallery: jest.fn(),
}));

describe('GalleryGroup.vue', () => {
  const expectedData = {
    images: [
      'http://localhost:8800/image/img.png',
      'http://localhost:8800/image/img.png',
    ],
    getHeight: [
      (768 - 32 - 8 * 4) / 5,
      (425 - 32 - 8 * 3) / 4,
      (320 - 32 - 8 * 2) / 3,
    ],
  };
  const data = {
    galleryData: [
      {
        sku: 'PHOT_0001', image: '/img.png',
      },
      {
        sku: 'PHOT_0002', image: '/img.png',
      },
    ],
  };
  const windowSpy = jest.spyOn(global, 'window', 'get')
    .mockImplementation(() => ({
      innerWidth: 768,
    }));
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GalleryGroup, {
      propsData: {
        ...data,
      },
      data() {
        return {
          index: null,
        };
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check images computed return mapped galleryData', () => {
    expect(wrapper.vm.images).toStrictEqual(expectedData.images);
  });

  it('Check getHeight computed return image width case #1', () => {
    windowSpy.mockImplementation(() => ({
      innerWidth: 425,
    }));

    expect(wrapper.vm.getHeight).toBe(expectedData.getHeight[0]);
  });

  it('Check getHeight computed return image width case #2', () => {
    windowSpy.mockImplementation(() => ({
      innerWidth: 320,
    }));

    expect(wrapper.vm.getHeight).toBe(expectedData.getHeight[1]);
  });

  it('Check getHeight computed return image width case default', () => {
    windowSpy.mockImplementation(() => ({
      innerWidth: 320,
    }));

    expect(wrapper.vm.getHeight).toBe(expectedData.getHeight[2]);
  });
});
