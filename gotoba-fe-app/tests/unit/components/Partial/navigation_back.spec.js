import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import NavigationBack from '@/components/Partial/NavigationBack.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const $route = {
  name: 'Restaurant',
};
const $router = { go: jest.fn() };

describe('NavigationBack.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NavigationBack, {
      mocks: {
        $route,
        $router,
      },
      localVue,
      stubs: [
        'font-awesome-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check currentRouteName computed to return route name', () => {
    expect(wrapper.vm.currentRouteName).toMatch($route.name);
  });

  it('Check goBack method navigate to page before', () => {
    wrapper.vm.goBack();

    expect(wrapper.vm.$router.go).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.go).toHaveBeenCalledWith(-1);
  });
});
