import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import ItineraryCardGroup from '@/components/Admin/Data/ItineraryCardGroup.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('ItineraryCardGroup.vue', () => {
  const expectedData = {
    itineraries: [
      { sku: 'WIS_0001_0001' },
      { sku: 'WIS_0001_0002' },
      { sku: 'WIS_0001_0003' },
      { sku: 'WIS_0001_0004' },
      { sku: 'WIS_0001_0005' },
    ],
  };
  const props = {
    itineraries: [
      { sku: 'WIS_0001_0001' },
      { sku: 'WIS_0001_0002' },
      { sku: 'WIS_0001_0003' },
      { sku: 'WIS_0001_0004' },
      { sku: 'WIS_0001_0005' },
      { sku: 'WIS_0001_0006' },
    ],
    start: 1,
    end: 5,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ItineraryCardGroup, {
      propsData: { ...props },
      localVue,
      stubs: ['itinerary-card'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check itineraryRange computed return sliced itineraries props', () => {
    expect(wrapper.vm.itineraryRange).toStrictEqual(expectedData.itineraries);
  });
});
