import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import AboutTourGuideDetail from '@/components/User/TourGuide/AboutTourGuideDetail.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('AboutTourGuideDetail.vue', () => {
  const expectedData = {
    items: [
      {
        language: 'Indonesia, English',
        available_location: 'Parapat, Samosir',
        phone_number: '081377233361',
        email: 'tourguide@gmail.com',
        whatsapp: '081377233361',
        experience: '-',
        description: '-',
      },
    ],
  };
  const props = {
    data: {
      language: 'Indonesia, English',
      availableLocation: 'Parapat, Samosir',
      phone: '081377233361',
      email: 'tourguide@gmail.com',
      whatsapp: '081377233361',
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AboutTourGuideDetail, {
      propsData: { ...props },
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check items computed return changed props', () => {
    expect(wrapper.vm.items).toStrictEqual(expectedData.items);
  });
});
