import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Login from '@/views/Auth/Login.vue';
import api from '@/api/api';
import { setAlert } from '@/utils/tool';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  Login: jest.fn(),
}));
jest.mock('@/utils/tool');

const $route = {
  admin: '/admin',
  merchant: '/merchant',
  user: '/',
};

describe('Login.vue success', () => {
  const expectedData = {
    data: {
      username: 'syntiaaa00',
      password: 'syntiaaa00',
    },
    userInfo: {
      user: {
        name: 'Syntia',
        sku: 'SYNT_0001',
        role: 'ROLE_USER',
        image: '/image/img.png',
      },
      admin: {
        name: 'Syntia',
        sku: 'SYNT_0001',
        role: 'ROLE_ADMIN',
        image: '/image/img.png',
      },
      merchant: {
        name: 'Syntia',
        sku: 'SYNT_0001',
        role: 'ROLE_MERCHANT',
        image: '/image/img.png',
      },
    },
  };
  const data = {
    username: 'syntiaaa00',
    password: 'syntiaaa00',
    showLoading: false,
  };
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      setUserInfo: jest.fn(),
    };
    store = new Vuex.Store({ actions });
    wrapper = shallowMount(Login, {
      mocks: {
        $route,
        $router: {
          push: jest.fn(),
        },
      },
      data() {
        return {
          ...data,
        };
      },
      localVue,
      store,
      stubs: [
        'ValidationObserver',
        'ValidationProvider',
        'router-link',
        'font-awesome-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check login method to call api Login success', async () => {
    api.Login.mockResolvedValue({
      name: 'Syntia',
      sku_user: 'SYNT_0001',
      role: 'ROLE_USER',
      image: '/image/img.png',
    });

    // const spyCheckRole = jest.spyOn(wrapper.vm, 'checkRole');
    wrapper.vm.login();
    expect(wrapper.vm.$data.showLoading).toBe(true);
    await flushPromises();

    expect(api.Login).toHaveBeenCalledTimes(1);
    expect(api.Login).toHaveBeenCalledWith(expectedData.data);

    expect(actions.setUserInfo).toHaveBeenCalledTimes(1);
    expect(actions.setUserInfo.mock.calls[0][1]).toStrictEqual(expectedData.userInfo.user);

    // expect(spyCheckRole).toHaveBeenCalledTimes(1);
    // expect(spyCheckRole).toHaveBeenCalledWith(expectedData.userInfo.user.role);

    expect(wrapper.vm.$data.showLoading).toBe(false);
  });

  it('Check checkRole method to navigate to User home', () => {
    wrapper.vm.checkRole('ROLE_USER');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.user);
  });

  it('Check checkRole method to navigate to Merchant home', () => {
    wrapper.vm.checkRole('ROLE_MERCHANT');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.merchant);
  });

  it('Check checkRole method to navigate to Admin home', () => {
    wrapper.vm.checkRole('ROLE_ADMIN');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.admin);
  });
});

describe('Login.vue error promise', () => {
  const expectedData = {
    data: {
      username: 'syntiaaa00',
      password: 'syntiaaa00',
    },
  };
  const data = {
    username: 'syntiaaa00',
    password: 'syntiaaa00',
    showLoading: false,
  };
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.Login.mockResolvedValue({
      status: 400,
      error: 'Bad Request',
    });

    actions = {
      setUserInfo: jest.fn(),
    };
    store = new Vuex.Store({ actions });
    wrapper = shallowMount(Login, {
      mocks: {
        $route,
        $router: {
          push: jest.fn(),
        },
      },
      data() {
        return {
          ...data,
        };
      },
      localVue,
      store,
      stubs: [
        'ValidationObserver',
        'ValidationProvider',
        'router-link',
        'font-awesome-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check login method to call api Login and show failed alert', async () => {
    const spyCheckRole = jest.spyOn(wrapper.vm, 'checkRole');
    wrapper.vm.login();
    expect(wrapper.vm.$data.showLoading).toBe(true);
    await flushPromises();

    expect(api.Login).toHaveBeenCalledTimes(1);
    expect(api.Login).toHaveBeenCalledWith(expectedData.data);

    expect(actions.setUserInfo).not.toHaveBeenCalled();
    expect(spyCheckRole).not.toHaveBeenCalled();

    expect(wrapper.vm.$data.showLoading).toBe(false);
    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith(
      'log in. Check your username/password',
      false
    );
  });
});

describe('Login.vue check function returned', () => {
  const data = {
    username: 'syn',
    password: '',
    showLoading: false,
  };
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      Login: jest.fn(),
    };
    store = new Vuex.Store({ actions });
    wrapper = shallowMount(Login, {
      mocks: {
        $route,
        $router: {
          push: jest.fn(),
        },
      },
      data() {
        return {
          ...data,
        };
      },
      localVue,
      store,
      stubs: [
        'ValidationObserver',
        'ValidationProvider',
        'router-link',
        'font-awesome-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check login method to returned', async () => {
    wrapper.vm.login();
    await flushPromises();

    expect(api.Login).not.toHaveBeenCalled();
  });
});

describe('Login.vue catch error', () => {
  const expectedData = {
    data: {
      username: 'syntiaaa00',
      password: 'syntiaaa00',
    },
  };
  const data = {
    username: 'syntiaaa00',
    password: 'syntiaaa00',
    showLoading: false,
  };
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.Login.mockRejectedValue(new Error());

    actions = {
      setUserInfo: jest.fn(),
    };
    store = new Vuex.Store({ actions });
    wrapper = shallowMount(Login, {
      mocks: {
        $route,
        $router: {
          push: jest.fn(),
        },
      },
      data() {
        return {
          ...data,
        };
      },
      localVue,
      store,
      stubs: [
        'ValidationObserver',
        'ValidationProvider',
        'router-link',
        'font-awesome-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check login method to call api Login and show failed alert', async () => {
    const spyCheckRole = jest.spyOn(wrapper.vm, 'checkRole');
    wrapper.vm.login();
    expect(wrapper.vm.$data.showLoading).toBe(true);
    await flushPromises();

    expect(api.Login).toHaveBeenCalledTimes(1);
    expect(api.Login).toHaveBeenCalledWith(expectedData.data);

    expect(actions.setUserInfo).not.toHaveBeenCalled();
    expect(spyCheckRole).not.toHaveBeenCalled();

    expect(wrapper.vm.$data.showLoading).toBe(false);
    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith(
      'log in. Please try again later',
      false
    );
  });
});
