import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import api from '@/api/api';
import { alert } from '@/utils/tool';
import previewImage from '@/utils/fileHelper';
import EditProfile from '@/views/Merchant/Profile/EditProfile.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

jest.mock('@/api/api', () => ({
  EditMerchant: jest.fn(),
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
    merchant: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      image: 'http://localhost:8800/image/img.png',
    },
    merchant2: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      image: '/img.png',
    },
    image: 'image.png',
  };
  const data = {
    merchant: {
      nickname: '',
      username: '',
      email: '',
      image: '',
    },
    merchant2: {
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
    api.EditMerchant.mockResolvedValue({
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
      getMerchantDataBySku: jest.fn(),
      setUserInfo: jest.fn(),
    };
    getters = {
      merchantData: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(EditProfile, {
      data() {
        return {
          merchant: data.merchant2,
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

  it('Check getMerchantDataBySku actions when created', () => {
    expect(actions.getMerchantDataBySku).toHaveBeenCalledTimes(1);
    expect(actions.getMerchantDataBySku.mock.calls[0][1]).toMatch(expectedData.userSku);
  });

  it('Check watcher to change merchant data', async () => {
    store.hotUpdate({
      getters: {
        merchantData: () => data.merchant2,
      },
    });
    await flushPromises();

    expect(wrapper.vm.$data.merchant).toStrictEqual(expectedData.merchant);
    expect(wrapper.vm.$data.merchant.image).toMatch(expectedData.merchant.image);
  });

  it('Check updateProfile method to call EditMerchant api and alert', async () => {
    wrapper.vm.updateProfile();
    await flushPromises();

    expect(api.EditMerchant).toHaveBeenCalledTimes(1);
    expect(api.EditMerchant).toHaveBeenCalledWith(expectedData.userSku, expectedData.merchant2);

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
    expect(wrapper.vm.$data.merchant.image).toMatch(expectedData.image);
  });

  it('Check removePhoto method to remove merchant image', async () => {
    wrapper.vm.removePhoto();
    await flushPromises();

    expect(wrapper.vm.$data.merchant.image).toMatch('');
  });
});

describe('EditProfile.vue - Error state', () => {
  const event = {
    target: {},
  };
  const expectedData = {
    userSku: 'USER_0001',
    merchant: {
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
    merchant2: {
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
    api.EditMerchant.mockResolvedValue({
      status: 400,
      error: 'Bad Request',
    });

    actions = {
      getMerchantDataBySku: jest.fn(),
      setUserInfo: jest.fn(),
    };
    getters = {
      merchantData: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(EditProfile, {
      data() {
        return {
          merchant: data.merchant2,
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

  it('Check updateProfile method to call EditMerchant api and call error alert', async () => {
    wrapper.vm.updateProfile();
    await flushPromises();

    expect(api.EditMerchant).toHaveBeenCalledTimes(1);
    expect(api.EditMerchant).toHaveBeenCalledWith(expectedData.userSku, expectedData.merchant);

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
    merchant: {
      nickname: 'Syntia',
      username: 'syntiaaa00',
      email: 'syntiaaa00@gmail.com',
      image: '/img.png',
    },
    image: 'image.png',
  };
  const data = {
    merchant: {
      nickname: '',
      username: '',
      email: '',
      image: '',
    },
    merchant2: {
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
    api.EditMerchant.mockRejectedValue(new Error());
    console.log = jest.fn();

    actions = {
      getMerchantDataBySku: jest.fn(),
      setUserInfo: jest.fn(),
    };
    getters = {
      merchantData: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(EditProfile, {
      data() {
        return {
          merchant: data.merchant2,
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

    expect(api.EditMerchant).toHaveBeenCalledTimes(1);
    expect(api.EditMerchant).toHaveBeenCalledWith(expectedData.userSku, expectedData.merchant);

    expect(actions.setUserInfo).not.toHaveBeenCalled();

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('update profile', false);

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('Check updateProfile method not to call api', async () => {
    wrapper.setData({
      merchant: {
        ...data.merchant,
      },
    });
    wrapper.vm.updateProfile();
    await flushPromises();

    expect(api.EditMerchant).not.toHaveBeenCalled();
  });
});
