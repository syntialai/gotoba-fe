import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import GalleryCardGroup from '@/components/Admin/Data/GalleryCardGroup.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('GalleryCardGroup.vue', () => {
  const expectedData = {
    galleryRange: {
      start: [
        { sku: 'WIS_0001_0001', img: '/gallery/img.png' },
        { sku: 'WIS_0001_0002', img: '/gallery/img.png' },
        { sku: 'WIS_0001_0003', img: '/gallery/img.png' },
        { sku: 'WIS_0001_0004', img: '/gallery/img.png' },
        { sku: 'WIS_0001_0005', img: '/gallery/img.png' },
      ],
      end: [
        { sku: 'WIS_0001_0006', img: '/gallery/img.png' },
        { sku: 'WIS_0001_0007', img: '/gallery/img.png' },
      ],
    },
  };
  const props = {
    photos: [
      { sku: 'WIS_0001_0001', img: '/gallery/img.png' },
      { sku: 'WIS_0001_0002', img: '/gallery/img.png' },
      { sku: 'WIS_0001_0003', img: '/gallery/img.png' },
      { sku: 'WIS_0001_0004', img: '/gallery/img.png' },
      { sku: 'WIS_0001_0005', img: '/gallery/img.png' },
      { sku: 'WIS_0001_0006', img: '/gallery/img.png' },
      { sku: 'WIS_0001_0007', img: '/gallery/img.png' },
    ],
    start: 1,
    end: 5,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GalleryCardGroup, {
      propsData: { ...props },
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check galleryRange computed return sliced galleryRange props from start', () => {
    expect(wrapper.vm.galleryRange).toStrictEqual(expectedData.galleryRange.start);
  });

  it('Check galleryRange computed return sliced galleryRange props to end', () => {
    wrapper.setProps({
      start: 6,
      end: 7,
    });
    expect(wrapper.vm.galleryRange).toStrictEqual(expectedData.galleryRange.end);
  });
});
