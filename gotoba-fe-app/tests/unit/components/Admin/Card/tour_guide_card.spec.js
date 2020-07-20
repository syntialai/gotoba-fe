import { shallowMount } from '@vue/test-utils';
import TourGuideCard from '@/components/Admin/Card/TourGuideCard.vue';

describe('TourGuideCard.vue', () => {
  const expectedData = {
    image: '/tour-guide/img.png',
    location: 'Parapat',
    other: 'Female',
    rating: 5.0,
  };
  const tourGuide = {
    image: '/tour-guide/img.png',
    location: 'Parapat',
    gender: 'Female',
    rating: 5.0,
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TourGuideCard, {
      propsData: {
        tourGuide,
      },
      stubs: ['data-card'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check tourGuideData computed return true object', () => {
    expect(wrapper.vm.tourGuideData).toStrictEqual(expectedData);
  })
});
