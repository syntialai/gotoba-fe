import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Breadcrumb from '@/components/Admin/Breadcrumb/Breadcrumb.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const $route = {
  path: '/admin/dashboard',
};

describe('Breadcrumb.vue', () => {
  const expectedData = [
    {
      text: 'Admin',
      to: '/admin',
    },
    {
      text: 'Dashboard',
      active: true,
    }
  ];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Breadcrumb, {
      mocks: {
        $route,
      },
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check breadcrumbs computed return array items from route path', () => {
    expect(wrapper.vm.breadcrumbs).toStrictEqual(expectedData);
  });
});
