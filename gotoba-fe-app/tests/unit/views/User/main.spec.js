import { shallowMount } from '@vue/test-utils';
import Main from '@/views/User/Main.vue';

const $route = {
  path: '/',
  name: 'Home',
};

describe('Main.vue', () => {
  const data = [
    {
      id: 1, name: 'Home', icon: 'home', link: '/',
    },
    {
      id: 2, name: 'Itinerary', icon: 'route', link: '/itinerary',
    },
    {
      id: 3, name: 'My tickets', icon: 'qrcode', link: '/my-tickets',
    },
    {
      id: 4, name: 'Cart', icon: 'shopping-cart', link: '/cart',
    },
    {
      id: 5, name: 'Profile', icon: 'user', link: '/profile',
    },
  ];
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Main, {
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
