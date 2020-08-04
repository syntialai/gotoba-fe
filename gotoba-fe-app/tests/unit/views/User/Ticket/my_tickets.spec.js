import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import MyTickets from '@/views/User/Ticket/MyTickets.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('MyTickets.vue', () => {
  const expectedData = {
    userSku: 'USER_0001',
  };

  // eslint-disable-next-line no-unused-vars
  let actions;
  let getters;
  let store;
  // eslint-disable-next-line no-unused-vars
  let wrapper;

  beforeEach(() => {
    actions = {
      getApprovedOrderData: jest.fn(),
    };
    getters = {
      approvedOrderData: () => [],
      userSku: () => 'USER_0001',
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(MyTickets, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(actions.getApprovedOrderData).toHaveBeenCalledTimes(1);
    expect(actions.getApprovedOrderData.mock.calls[0][1]).toMatch(expectedData.userSku);
  });
});
