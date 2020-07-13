import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import NavigationBack from '@/components/Partial/NavigationBack.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const $router = { go: jest.fn() };

describe('NotFound.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NavigationBack, {
      mocks: {
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

  it('Check goBack method navigate to page before when BACK nav-item clicked', async () => {
    expect(wrapper.find('.nav')).toBeTruthy();
    expect(wrapper.find('.nav-link')).toBeTruthy();

    wrapper.find('.nav-link').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$router.go).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.go).toHaveBeenCalledWith(-1);
  });
});
