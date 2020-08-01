import { shallowMount } from '@vue/test-utils';
import CardHistoryGroup from '@/components/User/History/CardHistoryGroup.vue';

describe('CardHistoryGroup.vue', () => {
  const expectedData = {
    historyByDate: {
      '2020-07-31': [
        {
          createdAt: '2020-07-31T00:00:00.000Z',
          orderSku: 'ORD_0001_0001_0001',
          id: 1,
        },
      ],
    },
  };
  const histories = [
    {
      createdAt: '2020-07-31T00:00:00.000Z',
      orderSku: 'ORD_0001_0001_0001',
      id: 1,
    },
  ];
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardHistoryGroup, {
      propsData: {
        histories,
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check historyByDate computed to return history of date from props', () => {
    expect(wrapper.vm.historyByDate).toStrictEqual(expectedData.historyByDate);
  });
});
