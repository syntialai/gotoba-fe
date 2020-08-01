import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import { toFullDay } from '@/utils/filter';
import ThisWeekCalendar from '@/components/User/Itinerary/ThisWeekCalendar.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

function generateDays(index) {
  const today = new Date();
  const week = [];

  for (let i = 0; i < 7; i += 1) {
    week.push({
      day: toFullDay(today.getDay() % 7).substr(0, 2),
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      active: i === index,
    });
    today.setDate(today.getDate() + 1);
  }

  return week;
}

describe('ThisWeekCalendar.vue', () => {
  const days = jest.fn();
  const data = {
    week: [],
  };
  let actions;
  let store;
  // eslint-disable-next-line no-unused-vars
  let wrapper;

  beforeEach(() => {
    actions = {
      setSelectedDate: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
    wrapper = shallowMount(ThisWeekCalendar, {
      data() {
        return {
          ...data,
        };
      },
      methods: {
        days,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check days method to be called when created', () => {
    expect(days).toHaveBeenCalledTimes(1);
  });
});

describe('ThisWeekCalendar.vue', () => {
  const expectedData = {
    week: generateDays(0),
    week2: generateDays(1),
  };
  const selectedDate = new Date(
    expectedData.week2[1].year,
    expectedData.week2[1].month,
    expectedData.week2[1].date,
  );
  const data = {
    week: [],
  };
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      setSelectedDate: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
    wrapper = shallowMount(ThisWeekCalendar, {
      data() {
        return {
          ...data,
        };
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check days method to change week data', async () => {
    wrapper.vm.days();
    await flushPromises();

    expect(wrapper.vm.$data.week).toStrictEqual(expectedData.week);
  });

  it('Check setActive method to call actions', () => {
    wrapper.vm.setActive(expectedData.week[1]);

    expect(wrapper.vm.$data.week).toStrictEqual(expectedData.week2);

    expect(actions.setSelectedDate).toHaveBeenCalledTimes(1);
    expect(actions.setSelectedDate.mock.calls[0][1]).toStrictEqual(selectedDate);
  });
});
