import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import TourGuideCardGroup from '@/components/Admin/Data/TourGuideCardGroup.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('TourGuideCardGroup.vue', () => {
  const expectedData = {
    goToDetails: '/admin/tour-guide/TOUR_0001_0001',
    tourGuideRange: [
      {
        sku: 'TOUR_0001_0001',
      },
      {
        sku: 'TOUR_0001_0002',
      },
      {
        sku: 'TOUR_0001_0002',
      },
      {
        sku: 'TOUR_0001_0002',
      },
      {
        sku: 'TOUR_0001_0003',
      },
    ],
  };
  const props = {
    tourGuides: [
      {
        sku: 'TOUR_0001_0001',
      },
      {
        sku: 'TOUR_0001_0002',
      },
      {
        sku: 'TOUR_0001_0002',
      },
      {
        sku: 'TOUR_0001_0002',
      },
      {
        sku: 'TOUR_0001_0003',
      },
      {
        sku: 'TOUR_0001_0002',
      },
    ],
    start: 1,
    end: 5,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TourGuideCardGroup, {
      propsData: {
        ...props,
      },
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check tourGuideRange computed to return true range of array', () => {
    expect(wrapper.vm.tourGuideRange).toStrictEqual(expectedData.tourGuideRange);
  });
});
