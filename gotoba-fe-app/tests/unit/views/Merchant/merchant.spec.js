import { shallowMount } from '@vue/test-utils';
import Merchant from '@/views/Merchant/Merchant.vue';

const $route = {
  path: '/merchant/order-list',
  name: 'Order List',
};

describe('Merchant.vue', () => {
  const data = [
    {
      id: 1, name: 'Order List', icon: 'clipboard-list', link: '/merchant/order-list',
    },
    {
      id: 2, name: 'My Bistro', icon: 'utensils', link: '/merchant/bistro',
    },
    {
      id: 3, name: 'Scan', icon: 'qrcode', link: '/merchant/scan',
    },
    {
      id: 4, name: 'My Spot', icon: 'route', link: '/merchant/spot',
    },
    {
      id: 5, name: 'Profile', icon: 'user', link: '/merchant/profile',
    },
  ];
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Merchant, {
      mocks: {
        $route,
      },
      data() {
        return {
          navItems: data,
        };
      },
      stubs: ['router-view'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('Check currentRouteName computed to return route name', () => {
    expect(wrapper.vm.currentRouteName).toMatch($route.name);
  });
});
