import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import RestaurantDetail from '@/views/Admin/RestaurantDetail.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $route = {
  params: {
    sku: 'REST_0001',
  },
};

describe('RestaurantDetail.vue', () => {
  const expectedData = {
    hoursOpen: 'Monday\t\t10.00AM - 10.00PM\nTuesday\t\t10.00AM - 10.00PM\n',
  };
  const data = {
    hoursOpen: {
      monday: ['10.00AM', '10.00PM'],
      tuesday: ['10.00AM', '10.00PM'],
    },
  };
  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      getRestaurantDataBySku: jest.fn(),
    };
    getters = {
      restaurantData: () => ({
        hoursOpen: data.hoursOpen,
      }),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(RestaurantDetail, {
      mocks: {
        $route,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check getRestaurantDataBySku actions to be called when created', () => {
    expect(actions.getRestaurantDataBySku).toHaveBeenCalledTimes(1);
    expect(actions.getRestaurantDataBySku.mock.calls[0][1]).toMatch($route.params.sku);
  });

  it('Check hoursOpen computed to return custom stringify props', () => {
    expect(wrapper.vm.hoursOpen).toMatch(expectedData.hoursOpen);
  });
});
