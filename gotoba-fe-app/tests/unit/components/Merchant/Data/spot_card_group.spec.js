import { shallowMount } from '@vue/test-utils';
import SpotCardGroup from '@/components/Merchant/Data/SpotCardGroup.vue';

const $router = { push: jest.fn() };

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
      mocks: {
        $router,
      },
      propsData: {
        itineraries: itineraries,
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check toSpotDetail method navigate to Spot Details when called with param', async () => {
    wrapper.vm.toSpotDetail(itineraries[0].sku);

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData);
  });
});
