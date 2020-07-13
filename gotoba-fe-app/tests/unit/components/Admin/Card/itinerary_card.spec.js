import { shallowMount } from '@vue/test-utils';
import ItineraryCard from '@/components/Admin/Card/ItineraryCard.vue';

describe('ItineraryCard.vue', () => {
  const expectedData = {
    image: '/wisata/img.png',
    location: 'Parapat',
    other: 100000,
    rating: null,
  };
  const itinerary = {
    image: '/wisata/img.png',
    location: 'Parapat',
    harga: 100000,
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
