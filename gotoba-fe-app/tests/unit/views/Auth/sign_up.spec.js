import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import SignUp from '@/views/Auth/SignUp.vue';
import api from '@/api/api';
import { setAlert } from '@/utils/tool';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  Signup: jest.fn(),
  Login: jest.fn(),
}));
jest.mock('@/utils/tool');

const $route = {
  admin: '/admin',
  merchant: '/merchant',
  user: '/',
};

describe('SignUp.vue success', () => {
  const expectedData = {
    data: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      password: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      confirmPassword: 'syntiaaa00',
      role: 'ROLE_USER',
      image: '',
    },
    dataLogin: {
      username: 'syntiaaa00',
      password: 'syntiaaa00',
    },
    userInfo: {
      user: {
        name: 'Syntia',
        sku: 'SYNT_0001',
        role: 'ROLE_USER',
        image: '',
      },
      merchant: {
        name: 'Syntia',
        sku: 'SYNT_0001',
        role: 'ROLE_MERCHANT',
        image: '',
      },
    },
  };
  const data = {
    nickname: 'Syntia',
    username: 'syntiaaa00',
    password: 'syntiaaa00',
    email: 'syntiaaa00@gmail.com',
    confirmPassword: 'syntiaaa00',
    role: 'ROLE_USER',
    image: '',
    checked: 'true',
    showLoading: false,
  };
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.Signup.mockResolvedValue({
      code: 200,
      status: 'OK',
    });
    api.Login.mockResolvedValue({
      name: 'Syntia',
      sku_user: 'SYNT_0001',
      role: 'ROLE_USER',
      image: '',
    });

    actions = {
      setUserInfo: jest.fn(),
    };
    store = new Vuex.Store({ actions });
    wrapper = shallowMount(SignUp, {
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
        'b-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check signup method to call api Signup and Login success and go to User home', async () => {
    // const spyCheckRole = jest.spyOn(wrapper.vm.signup, 'checkRole');
    wrapper.vm.signup();
    expect(wrapper.vm.$data.showLoading).toBe(true);
    await flushPromises();

    expect(api.Signup).toHaveBeenCalledTimes(1);
    expect(api.Signup).toHaveBeenCalledWith(expectedData.data);

    expect(api.Login).toHaveBeenCalledTimes(1);
    expect(api.Login).toHaveBeenCalledWith(expectedData.dataLogin);

    expect(actions.setUserInfo).toHaveBeenCalledTimes(1);
    expect(actions.setUserInfo.mock.calls[0][1]).toStrictEqual(expectedData.userInfo.user);
    // expect(spyCheckRole).toHaveBeenCalledTimes(1);

    expect(wrapper.vm.$data.showLoading).toBe(false);
  });

  it('Check checkRole method to navigate to user home', async () => {
    wrapper.vm.checkRole();
    await flushPromises();

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.user);
  });

  it('Check checkRole method to navigate to merchant home', async () => {
    wrapper.setData({
      role: 'ROLE_MERCHANT',
    });
    wrapper.vm.checkRole();
    await flushPromises();

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route.merchant);
  });
});

