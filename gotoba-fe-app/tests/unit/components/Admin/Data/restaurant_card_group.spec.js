import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import RestaurantCardGroup from '@/components/Admin/Data/RestaurantCardGroup.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const $router = { push: jest.fn() };

describe('RestaurantCardGroup.vue', () => {
  const expectedData = {
    path: '/admin/restaurant/REST_0001_0001',
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
    wrapper = mount(RestaurantCardGroup, {
      mocks: {
        $router,
      },
      propsData: { ...props },
      localVue,
      stubs: ['restaurant-card'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check restaurantRange computed return sliced restaurants props', async () => {
    expect(wrapper.vm.restaurantRange).toStrictEqual(expectedData.restaurants);
  });

  it('Check goToDetails method navigate to Restaurant Details when called with param', () => {
    wrapper.vm.goToDetails(props.restaurants[0].sku);

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData.path);
  });
});
