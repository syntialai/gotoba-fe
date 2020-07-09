import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import SearchContent from '@/components/User/Search/SearchContent.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const $route = {
  path: '/search',
  query: {
    q: 'danau toba',
  },
};
const $router = { push: jest.fn() };

describe('SearchContent.vue', () => {
  const searchData = {
    keywords: ['danau toba'],
  };
  
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SearchContent, {
      propsData : { ...searchData },
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

  it('check searchItem method navigate to search by query to when called 1 times', async () => {
    wrapper.vm.searchItem(searchData.keywords[0]);

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith($route);
  });
});
