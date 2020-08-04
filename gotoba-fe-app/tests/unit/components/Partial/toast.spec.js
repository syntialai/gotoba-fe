import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Toast from '@/components/Partial/Toast.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('Toast.vue', () => {
  const expectedData = {
    toastMessage: 'Toast showed!',
    showToast: true,
  };

  let wrapper;
  let actions;
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      toastMessage: () => 'Toast showed!',
      showToast: () => true,
    };
    actions = {
      setShowToast: jest.fn(),
    };
    store = new Vuex.Store({ getters, actions });
    wrapper = shallowMount(Toast, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check toastMessage getters from vuex', () => {
    expect(wrapper.vm.toastMessage).toMatch(expectedData.toastMessage);
  });

  it('Check show computed getters to return showToast getters value', () => {
    expect(wrapper.vm.show).toBe(expectedData.showToast);
  });

  it('Check show computed setters to call setShowToast actions', () => {
    wrapper.vm.show = false;

    expect(actions.setShowToast).toHaveBeenCalledTimes(1);
    expect(actions.setShowToast.mock.calls[0][1]).toBe(false);
  });
});
