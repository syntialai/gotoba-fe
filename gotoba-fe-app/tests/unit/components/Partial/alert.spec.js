import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Alert from '@/components/Partial/Alert.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('Alert.vue', () => {
  const expectedData = {
    alertMessage: 'show alert',
    alertSuccess: true,
    showAlert: true,
  };

  let wrapper;
  let actions;
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      alertMessage: () => 'show alert',
      alertSuccess: () => true,
      showAlert: () => true,
    };
    actions = {
      setShowAlert: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(Alert, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check alertMessage getters from vuex', () => {
    expect(wrapper.vm.alertMessage).toMatch(expectedData.alertMessage);
  });

  it('Check alertSuccess getters from vuex', () => {
    expect(wrapper.vm.alertSuccess).toBe(expectedData.alertSuccess);
  });

  it('Check show computed getters to return showAlert value', () => {
    expect(wrapper.vm.show).toBe(expectedData.showAlert);
  });

  it('Check show computed setters to call setShowAlert actions', async () => {
    wrapper.vm.show = false;
    await flushPromises();

    expect(actions.setShowAlert).toHaveBeenCalledTimes(1);
    expect(actions.setShowAlert.mock.calls[0][1]).toBe(false);
  });
});
