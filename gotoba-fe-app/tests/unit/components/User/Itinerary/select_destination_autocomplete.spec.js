import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import SelectDestinationAutocomplete from '@/components/User/Itinerary/SelectDestinationAutocomplete.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $router = {
  replace: jest.fn(),
};

describe('SelectDestinationAutocomplete.vue', () => {
  const expectedData = {
    matches: [{
      name: 'Danau Toba',
      address: 'Samosir',
    }],
    replace: '/itinerary/add/show-on-map',
    name: 'Toba',
  };
  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      locationKeyword: () => 'Danau',
      locationData: () => [
        {
          name: 'Danau Toba',
          address: 'Samosir',
        },
        {
          name: 'Pantai Lumban Bulbul',
          address: 'Samosir',
        },
      ],
      locationOpen: () => true,
    };
    actions = {
      setLocationKeyword: jest.fn(),
      setLocationOpen: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(SelectDestinationAutocomplete, {
      mocks: {
        $router,
      },
      localVue,
      store,
      stubs: [
        'font-awesome-icon',
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check matches computed to return filtered locationData getters', () => {
    expect(wrapper.vm.matches).toStrictEqual(expectedData.matches);
  });

  it('Check showOnMap method to call $router mocks', () => {
    wrapper.vm.showOnMap();

    expect($router.replace).toHaveBeenCalledTimes(1);
    expect($router.replace).toHaveBeenCalledWith(expectedData.replace);
  });

  it('Check select method to call actions', () => {
    wrapper.vm.select(expectedData.name);

    expect(actions.setLocationKeyword).toHaveBeenCalledTimes(1);
    expect(actions.setLocationKeyword.mock.calls[0][1]).toMatch(expectedData.name);

    expect(actions.setLocationOpen).toHaveBeenCalledTimes(1);
    expect(actions.setLocationOpen.mock.calls[0][1]).toBe(false);
  });
});
