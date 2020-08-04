import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import CardTourGuide from '@/components/User/TourGuide/CardTourGuide.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CardTourGuide.vue', () => {
  const expectedData = {
    imageUrl: 'http://localhost:8800/image/img.png',
    goToTourGuideDetails: '/tour-guide/TOUR_0001',
  };
  const props = {
    image: '/img.png',
    sku: 'TOUR_0001',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardTourGuide, {
      propsData: {
        tourGuide: props,
      },
      localVue,
      stubs: ['font-awesome-icon', 'router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check imageUrl computed to return url image', () => {
    expect(wrapper.vm.imageUrl).toMatch(expectedData.imageUrl);
  });

  it('Check goToTourGuideDetails computed return link to tour guide detail', () => {
    expect(wrapper.vm.goToTourGuideDetails).toMatch(expectedData.goToTourGuideDetails);
  });
});