describe('SignUp.vue error promise', () => {
  const expectedData = {
    data: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      password: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      confirmPassword: 'syntiaaa00',
      role: 'ROLE_USER',
      image: '',
    },
    dataLogin: {
      username: 'syntiaaa00',
      password: 'syntiaaa00',
    },
  };
  const data = {
    nickname: 'Syntia',
    username: 'syntiaaa00',
    password: 'syntiaaa00',
    email: 'syntiaaa00@gmail.com',
    confirmPassword: 'syntiaaa00',
    role: 'ROLE_USER',
    checked: 'true',
    image: '',
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
    wrapper = shallowMount(SignUp, {
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
        'b-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check signup method to call api Signup and show failed alert', async () => {
    api.Signup.mockResolvedValue({
      status: 400,
      error: 'Bad Request',
    });

    wrapper.vm.signup();
    expect(wrapper.vm.$data.showLoading).toBe(true);
    await flushPromises();

    expect(api.Signup).toHaveBeenCalledTimes(1);
    expect(api.Signup).toHaveBeenCalledWith(expectedData.data);

    expect(actions.setUserInfo).not.toHaveBeenCalled();

    expect(wrapper.vm.$data.showLoading).toBe(false);
    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith(
      'sign your account. Please try again later',
      false,
    );
  });

  it('Check signup method to call api Signup and Login and show failed alert', async () => {
    api.Signup.mockResolvedValue({
      code: 200,
      status: 'OK',
    });
    api.Login.mockResolvedValue({
      status: 400,
      error: 'Bad Request',
    });

    wrapper.vm.signup();
    expect(wrapper.vm.$data.showLoading).toBe(true);
    await flushPromises();

    expect(api.Signup).toHaveBeenCalledTimes(1);
    expect(api.Signup).toHaveBeenCalledWith(expectedData.data);

    expect(api.Login).toHaveBeenCalledTimes(1);
    expect(api.Login).toHaveBeenCalledWith(expectedData.dataLogin);

    expect(actions.setUserInfo).not.toHaveBeenCalled();

    expect(wrapper.vm.$data.showLoading).toBe(false);
    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith(
      'log in. Check your username/password',
      false,
    );
  });
});

describe('SignUp.vue check function returned', () => {
  const data = {
    nickname: 'Syntia',
    username: 'syntiaaa00',
    password: 'syntiaaa00',
    email: 'syntiaaa00@gmail.com',
    confirmPassword: 'syntiaaa00',
    role: 'ROLE_USER',
    checked: 'false',
    image: '',
    showLoading: false,
  };
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      SignUp: jest.fn(),
    };
    store = new Vuex.Store({ actions });
    wrapper = shallowMount(SignUp, {
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
        'b-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check signup method to returned', async () => {
    wrapper.vm.signup();
    await flushPromises();

    expect(api.Signup).not.toHaveBeenCalled();
    expect(wrapper.vm.$data.showLoading).toBe(false);
  });
});

describe('SignUp.vue catch error', () => {
  const expectedData = {
    data: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      password: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      confirmPassword: 'syntiaaa00',
      role: 'ROLE_USER',
      image: '',
    },
    dataLogin: {
      username: 'syntiaaa00',
      password: 'syntiaaa00',
    },
  };
  const data = {
    nickname: 'Syntia',
    username: 'syntiaaa00',
    password: 'syntiaaa00',
    email: 'syntiaaa00@gmail.com',
    confirmPassword: 'syntiaaa00',
    role: 'ROLE_USER',
    checked: 'true',
    image: '',
    showLoading: false,
  };
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    api.Signup.mockRejectedValue(new Error());
    api.Login.mockRejectedValue(new Error());

    actions = {
      setUserInfo: jest.fn(),
    };
    store = new Vuex.Store({ actions });
    wrapper = shallowMount(SignUp, {
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
        'b-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check signup method to call api Signup and show failed alert', async () => {
    wrapper.vm.signup();
    expect(wrapper.vm.$data.showLoading).toBe(true);
    await flushPromises();

    expect(api.Signup).toHaveBeenCalledTimes(1);
    expect(api.Signup).toHaveBeenCalledWith(expectedData.data);

    expect(api.Login).not.toHaveBeenCalled();

    expect(wrapper.vm.$data.showLoading).toBe(false);
    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith(
      'sign up. Please try again later',
      false,
    );
  });

  it('Check login function to not catch error', async () => {
    wrapper.vm.login();
    expect(wrapper.vm.$data.showLoading).toBe(true);
    await flushPromises();

    expect(api.Login).toHaveBeenCalledTimes(1);
    expect(api.Login).toHaveBeenCalledWith(expectedData.dataLogin);

    expect(wrapper.vm.$data.showLoading).toBe(false);
    expect(setAlert).toHaveBeenCalledTimes(1);
    expect(setAlert).toHaveBeenCalledWith(
      'log in. Please try again later',
      false,
    );
  });
});
