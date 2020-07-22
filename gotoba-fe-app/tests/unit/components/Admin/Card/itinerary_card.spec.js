import { shallowMount } from '@vue/test-utils';
import ItineraryCard from '@/components/Admin/Card/ItineraryCard.vue';

describe('ItineraryCard.vue', () => {
  const expectedData = {
    itineraryData: {
      image: '/wisata/img.png',
      location: 'Parapat, North Sumatra',
      name: 'Parapat',
      other: 'Rp100.000,00',
      rating: null,
    },
    goToItineraryDetail: '/admin/itinerary/WIS_0001_0001',
  };
  const itinerary = {
    name: 'Parapat',
    image: '/wisata/img.png',
    address: 'Parapat, North Sumatra',
    price: 100000,
    sku: 'WIS_0001_0001'
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItineraryCard, {
      propsData: {
        itinerary,
      },
      stubs: ['data-card', 'router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check itineraryData computed return true object', () => {
    expect(wrapper.vm.itineraryData).toStrictEqual(expectedData.itineraryData);
  })

  it('Check goToItineraryDetail computed return link to Itinerary Details', () => {
    expect(wrapper.vm.goToItineraryDetail).toMatch(expectedData.goToItineraryDetail);
  });
});
