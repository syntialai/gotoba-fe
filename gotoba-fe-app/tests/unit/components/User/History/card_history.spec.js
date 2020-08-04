import { shallowMount } from '@vue/test-utils';
import { formatDate } from '@/utils/filter';
import CardHistory from '@/components/User/History/CardHistory.vue';

const $route = {
  path: '/history/pending',
};

jest.mock('@/utils/filter');
formatDate.mockImplementation(() => 'Friday, 31 Jul 2020');

describe('CardHistory.vue', () => {
  const expectedData = {
    goToDetails: '/history/details/ORD_0001_0001_0001',
    dateFormat: '31 Jul 2020',
  };
  const history = {
    history: [
      {
        orderSku: 'ORD_0001_0001_0001',
        id: 1,
      },
    ],
    date: '2020-07-31',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardHistory, {
      mocks: {
        $route,
      },
      propsData: {
        history,
      },
      stubs: ['router-link'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check date computed to return date from props', () => {
    expect(wrapper.vm.dateFormat).toMatch(expectedData.dateFormat);
  });

  it('Check goToDetails method navigate to History Details when called', () => {
    const goToDetails = wrapper.vm.goToDetails('ORD_0001_0001_0001');

    expect(goToDetails).toMatch(expectedData.goToDetails);
  });
});
