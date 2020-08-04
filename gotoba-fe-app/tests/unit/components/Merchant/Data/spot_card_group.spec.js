import { shallowMount } from '@vue/test-utils';
import SpotCardGroup from '@/components/Merchant/Data/SpotCardGroup.vue';
import flushPromises from 'flush-promises';

describe('SpotCardGroup.vue', () => {
  const expectedData = '/merchant/spot/WIS_0001_0001_0001';
  const itineraries = [
    {
      sku: 'WIS_0001_0001_0001',
    },
  ];
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SpotCardGroup, {
      propsData: {
        itineraries: itineraries,
      },
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check goToSpotDetail method return link to Spot Details by sku', () => {
    const goToSpotDetail = wrapper.vm.goToSpotDetail(itineraries[0].sku);
    expect(goToSpotDetail).toMatch(expectedData);
  });
});
