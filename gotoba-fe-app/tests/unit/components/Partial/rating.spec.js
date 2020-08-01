import { shallowMount } from '@vue/test-utils';
import Rating from '@/components/Partial/Rating.vue';

describe('Rating.vue', () => {
  const expectedData = {
    rating: 4,
    ceilRating: 5,
  };
  const props = {
    rate: 4.6,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Rating, {
      propsData: {
        ...props,
      },
      stubs: [
        'font-awesome-layers',
        'font-awesome-icon',
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check rating computed to return integer floor of rate props', () => {
    expect(wrapper.vm.rating).toBe(expectedData.rating);
  });

  it('Check ceilRating computed to return integer ceil of rate props', () => {
    expect(wrapper.vm.ceilRating).toBe(expectedData.ceilRating);
  });
});
