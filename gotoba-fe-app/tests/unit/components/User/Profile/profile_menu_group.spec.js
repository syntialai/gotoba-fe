import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import ProfileMenuGroup from '@/components/User/Profile/ProfileMenuGroup.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $router = {
  push: jest.fn(),
};

describe('ProfileMenuGroup.vue', () => {
  const props = {
    logOut: true,
  };
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      setLogOut: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
    wrapper = shallowMount(ProfileMenuGroup, {
      propsData: {
        ...props,
      },
      mocks: {
        $router,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check logout method to call actions and $router', () => {
    wrapper.vm.logout();

    expect(actions.setLogOut).toHaveBeenCalledTimes(1);

    expect($router.push).toHaveBeenCalledTimes(1);
    expect($router.push).toHaveBeenCalledWith('/login');
  });
});
