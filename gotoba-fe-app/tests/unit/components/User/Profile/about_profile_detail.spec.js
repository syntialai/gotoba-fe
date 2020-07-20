import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import AboutProfileDetail from '@/components/User/Profile/AboutProfileDetail.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('AboutProfileDetail.vue', () => {
  const expectedData = {
    items: [
      {
        description: 'Desc Example',
        full_address: 'Address Example',
        hours_open: 'monday = 10.00AM - 10.00PM\ntuesday = 10.00AM - 10.00PM',
        telephone: '081377233761',
      },
    ],
    hoursOpen: 'monday = 10.00AM - 10.00PM\ntuesday = 10.00AM - 10.00PM',
  };
  const props = {
    data: {
      description: 'Desc Example',
      address: 'Address Example',
      hoursOpen: {
        monday: ['10.00AM', '10.00PM'],
        tuesday: ['10.00AM', '10.00PM'],
      },
      phone: '081377233761',
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AboutProfileDetail, {
      propsData: { ...props },
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check hoursOpen computed to return custom stringify props', () => {
    expect(wrapper.vm.hoursOpen).toMatch(expectedData.hoursOpen);
  });

  it('Check items computed return changed props', () => {
    expect(wrapper.vm.items).toStrictEqual(expectedData.items);
  });
});
