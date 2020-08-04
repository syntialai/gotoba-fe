import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Timeline from '@/components/Partial/Timeline.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('Timeline.vue', () => {
  const today = {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  const expectedData = {
    location: {
      get: 'Danau Toba',
      set: 'Pulau Samosir',
    },
    date: new Date(
      today.year,
      today.month,
      today.date,
    ).toString(),
    getSavedTimeline: {
      if: [{
        time: '12:00 AM',
        destination: 'Danau Toba',
      }],
      else: [],
    },
    getTimeline: {
      if: [
        {
          time: '12:00 AM',
          destination: 'Danau Toba',
        }, {
          time: '12:00 PM',
          destination: 'Mikie',
        },
      ],
      else: [{
        time: '12:00 AM',
        destination: 'Danau Toba',
      }],
    },
    sortedTimeline: [
      {
        time: '12:00 AM',
        destination: 'Danau Toba',
      }, {
        time: '12:00 PM',
        destination: 'Mikie',
      },
    ],
    data: {
      date: new Date(
        today.year,
        today.month,
        today.date,
      ).toString(),
      schedule: [{
        destination: 'Danau Toba',
        time: '10:00 AM',
      }],
    },
  };
  const props = {
    timelines: [{
      date: new Date(
        today.year,
        today.month,
        today.date,
      ).toString(),
      schedule: [{
        time: '12:00 AM',
        destination: 'Danau Toba',
      }],
    }],
    add: true,
  };
  const data = {
    time: null,
    context: null,
  };

  let actions;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      setLocationKeyword: jest.fn(),
      addNewSchedule: jest.fn(),
      setLocationOpen: jest.fn(),
    };
    getters = {
      locationKeyword: () => 'Danau Toba',
      newSchedule: () => [{
        date: new Date(
          today.year,
          today.month,
          today.date,
        ).toString(),
        schedule: [{
          time: '12:00 PM',
          destination: 'Mikie',
        }],
      }],
      selectedDate: () => today,
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = shallowMount(Timeline, {
      data() {
        return {
          ...data,
        };
      },
      propsData: {
        ...props,
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check location computed getters to return vuex getters', () => {
    expect(wrapper.vm.location).toMatch(expectedData.location.get);
  });

  it('Check location computed setters to call actions', async () => {
    wrapper.vm.location = expectedData.location.set;
    await flushPromises();

    expect(actions.setLocationKeyword).toHaveBeenCalledTimes(1);
    expect(actions.setLocationKeyword.mock.calls[0][1])
      .toMatch(expectedData.location.set);
  });

  it('Check date computed to return today date in string', () => {
    expect(wrapper.vm.date).toMatch(expectedData.date);
  });

  it('Check getSavedTimeline to return today timeline saved in getters - filled', () => {
    expect(wrapper.vm.getSavedTimeline)
      .toStrictEqual(expectedData.getSavedTimeline.if);
  });

  it('Check getSavedTimeline to return today timeline saved in getters - empty', async () => {
    wrapper.setProps({
      timelines: [],
    });
    await flushPromises();

    expect(wrapper.vm.getSavedTimeline)
      .toStrictEqual(expectedData.getSavedTimeline.else);
  });

  it('Check getTimeline to return merged timeline - newSchedule filled', () => {
    expect(wrapper.vm.getTimeline)
      .toStrictEqual(expectedData.getTimeline.if);
  });

  it('Check getTimeline to return merged timeline - newSchedule empty', async () => {
    store.hotUpdate({
      getters: {
        newSchedule: () => [],
        selectedDate: () => today,
      },
    });
    await flushPromises();

    expect(wrapper.vm.getTimeline)
      .toStrictEqual(expectedData.getTimeline.else);
  });

  it('Check sortedTimeline to return sortedTimeline', () => {
    expect(wrapper.vm.sortedTimeline)
      .toStrictEqual(expectedData.sortedTimeline);
  });

  it('Check addSchedule method to call actions and change data', async () => {
    wrapper.setData({
      time: null,
      context: {
        formatted: '10:00 AM',
      },
    });
    await flushPromises();

    wrapper.vm.addSchedule();
    await flushPromises();

    expect(actions.addNewSchedule).toHaveBeenCalledTimes(1);
    expect(actions.addNewSchedule.mock.calls[0][1])
      .toStrictEqual(expectedData.data);

    expect(wrapper.vm.$data.time).toBeNull();
    expect(wrapper.vm.$data.context).toBeNull();

    expect(actions.setLocationKeyword).toHaveBeenCalledTimes(1);
    expect(actions.setLocationKeyword.mock.calls[0][1]).toMatch('');

    expect(actions.setLocationOpen).toHaveBeenCalledTimes(1);
    expect(actions.setLocationOpen.mock.calls[0][1]).toBe(true);
  });

  it('Check addSchedule method to not call actions and not change data', async () => {
    wrapper.setData({
      time: null,
      context: {
        formatted: null,
      },
    });
    await flushPromises();

    wrapper.vm.addSchedule();
    await flushPromises();

    expect(actions.addNewSchedule).not.toHaveBeenCalled();
  });

  it('Check onContext method to update data context', async () => {
    wrapper.vm.onContext('Konteks');
    await flushPromises();

    expect(wrapper.vm.$data.context).toMatch('Konteks');
  });
});
