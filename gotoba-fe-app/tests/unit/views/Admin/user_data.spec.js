import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import UserData from '@/views/Admin/UserData.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserData.vue', () => {
  const expectedData = {
    items: [
      {
        user: {
          image: '',
          name: 'Syntia',
        },
        status: 'active',
        sku: 'SYNT_0001',
        email: 'syntiaaa00@gmail.com',
      },
      {
        user: {
          image: '',
          name: 'Syntia',
        },
        status: 'active',
        sku: 'SYNT_0001',
        email: 'syntiaaa00@gmail.com',
      },
      {
        user: {
          image: '',
          name: 'Syntia',
        },
        status: 'active',
        sku: 'SYNT_0001',
        email: 'syntiaaa00@gmail.com',
      },
    ],
    dataStart: 1,
    dataEnd: {
      if: 2,
      else: 3,
    },
  };
  const data = {
    currentPage: 1,
    perPage: 5,
    fields: [
      {
        key: 'user',
        sortable: true,
      },
      {
        key: 'sku',
        sortable: true,
      },
      {
        key: 'email',
        sortable: false,
      },
      {
        key: 'status',
        sortable: true,
      },
    ],
  };
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      userData: () => ([
        {
          image: '',
          nickname: 'Syntia',
          status: 'active',
          sku: 'SYNT_0001',
          email: 'syntiaaa00@gmail.com',
        },
        {
          image: '',
          nickname: 'Syntia',
          status: 'active',
          sku: 'SYNT_0001',
          email: 'syntiaaa00@gmail.com',
        },
        {
          image: '',
          nickname: 'Syntia',
          status: 'active',
          sku: 'SYNT_0001',
          email: 'syntiaaa00@gmail.com',
        },
      ]),
    };
    actions = {
      getUserData: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(UserData, {
      data() {
        return data;
      },
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('Check getUserData actions to be called when created', () => {
    expect(actions.getUserData).toHaveBeenCalled();
  });

  it('Check items computed to return mapped userData getters', () => {
    expect(wrapper.vm.items).toStrictEqual(expectedData.items);
  });

  it('Check dataStart computed to return begin data', () => {
    expect(wrapper.vm.dataStart).toBe(expectedData.dataStart);
  });

  it('Check dataEnd computed to return end data when userData length is more than counted end data', () => {
    wrapper.setData({ perPage: 2 });
    expect(wrapper.vm.dataEnd).toBe(expectedData.dataEnd.if);
  });

  it('Check dataEnd computed to return end data when userData length is less than counted end data', () => {
    wrapper.setData({ perPage: 5 });
    expect(wrapper.vm.dataEnd).toBe(expectedData.dataEnd.else);
  });
});
