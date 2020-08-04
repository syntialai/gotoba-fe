import { shallowMount } from '@vue/test-utils';
import Admin from '@/views/Admin/Admin.vue';

describe('Admin.vue', () => {
  it('Check admin rendered', () => {
    const wrapper = shallowMount(Admin, {
      stubs: ['router-view'],
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
