import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import NotFound from '@/views/Error/NotFound.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $route = {
  admin: '/admin',
  merchant: '/merchant',
  user: '/',
};

const $router = { push: jest.fn() };

describe('NotFound.vue', () => {
  let getters;
  let store;
  let wrapper;

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check home method navigate to Home when userRole is ROLE_USER', () => {
    getters = {
      userRole: () => 'ROLE_USER',
    };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(NotFound, {
      mocks: {
        $route,
        $router,
      },
      localVue,
      store,
    });

    wrapper.vm.home();

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.user);
  });

  it('Check home method navigate to Merchant when userRole is ROLE_MERCHANT', () => {
    getters = {
      userRole: () => 'ROLE_MERCHANT',
    };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(NotFound, {
      mocks: {
        $route,
        $router,
      },
      localVue,
      store,
    });

    wrapper.vm.home();

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.merchant);
  });

  it('Check home method navigate to Admin when userRole is ROLE_ADMIN', () => {
    getters = {
      userRole: () => 'ROLE_ADMIN',
    };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(NotFound, {
      mocks: {
        $route,
        $router,
      },
      localVue,
      store,
    });

    wrapper.vm.home();

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.admin);
  });
});
