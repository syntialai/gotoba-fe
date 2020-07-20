import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Alert from '@/components/Partial/Alert.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('Alert.vue (Success Alert Showed)', () => {
  let wrapper;
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      alertMessage: () => 'show alert',
      alertSuccess: () => true,
      showAlert: () => true,
    };
    store = new Vuex.Store({ getters });
    wrapper = mount(Alert, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Getters show alert when true', async () => {
    expect(wrapper.find('div[role="alert"]').exists()).toBeTruthy();
    expect(wrapper.contains('button')).toBeTruthy();
  });

  it('Getters alert type success when true', async () => {
    expect(wrapper.find('.alert-success').exists()).toBeTruthy();
  });

  it('Getters alert message showed', async () => {
    expect(wrapper.find('.message').text()).toEqual('Successfully show alert!');
  });
});

describe('Alert.vue (Danger Alert Showed)', () => {
  let wrapper;
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      alertMessage: () => 'show alert',
      alertSuccess: () => false,
      showAlert: () => true,
    };
    store = new Vuex.Store({ getters });
    wrapper = mount(Alert, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Getters show alert when true', async () => {
    expect(wrapper.find('div[role="alert"]').exists()).toBeTruthy();
    expect(wrapper.contains('button')).toBeTruthy();
  });

  it('Getters alert type danger when false', async () => {
    expect(wrapper.find('.alert-danger').exists()).toBeTruthy();
  });

  it('Getters alert message showed', async () => {
    expect(wrapper.find('.message').text()).toEqual('Failed to show alert!');
  });
});

describe('Alert.vue (Not Showed)', () => {
  let wrapper;
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      showAlert: () => false,
    };
    store = new Vuex.Store({ getters });
    wrapper = mount(Alert, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Getters not show alert when false', async () => {
    expect(wrapper.find('div[role="alert"]').exists()).toBeFalsy();
    expect(wrapper.contains('button')).toBeFalsy();
  });
});
