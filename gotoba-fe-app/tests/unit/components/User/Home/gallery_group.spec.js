import { createLocalVue, shallowMount } from '@vue/test-utils';
import GalleryGroup from '@/components/User/Home/GalleryGroup.vue';

jest.mock('vue-gallery');

describe('GalleryGroup.vue', () => {
  const expectedData = {
    images: [
      'http://localhost:8800/image/img.png',
      'http://localhost:8800/image/img.png',
    ],
    getHeight: [
      (768 - 64) / 5,
      (425 - 56) / 4,
      (320 - 48) / 3,
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
  let wrapper;
  let windowSpy;

  beforeEach(() => {
    wrapper = shallowMount(GalleryGroup, {
      propsData: {
        ...data,
      },
      localVue,
      stubs: ['vue-gallery'],
    });
    windowSpy = jest.spyOn(global, 'window', 'get');
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check getHeight computed return image width case #1', () => {
    windowSpy.mockImplementation(() => ({
      innerWidth: 768,
    }));

    expect(wrapper.vm.getHeight).toMatch(expectedData.getHeight[0]);
  })

  it('Check getHeight computed return image width case #2', () => {
    windowSpy.mockImplementation(() => ({
      innerWidth: 425,
    }));

    expect(wrapper.vm.getHeight).toMatch(expectedData.getHeight[1]);
  })

  it('Check getHeight computed return image width case default', () => {
    windowSpy.mockImplementation(() => ({
      innerWidth: 320,
    }));

    expect(wrapper.vm.getHeight).toMatch(expectedData.getHeight[2]);
  });
});
