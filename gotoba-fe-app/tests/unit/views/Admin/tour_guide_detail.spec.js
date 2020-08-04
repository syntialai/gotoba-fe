import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import TourGuideDetail from '@/views/Admin/TourGuideDetail.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

const $route = {
  params: {
    sku: 'TOUR_0001',
  },
};
const $router = {
  push: jest.fn(),
};
const $bvModal = {
  msgBoxConfirm: jest.fn(),
};

describe('TourGuideDetail.vue', () => {
  const expectedData = {
    tourGuideData: {
      image: '',
      name: 'Tour Guide 1',
      sku: 'TOUR_0001',
    },
    routerPush: '/admin/tour-guide',
  };
  let wrapper;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      tourGuideData: () => ({
        image: '',
        name: 'Tour Guide 1',
        sku: 'TOUR_0001',
      }),
    };
    actions = {
      getTourGuideBySku: jest.fn(),
      removeTourGuide: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters,
    });

    wrapper = shallowMount(TourGuideDetail, {
      mocks: {
        $route,
        $router,
        $bvModal,
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

  it('Check getTourGuideBySku actions to be called when created', () => {
    expect(actions.getTourGuideBySku).toHaveBeenCalledTimes(1);
  });

  it('Check deleteTourGuide method to call actions and $router', () => {
    wrapper.vm.deleteTourGuide();

    expect(actions.removeTourGuide).toHaveBeenCalledTimes(1);
    expect(actions.removeTourGuide.mock.calls[0][1]).toMatch(expectedData.tourGuideData.sku);

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData.routerPush);
  });

  it('Check confirmModal method to call bvModal and call method', async () => {
    const deleteTourGuide = jest.spyOn(wrapper.vm, 'deleteTourGuide');
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm').mockResolvedValue(true);

    wrapper.vm.confirmModal();
    await flushPromises();

    expect(bvModal).toHaveBeenCalledTimes(1);
    expect(deleteTourGuide).toHaveBeenCalledTimes(1);
  });

  it('Check confirmModal method to call bvModal and not call method', async () => {
    const deleteTourGuide = jest.spyOn(wrapper.vm, 'deleteTourGuide');
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm')
      .mockResolvedValue(false);

    wrapper.vm.confirmModal();
    await flushPromises();

    expect(bvModal).toHaveBeenCalledTimes(1);
    expect(deleteTourGuide).not.toHaveBeenCalled();
  });

  it('Check confirmModal method to call bvModal and not call method', async () => {
    const deleteTourGuide = jest.spyOn(wrapper.vm, 'deleteTourGuide');
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm')
      .mockRejectedValue(new Error());

    wrapper.vm.confirmModal();
    await flushPromises();

    expect(bvModal).toHaveBeenCalledTimes(1);
    expect(deleteTourGuide).not.toHaveBeenCalled();
  });
});
