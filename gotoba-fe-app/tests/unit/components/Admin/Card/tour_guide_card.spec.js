import { shallowMount } from '@vue/test-utils';
import TourGuideCard from '@/components/Admin/Card/TourGuideCard.vue';

describe('TourGuideCard.vue', () => {
  const expectedData = {
    image: '/tour-guide/img.png',
    location: 'Parapat',
    other: 25,
    rating: 5.0,
    name: 'Tour Guide',
  };
  const tourGuide = {
    image: '/tour-guide/img.png',
    location: 'Parapat',
    age: 25,
    rating: 5.0,
    name: 'Tour Guide',
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TourGuideCard, {
      propsData: {
        tourGuide,
      },
      stubs: ['data-card', 'router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check tourGuideData computed return true object', () => {
    expect(wrapper.vm.tourGuideData).toStrictEqual(expectedData);
  });
});
