import { shallowMount } from '@vue/test-utils';
import CardHistory from '@/components/User/History/CardHistory.vue';

const $route = { path: '/history/pending' };

const $router = { push: jest.fn() };

describe('CardHistory.vue', () => {
  const expectedData = '/history/pending/ORD_0001_0001_0001';
  const history = {
    orderSku: 'ORD_0001_0001_0001',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardHistory, {
      mocks: {
        $route,
        $router,
      },
      propsData: {
        history: history,
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check openDetails method navigate to History Details when called', async () => {
    wrapper.vm.openDetails();

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedData);
  });
});
