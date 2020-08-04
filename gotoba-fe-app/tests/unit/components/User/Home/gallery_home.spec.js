import { shallowMount } from '@vue/test-utils';
// eslint-disable-next-line no-unused-vars
import VueAgile from 'vue-agile';
import GalleryHome from '@/components/User/Home/GalleryHome.vue';

jest.mock('vue-agile', () => ({
  VueAgile: jest.fn(),
}));

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

  beforeEach(() => {
    wrapper = shallowMount(GalleryHome, {
      propsData: {
        ...data,
      },
      data() {
        return {
          asNavForMain: [],
          asNavForThumbnails: [],
          optionsMain: {
            dots: false,
            fade: true,
            navButtons: false,
          },
          optionsThumbnails: {
            autoplay: true,
            centerMode: true,
            dots: false,
            navButtons: false,
            slidesToShow: 3,
            responsive: [
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 1000,
                settings: {
                  navButtons: false,
                },
              },
            ],
          },
        };
      },
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
