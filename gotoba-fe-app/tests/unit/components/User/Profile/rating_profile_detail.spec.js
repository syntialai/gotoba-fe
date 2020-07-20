import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import RatingProfileDetail from '@/components/User/Profile/RatingProfileDetail.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('RatingProfileDetail.vue', () => {
  const expectedData = 150;
  const item = {
    ratingBars: [0, 50, 0, 0, 100],
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RatingProfileDetail, {
      propsData: { ...item },
      localVue,
      stubs: [
        'averageOfRatings',
        'rating',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check totalReviewer computed to return sum of ratingBars when called', () => {
    expect(wrapper.vm.totalReviewer).toBe(expectedData);
  });
});
