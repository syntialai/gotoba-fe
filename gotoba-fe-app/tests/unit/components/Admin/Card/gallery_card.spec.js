import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import GalleryCard from '@/components/Admin/Card/GalleryCard.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('GalleryCard.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    goToAdminGallery: '/admin/gallery/PHOT_0001_0001',
  };
  const data = {
    image: '/img.png',
    sku: 'PHOT_0001_0001',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(GalleryCard, {
      propsData: { ...data },
      localVue,
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check imageUrl computed return image url from data image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check goToAdminGallery computed return link of admin gallery detail from props sku', () => {
    expect(wrapper.vm.goToAdminGallery).toMatch(expectedData.goToAdminGallery);
  });
});
