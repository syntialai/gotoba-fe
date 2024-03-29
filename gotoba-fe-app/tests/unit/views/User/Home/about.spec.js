import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
// eslint-disable-next-line no-unused-vars
import VueAgile from 'vue-agile';
import About from '@/views/User/Home/About.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('vue-agile', () => ({
  VueAgile: jest.fn(),
}));

describe('About.vue', () => {
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
    wrapper = shallowMount(About, {
      localVue,
      store,
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
