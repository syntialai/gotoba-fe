import { createLocalVue, shallowMount } from '@vue/test-utils';
import GalleryHome from '@/components/User/Home/GalleryHome.vue';

describe('GalleryHome.vue', () => {
  const expectedData = {
    slides: [
      'http://localhost:8800/image/img.png',
      'http://localhost:8800/image/img.png',
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
    wrapper = shallowMount(GalleryHome, {
      propsData: {
        ...data,
      },
      localVue,
      stubs: ['agile'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check slides computed return image url from data image', () => {
    expect(wrapper.vm.slides).toStrictEqual(expectedData.slides);
  });
});
