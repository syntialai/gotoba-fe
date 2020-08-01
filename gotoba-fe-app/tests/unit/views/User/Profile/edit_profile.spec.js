import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import api from '@/api/api';
import { alert } from '@/utils/tool';
import previewImage from '@/utils/fileHelper';
import EditProfile from '@/views/User/Profile/EditProfile.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  EditUser: jest.fn(),
  imageUrl: jest.fn().mockImplementation(() => 'http://localhost:8800/image/img.png'),
}));
jest.mock('@/utils/tool');
jest.mock('@/utils/fileHelper', () => jest.fn());

describe('EditProfile.vue', () => {
  const event = {
    target: { files: ['image.png'] },
  };
  const expectedData = {
    userSku: 'USER_0001',
    user: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      image: 'http://localhost:8800/image/img.png',
    },
    user2: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      image: '/img.png',
    },
    image: 'image.png',
  };
  const data = {
    user: {
      nickname: '',
      username: '',
      email: '',
      image: '',
    },
    user2: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      image: '/img.png',
    },
  };
  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    previewImage.mockResolvedValue('image.png');
    api.EditUser.mockResolvedValue({
      code: 200,
      status: 'OK',
      data: {
        nickname: 'Syntia',
        roles: 'ROLE_USER',
        sku: 'USER_0001',
        image: '/image/img',
      },
    });

    actions = {
      getUserBySku: jest.fn(),
      setUserInfo: jest.fn(),
    };
    getters = {
      userDataBySku: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(EditProfile, {
      data() {
        return {
          user: data.user2,
        };
      },
      localVue,
      store,
      stubs: [
        'font-awesome-icon',
        'ValidationObserver',
        'ValidationProvider',
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check getUserBySku actions when created', () => {
    expect(actions.getUserBySku).toHaveBeenCalledTimes(1);
    expect(actions.getUserBySku.mock.calls[0][1]).toMatch(expectedData.userSku);
  });

  it('Check watcher to change user data', async () => {
    store.hotUpdate({
      getters: {
        userDataBySku: () => data.user2,
      },
    });
    await flushPromises();

    expect(wrapper.vm.$data.user).toStrictEqual(expectedData.user);
    expect(wrapper.vm.$data.user.image).toMatch(expectedData.user.image);
  });

  it('Check updateProfile method to call EditUser api and alert', async () => {
    wrapper.vm.updateProfile();
    await flushPromises();

    expect(api.EditUser).toHaveBeenCalledTimes(1);
    expect(api.EditUser).toHaveBeenCalledWith(expectedData.userSku, expectedData.user2);

    expect(actions.setUserInfo).toHaveBeenCalledTimes(1);
    expect(actions.setUserInfo.mock.calls[0][1]).toStrictEqual({
      name: 'Syntia',
      role: 'ROLE_USER',
      sku: 'USER_0001',
      image: '/image/img',
    });

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('updated profile', true);
  });

  it('Check loadImage method to success change image data', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);
    expect(wrapper.vm.$data.user.image).toMatch(expectedData.image);
  });

  it('Check removePhoto method to remove user image', async () => {
    wrapper.vm.removePhoto();
    await flushPromises();

    expect(wrapper.vm.$data.user.image).toMatch('');
  });
});

describe('EditProfile.vue - Error state', () => {
  const event = {
    target: {},
  };
  const expectedData = {
    userSku: 'USER_0001',
    user: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      image: '/img.png',
    },
    image: 'image.png',
  };
  const data = {
    user: {
      nickname: '',
      username: '',
      email: '',
      image: '',
    },
    user2: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      image: '/img.png',
    },
  };
  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    api.EditUser.mockResolvedValue({
      status: 400,
      error: 'Bad Request',
    });

    actions = {
      getUserBySku: jest.fn(),
      setUserInfo: jest.fn(),
    };
    getters = {
      userDataBySku: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(EditProfile, {
      data() {
        return {
          user: data.user2,
        };
      },
      localVue,
      store,
      stubs: [
        'font-awesome-icon',
        'ValidationObserver',
        'ValidationProvider',
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check loadImage method to not change image data', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).not.toHaveBeenCalled();
  });

  it('Check updateProfile method to call EditUser api and call error alert', async () => {
    wrapper.vm.updateProfile();
    await flushPromises();

    expect(api.EditUser).toHaveBeenCalledTimes(1);
    expect(api.EditUser).toHaveBeenCalledWith(expectedData.userSku, expectedData.user);

    expect(actions.setUserInfo).not.toHaveBeenCalled();

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('update profile', false);
  });
});

describe('EditProfile.vue - Catch error', () => {
  const event = {
    target: { files: ['image.png'] },
  };
  const expectedData = {
    userSku: 'USER_0001',
    user: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      image: '/img.png',
    },
    image: 'image.png',
  };
  const data = {
    user: {
      nickname: '',
      username: '',
      email: '',
      image: '',
    },
    user2: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      image: '/img.png',
    },
  };
  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    previewImage.mockRejectedValue(new Error());
    api.EditUser.mockRejectedValue(new Error());
    console.log = jest.fn();

    actions = {
      getUserBySku: jest.fn(),
      setUserInfo: jest.fn(),
    };
    getters = {
      userDataBySku: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(EditProfile, {
      data() {
        return {
          user: data.user2,
        };
      },
      localVue,
      store,
      stubs: [
        'font-awesome-icon',
        'ValidationObserver',
        'ValidationProvider',
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check loadImage method to catch error and not to change image data', async () => {
    wrapper.vm.loadImage(event);
    await flushPromises();

    expect(previewImage).toHaveBeenCalledTimes(1);
    expect(previewImage).toHaveBeenCalledWith(event.target.files[0]);

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('Check updateProfile method to catch error and call fail alert', async () => {
    wrapper.vm.updateProfile();
    await flushPromises();

    expect(api.EditUser).toHaveBeenCalledTimes(1);
    expect(api.EditUser).toHaveBeenCalledWith(expectedData.userSku, expectedData.user);

    expect(actions.setUserInfo).not.toHaveBeenCalled();

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('update profile', false);

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('Check updateProfile method not to call api', async () => {
    wrapper.setData({
      user: {
        ...data.user,
      },
    });
    wrapper.vm.updateProfile();
    await flushPromises();

    expect(api.EditUser).not.toHaveBeenCalled();
  });
});
