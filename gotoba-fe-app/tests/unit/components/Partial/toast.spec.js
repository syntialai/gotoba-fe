import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Toast from '@/components/Partial/Toast.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('Toast.vue (Showed)', () => {
  let wrapper;
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      toastMessage: () => 'Toast showed!',
      showToast: () => true,
    };
    store = new Vuex.Store({ getters });
    wrapper = mount(Toast, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Getters show toast when true', async () => {
    expect(wrapper.find('.b-toast').exists()).toBeTruthy();
    expect(wrapper.find('.toast-body').exists()).toBeTruthy();
  });

  it('Getters toast message showed', async () => {
    expect(wrapper.find('.message').text()).toEqual('Toast showed!');
  });
});

describe('Toast.vue (Not Showed)', () => {
  let wrapper;
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      showToast: () => false,
    };
    store = new Vuex.Store({ getters });
    wrapper = mount(Toast, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Getters not show toast when false', async () => {
    expect(wrapper.find('.b-toast').exists()).toBeFalsy();
    expect(wrapper.find('.toast-body').exists()).toBeFalsy();
  });
});
