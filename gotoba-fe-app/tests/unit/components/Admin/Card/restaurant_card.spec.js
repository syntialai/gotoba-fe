import { shallowMount } from '@vue/test-utils';
import RestaurantCard from '@/components/Admin/Card/RestaurantCard.vue';

describe('RestaurantCard.vue', () => {
  const expectedData = {
    image: '/restaurant/img.png',
    location: 'Parapat',
    other: 'All-day Cafe',
    rating: null,
  };
  const restaurant = {
    image: '/restaurant/img.png',
    location: 'Parapat',
    bistroType: 'All-day Cafe',
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RestaurantCard, {
      propsData: {
        restaurant,
      },
      stubs: ['data-card'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check restaurantData computed return true object', () => {
    expect(wrapper.vm.restaurantData).toStrictEqual(expectedData);
  })
});
