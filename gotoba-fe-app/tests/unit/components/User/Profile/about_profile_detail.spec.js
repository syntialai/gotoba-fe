import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import AboutProfileDetail from '@/components/User/Profile/AboutProfileDetail.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('AboutProfileDetail.vue', () => {
  const expectedData = {
    complete: {
      items: [
        {
          description: 'Desc Example',
          full_address: 'Address Example',
          hours_open: 'Monday = 10.00AM - 10.00PM\nTuesday = 10.00AM - 10.00PM\n',
          telephone: '081377233761',
        },
      ],
    },
    no_desc: {
      items: [
        {
          description: '-',
          full_address: 'Address Example',
          hours_open: 'Monday = 10.00AM - 10.00PM\nTuesday = 10.00AM - 10.00PM\n',
          telephone: '081377233761',
        },
      ],
    },
    no_telp: {
      items: [
        {
          description: 'Desc Example',
          full_address: 'Address Example',
          hours_open: 'Monday = 10.00AM - 10.00PM\nTuesday = 10.00AM - 10.00PM\n',
          telephone: '-',
        },
      ],
    },
    hoursOpen: 'Monday = 10.00AM - 10.00PM\nTuesday = 10.00AM - 10.00PM\n',
  };
  const props = {
    complete: {
      data: {
        description: 'Desc Example',
        address: 'Address Example',
        hoursOpen: {
          monday: ['10.00AM', '10.00PM'],
          tuesday: ['10.00AM', '10.00PM'],
        },
        phone: '081377233761',
      },
    },
    no_desc: {
      data: {
        address: 'Address Example',
        hoursOpen: {
          monday: ['10.00AM', '10.00PM'],
          tuesday: ['10.00AM', '10.00PM'],
        },
        phone: '081377233761',
      },
    },
    no_telp: {
      data: {
        description: 'Desc Example',
        address: 'Address Example',
        hoursOpen: {
          monday: ['10.00AM', '10.00PM'],
          tuesday: ['10.00AM', '10.00PM'],
        },
      },
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AboutProfileDetail, {
      propsData: { ...props.complete },
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
    expect(wrapper.vm.items).toStrictEqual(expectedData.complete.items);
  });

  it('Check items computed return no description data', () => {
    wrapper.setProps({
      ...props.no_desc,
    });
    expect(wrapper.vm.items).toStrictEqual(expectedData.no_desc.items);
  });

  it('Check items computed return no telephone data', () => {
    wrapper.setProps({
      ...props.no_telp,
    });
    expect(wrapper.vm.items).toStrictEqual(expectedData.no_telp.items);
  });
});
