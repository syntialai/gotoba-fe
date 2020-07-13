import { createLocalVue, shallowMount } from '@vue/test-utils';
import MenuInfo from '@/components/Admin/MenuInfo/MenuInfo.vue';

const $route = { path: '/admin/dashboard' };

const $router = { push: jest.fn() };

describe('MenuInfo.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MenuInfo, {
      mocks: {
        $route,
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check menu computed get path name', async () => {
    // const spy = jest.spyOn(wrapper.vm, 'menu');

    // await wrapper.vm.$nextTick();

    // expect(spy).toHaveBeenCalledTimes(1);
    const name = 'dashboard';
    expect(wrapper.vm.menu).toMatch(name);
  });
});
