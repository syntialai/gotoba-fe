import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Navigation from '@/components/Partial/Navigation.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('Navigation.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Navigation, {
      propsData: {
        title: 'Home',
      },
      localVue,
      stubs: [
        'b-icon',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check isTitleHome to return true when title props is Home', () => {
    expect(wrapper.vm.isTitleHome).toBe(true);
  });

  it('Check isTitleHome to return true when title props is Order List', async () => {
    wrapper.setProps({
      title: 'Order List',
    });
    await flushPromises();
    expect(wrapper.vm.isTitleHome).toBe(true);
  });

  it('Check isTitleHome to return false when title props is not Home or Order List', async () => {
    wrapper.setProps({
      title: 'Itinerary',
    });
    await flushPromises();
    expect(wrapper.vm.isTitleHome).toBe(false);
  });
});
