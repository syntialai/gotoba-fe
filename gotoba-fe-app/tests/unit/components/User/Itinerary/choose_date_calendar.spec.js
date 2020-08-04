import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import ChooseDateCalendar from '@/components/User/Itinerary/ChooseDateCalendar.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

Object.defineProperty(global, 'document', {});

describe('ChooseDateCalendar.vue', () => {
  const expectedData = {
    toDate: new Date(2020, 7, 31),
    dateSelected: {
      get: new Date(2020, 7, 31),
      set: new Date('2020-08-01'),
    },
    selectedDayOfMonth: 31,
    getDay: 'Friday',
    toMonthYear: 'July, 2020',
    isSelectedDate: {
      yes: true,
      no: false,
    },
  };
  const data = {
    showCalendar: false,
    selectedDate: {
      date: 31,
      month: 7,
      year: 2020,
    },
  };
  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      setSelectedDate: jest.fn(),
    };
    getters = {
      selectedDate: () => ({
        date: 31,
        month: 7,
        year: 2020,
      }),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
    wrapper = shallowMount(ChooseDateCalendar, {
      data() {
        return {
          showCalendar: data.showCalendar,
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

  it('Check scrollToDate to be called when mounted', () => {
    expect(wrapper.vm.scrollToDate).toHaveBeenCalledTimes(1);
  });

  it('Check toDate computed to return this days count of this month', () => {
    expect(wrapper.vm.toDate).toBe(expectedData.toDate);
  });

  it('Check toMonthYear computed to return month year of toDate', () => {
    expect(wrapper.vm.toMonthYear).toMatch(expectedData.toMonthYear);
  });

  it('Check selectedDayOfMonth computed to return this days count of this month', () => {
    expect(wrapper.vm.selectedDayOfMonth).toBe(expectedData.selectedDayOfMonth);
  });

  it('Check dateSelected computed getters to return this date of this month', () => {
    expect(wrapper.vm.dateSelected).toBe(expectedData.dateSelected.get);
  });

  it('Check dateSelected computed setters to return this date of this month', async () => {
    wrapper.vm.dateSelected = '2020-08-01';
    await flushPromises();

    expect(actions.setSelectedDate).toHaveBeenCalledTimes(1);
    expect(actions.setSelectedDate.mock.calls[0][1]).toBe(expectedData.dateSelected.set);

    expect(wrapper.vm.dateSelected).toBe(expectedData.dateSelected.set);
    expect(wrapper.vm.scrollToDate).toHaveBeenCalledTimes(1);
  });

  it('Check getDay method to return day of date params', () => {
    const getDay = wrapper.vm.getDay(2020, 7, 31);

    expect(getDay).toMatch(expectedData.getDay);
  });

  it('Check isSelectedDate method to return false when date params is not selectedDate', () => {
    const isSelectedDate = wrapper.vm.isSelectedDate(30);

    expect(isSelectedDate).toMatch(expectedData.isSelectedDate.no);
  });

  it('Check isSelectedDate method to return true when date params is selectedDate', () => {
    const isSelectedDate = wrapper.vm.isSelectedDate(31);

    expect(isSelectedDate).toMatch(expectedData.isSelectedDate.yes);
  });

  it('Check scrollToDate method to run scroll', () => {

  });
});
