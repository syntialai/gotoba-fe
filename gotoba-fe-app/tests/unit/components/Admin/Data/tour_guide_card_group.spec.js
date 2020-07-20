import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import TourGuideCardGroup from '@/components/Admin/Data/TourGuideCardGroup.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const $router = { push: jest.fn() };

describe('TourGuideCardGroup.vue', () => {
  const expectedData = '/admin/tour-guide/TOUR_0001_0001';
  const tourGuides = [
    {
      sku: 'TOUR_0001_0001',
    },
  ];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TourGuideCardGroup, {
      mocks: {
        $router,
      },
      propsData: {
        tourGuides: tourGuides,
      },
      localVue,
      stubs: ['tour-guide-card'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check goToDetails method navigate to TourGuide Details when called with param', () => {
    wrapper.vm.goToDetails(tourGuides[0].sku);

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData);
  });
});
