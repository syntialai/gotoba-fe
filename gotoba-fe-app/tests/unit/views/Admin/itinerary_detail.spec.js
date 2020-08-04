import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
// eslint-disable-next-line no-unused-vars
import ItineraryDetail from '@/views/Admin/ItineraryDetail.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $route = {
  params: {
    sku: 'WIST_0001',
  },
};
const $router = {
  push: jest.fn(),
};

describe('ItineraryDetail.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    journeyDataBySku: {
      sku: 'WIST_0001',
      image: '/img.png',
      hoursOpen: 'Monday\t = 07:00 AM - 09:00 PM\nTuesday\t = 07:00 AM - 09:00 PM\n',
    },
    routerPush: '/admin/itinerary',
  };
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      journeyDataBySku: () => ({
        image: '/img.png',
        sku: 'WIST_0001',
        hoursOpen: {
          monday: ['07:00 AM', '09:00 PM'],
          tuesday: ['07:00 AM', '09:00 PM'],
        },
      }),
    };
    actions = {
      getJourneyDataBySku: jest.fn(),
      removeItinerary: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(ItineraryDetail, {
      mocks: {
        $route,
        $router,
      },
      store,
      localVue,
      stubs: ['b-button', 'b-modal'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check getJourneyDataBySku actions to be called when created', () => {
    expect(actions.getJourneyDataBySku).toHaveBeenCalledTimes(1);
  });

  it('Check deleteItinerary method to call actions and $router', () => {
    wrapper.vm.deleteItinerary();

    expect(actions.removeItinerary).toHaveBeenCalledTimes(1);
    expect(actions.removeItinerary.mock.calls[0][1]).toMatch(expectedData.journeyDataBySku.sku);

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData.routerPush);
  });

  it('Check confirmModal method to call bvModal and call method', async () => {
    const deleteItinerary = jest.spyOn(wrapper.vm, 'deleteItinerary');
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm')
      .mockResolvedValue(true);

    wrapper.vm.confirmModal();
    await flushPromises();

    expect(bvModal).toHaveBeenCalledTimes(1);
    expect(deleteItinerary).toHaveBeenCalledTimes(1);
  });

  it('Check confirmModal method to call bvModal and not call method', async () => {
    const deleteItinerary = jest.spyOn(wrapper.vm, 'deleteItinerary');
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm')
      .mockResolvedValue(false);

    wrapper.vm.confirmModal();
    await flushPromises();

    expect(bvModal).toHaveBeenCalledTimes(1);
    expect(deleteItinerary).not.toHaveBeenCalled();
  });

  it('Check confirmModal method to call bvModal and not call method - error', async () => {
    const deleteItinerary = jest.spyOn(wrapper.vm, 'deleteItinerary');
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm')
      .mockRejectedValue(new Error());

    wrapper.vm.confirmModal();
    await flushPromises();

    expect(bvModal).toHaveBeenCalledTimes(1);
    expect(deleteItinerary).not.toHaveBeenCalled();
  });
});
