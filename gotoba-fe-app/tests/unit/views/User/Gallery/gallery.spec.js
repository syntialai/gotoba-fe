import { createLocalVue, shallowMount } from '@vue/test-utils';
// eslint-disable-next-line no-unused-vars
import VueGallery from 'vue-gallery';
import Vuex from 'vuex';
import Gallery from '@/views/User/Gallery/Gallery.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('vue-gallery', () => ({
  VueGallery: jest.fn(),
}));

describe('Gallery.vue', () => {
  // eslint-disable-next-line no-unused-vars
  let actions;
  let getters;
  let store;
  // eslint-disable-next-line no-unused-vars
  let wrapper;

  beforeEach(() => {
    actions = {
      getGalleryData: jest.fn(),
    };
    getters = {
      galleryData: () => [
        { photo: 'img.png' },
        { photo: 'img.png' },
      ],
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(Gallery, {
      localVue,
      store,
      stubs: ['font-awesome-icon'],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(actions.getGalleryData).toHaveBeenCalledTimes(1);
  });
});
