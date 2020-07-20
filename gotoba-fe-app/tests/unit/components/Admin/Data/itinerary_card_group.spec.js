import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import ItineraryCardGroup from '@/components/Admin/Data/ItineraryCardGroup.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const $router = { push: jest.fn() };

describe('ItineraryCardGroup.vue', () => {
  const expectedData = {
    path: '/admin/itinerary/WIS_0001_0001',
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
      mocks: {
        $router,
      },
      propsData: { ...props },
      localVue,
      stubs: ['itinerary-card'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check itineraryRange computed return sliced itineraries props', async () => {
    expect(wrapper.vm.itineraryRange).toStrictEqual(expectedData.itineraries);
  });

  it('Check goToDetails method navigate to Itinerary Details when called with param', () => {
    wrapper.vm.goToDetails(props.itineraries[0].sku);

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData.path);
  });
});
