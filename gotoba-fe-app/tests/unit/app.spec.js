import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  path: '/',
  name: 'Home',
  meta: {
    layout: 'background-blue',
  },
};

describe('App.vue', () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      showAlert: () => false,
      showToast: () => false,
    };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(App, {
      mocks: {
        $route,
      },
      localVue,
      store,
      stubs: ['router-view'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check layout computed to return route component name if meta.layout is defined', () => {
    expect(wrapper.vm.layout).toMatch($route.meta.layout);
  });
});
