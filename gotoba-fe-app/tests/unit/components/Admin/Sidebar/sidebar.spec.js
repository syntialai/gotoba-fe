import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Sidebar from '@/components/Admin/Sidebar/Sidebar.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Sidebar.vue', () => {
  const expectedData = {
    min: {
      minimized: true,
      pictSize: 40,
    },
    max: {
      minimized: false,
      pictSize: 80,
    },
  };
  const sidebarData = {
    minimized: true,
    pictSize: 40,
    menus: [
      {
        icon: 'tachometer-alt',
        title: 'Dashboard',
        link: '/admin/dashboard',
      },
      {
        icon: 'users',
        title: 'User',
        link: '/admin/user',
      },
      {
        icon: 'store',
        title: 'Merchant',
        link: '/admin/merchant',
      },
      {
        icon: 'image',
        title: 'Gallery',
        link: '/admin/gallery',
      },
      {
        icon: 'route',
        title: 'Itinerary',
        link: '/admin/itinerary',
      },
      {
        icon: 'utensils',
        title: 'Restaurant',
        link: '/admin/restaurant',
      },
      {
        icon: 'user-cog',
        title: 'Settings',
        link: '/admin/settings',
      },
    ],
  };
  
  let wrapper;
  let setPictSize;

  beforeEach(() => {
    wrapper = mount(Sidebar, {
      localVue,
      data() { 
        return { ...sidebarData };
      },
      stubs: [
        'font-awesome-icon',
        'router-link',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('check setPictSize method change minimized and pictSize data when called 1 times', async () => {
    setPictSize = jest.spyOn(wrapper.vm, 'setPictSize');

    wrapper.vm.setPictSize();

    expect(setPictSize).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$data.pictSize).toBe(expectedData.max.pictSize);
    expect(wrapper.vm.$data.minimized).toBe(expectedData.max.minimized);
  });

  it('check setPictSize method change back minimized and pictSize data called 2 times', async () => {
    setPictSize = jest.spyOn(wrapper.vm, 'setPictSize');

    wrapper.vm.setPictSize();
    wrapper.vm.setPictSize();

    expect(setPictSize).toHaveBeenCalledTimes(2);
    expect(wrapper.vm.$data.pictSize).toBe(expectedData.min.pictSize);
    expect(wrapper.vm.$data.minimized).toBe(expectedData.min.minimized);
  });
});
