import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import ItineraryPlan from '@/components/User/Itinerary/ItineraryPlan.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('ItineraryPlan.vue', () => {
  const expectedData = {
    todayTimeline: {
      date: 'Fri Jul 31 2020 00:00:00 GMT+0700 (Indochina Time)',
    },
  };
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      selectedDate: () => ({
        date: 31,
        month: 6,
        year: 2020,
      }),
      schedule: () => [
        { date: 'Fri Jul 31 2020 00:00:00 GMT+0700 (Indochina Time)' },
        { date: 'Sat Aug 01 2020 00:00:00 GMT+0700 (Indochina Time)' },
      ],
    };
    store = new Vuex.Store({
      getters,
    });
    wrapper = shallowMount(ItineraryPlan, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check todayTimeline computed to return today schedule getters', () => {
    expect(wrapper.vm.todayTimeline).toStrictEqual(expectedData.todayTimeline);
  });
});
