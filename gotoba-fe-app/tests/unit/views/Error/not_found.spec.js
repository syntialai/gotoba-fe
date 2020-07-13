import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import NotFound from '@/views/Error/NotFound.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const $route = '/';

const $router = { push: jest.fn() };

describe('NotFound.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NotFound, {
      mocks: {
        $route,
        $router,
      },
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check home method navigate to Home when called', async () => {
    wrapper.vm.home();

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route);
  });
});
