import { shallowMount } from '@vue/test-utils';
import RestaurantCard from '@/components/Admin/Card/RestaurantCard.vue';

describe('RestaurantCard.vue', () => {
  const expectedData = {
    restaurantData: {
      image: '/restaurant/img.png',
      location: 'Parapat, North Sumatra',
      other: 'All-day Cafe',
      rating: null,
    },
    goToRestaurantDetail: '/admin/restaurant/REST_0001_0001',
  };
  const restaurant = {
    image: '/restaurant/img.png',
    address: 'Parapat, North Sumatra',
    bistroType: 'All-day Cafe',
    sku: 'REST_0001_0001',
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RestaurantCard, {
      propsData: {
        restaurant,
      },
      stubs: ['data-card', 'router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check restaurantData computed return true object', () => {
    expect(wrapper.vm.restaurantData).toStrictEqual(expectedData.restaurantData);
  });

  it('Check goToRestaurantDetail computed return link to Restaurant Details', () => {
    expect(wrapper.vm.goToRestaurantDetail).toMatch(expectedData.goToRestaurantDetail);
  });
});
