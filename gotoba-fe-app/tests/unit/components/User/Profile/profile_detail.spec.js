import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import ProfileDetail from '@/components/User/Profile/ProfileDetail.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('ProfileDetail.vue', () => {
  const expectedData = {
    isMerchant: true,
  };
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      userRole: () => 'ROLE_MERCHANT',
    };
    store = new Vuex.Store({
      getters,
    });
    wrapper = shallowMount(ProfileDetail, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check isMerchant computed to return true when getters is merchant', () => {
    expect(wrapper.vm.isMerchant).toBe(expectedData.isMerchant);
  });
});
