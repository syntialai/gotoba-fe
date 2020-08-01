import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import RestaurantCardGroup from '@/components/Admin/Data/RestaurantCardGroup.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('RestaurantCardGroup.vue', () => {
  const expectedData = {
    restaurants: [
      { sku: 'REST_0001_0001' },
      { sku: 'REST_0001_0002' },
      { sku: 'REST_0001_0003' },
      { sku: 'REST_0001_0004' },
      { sku: 'REST_0001_0005' },
    ],
  };
  const props = {
    restaurants: [
      { sku: 'REST_0001_0001' },
      { sku: 'REST_0001_0002' },
      { sku: 'REST_0001_0003' },
      { sku: 'REST_0001_0004' },
      { sku: 'REST_0001_0005' },
      { sku: 'REST_0001_0006' },
    ],
    start: 1,
    end: 5,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RestaurantCardGroup, {
      propsData: { ...props },
      localVue,
      stubs: ['restaurant-card'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check restaurantRange computed return sliced restaurants props', () => {
    expect(wrapper.vm.restaurantRange).toStrictEqual(expectedData.restaurants);
  });
});
