import { shallowMount } from '@vue/test-utils';
import ItineraryCard from '@/components/Admin/Card/ItineraryCard.vue';

describe('ItineraryCard.vue', () => {
  const expectedData = {
    image: '/wisata/img.png',
    location: 'Parapat',
    name: 'Parapat',
    other: 'Rp100.000,00',
    rating: null,
  };
  const itinerary = {
    name: 'Parapat',
    image: '/wisata/img.png',
    location: 'Parapat',
    price: 100000,
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItineraryCard, {
      propsData: {
        itinerary,
      },
      stubs: ['data-card'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check itineraryData computed return true object', () => {
    expect(wrapper.vm.itineraryData).toStrictEqual(expectedData);
  })
});
