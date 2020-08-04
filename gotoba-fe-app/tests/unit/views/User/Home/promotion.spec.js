import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Promotion from '@/views/User/Home/Promotion.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Promotion.vue', () => {
  const expectedData = [
    {
      image: '',
      title: 'Promotion 1',
      sku: 'TICK_0001',
      price: 100000,
    },
  ];
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      ticketPromotion: () => ([
        {
          image: '',
          title: 'Promotion 1',
          sku: 'TICK_0001',
          price: 100000,
        },
      ]),
    };
    actions = {
      getTicketPromotion: jest.fn(),
      getTicketData: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(Promotion, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check ticketPromotion getters from vuex', () => {
    expect(wrapper.vm.ticketPromotion).toStrictEqual(expectedData);
  });

  it('Check getTicketData and getTicketPromotion actions to be called when created', () => {
    expect(actions.getTicketData).toHaveBeenCalledTimes(1);
    expect(actions.getTicketPromotion).toHaveBeenCalledTimes(1);
  });
});
