import { shallowMount } from '@vue/test-utils';
import CardHistory from '@/components/User/History/CardHistory.vue';

const $route = {
  path: '/history/pending'
};

describe('CardHistory.vue', () => {
  const expectedData = {
    goToDetails: '/history/pending/ORD_0001_0001_0001',
    key: '2020-07-25',
    date: 'Saturday, 25 Jul 2020',
  };
  const history = {
    '2020-07-25': [
      {
        orderSku: 'ORD_0001_0001_0001',
        id: 1,
      }
    ],
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardHistory, {
      mocks: {
        $route,
      },
      propsData: {
        history: history,
      },
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check key computed to return first key of object', () => {
    expect(wrapper.vm.key).toMatch(expectedData.key);
  });

  it('Check date computed to return date from props', () => {
    expect(wrapper.vm.date).toMatch(expectedData.date);
  });

  it('Check goToDetails method navigate to History Details when called', () => {
    const goToDetails = wrapper.vm.goToDetails('ORD_0001_0001_0001');

    expect(goToDetails).toMatch(expectedData.goToDetails);
  });
});
