import api from '@/api/api';
import * as Types from '@/store/types';
import schedule from '@/store/modules/schedule';

jest.mock('@/api/api', () => ({
  GetTravellingSchedule: jest.fn(),
}));

const store = schedule;

describe('Schedule modules', () => {
  const data = {
    state: {
      newSchedule: [],
      schedule: [],
      selectedDate: {
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
    },
    getters: {
      newSchedule: [{
        date: '2020-12-12',
        schedule: [{
          time: '12:00 AM',
          destination: 'Danau Toba',
        }],
      }],
      schedule: [{
        date: '2020-12-12',
        schedule: [{
          time: '12:00 AM',
          destination: 'Danau Toba',
        }],
      }, {
        date: '2020-12-13',
        schedule: [{
          time: '12:00 AM',
          destination: 'Danau Toba',
        }],
      }],
      selectedDate: {
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
    },
    date: new Date(),
    userSku: 'USER_0001',
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.schedule(state)).toStrictEqual(state.schedule);
    expect(store.getters.newSchedule(state)).toStrictEqual(state.newSchedule);
    expect(store.getters.selectedDate(state)).toStrictEqual(state.selectedDate);
  });

  it('Mutations', async () => {
    let state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_SCHEDULE](state, res.schedule);
    expect(state.schedule).toStrictEqual(res.schedule);

    store.mutations[Types.SET_NEW_SCHEDULE](state, res.newSchedule[0]);
    expect(state.newSchedule).toStrictEqual(res.newSchedule);

    store.mutations[Types.SET_SELECTED_DATE](state, data.date);
    expect(state.selectedDate).toStrictEqual(res.selectedDate);

    state = {
      newSchedule: [{
        date: '2020-12-12',
        schedule: [],
      }],
    };

    store.mutations[Types.SET_NEW_SCHEDULE_DETAIL](state, ({
      schedule: res.newSchedule[0].schedule[0],
      index: 0,
    }));
    expect(state.newSchedule).toStrictEqual(res.newSchedule);

    store.mutations[Types.CLEAR_NEW_SCHEDULE](state);
    expect(state.newSchedule).toStrictEqual([]);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getSchedule - success', async () => {
      api.GetTravellingSchedule.mockResolvedValue({
        data: data.getters.schedule,
      });

      await store.actions.getSchedule({ commit }, data.userSku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_SCHEDULE,
        data.getters.schedule,
      );
    });

    it('getSchedule - error promise', async () => {
      api.GetTravellingSchedule.mockResolvedValue({
        status: 404,
        error: 'Not Found',
      });

      await store.actions.getSchedule({ commit }, data.userSku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getSchedule - error', async () => {
      api.GetTravellingSchedule.mockRejectedValue(new Error());

      await store.actions.getSchedule({ commit }, data.userSku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('clearNewSchedule', () => {
      store.actions.clearNewSchedule({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.CLEAR_NEW_SCHEDULE,
      );
    });

    it('addNewSchedule - index is -1', () => {
      const state = {
        newSchedule: [],
      };
      store.actions.addNewSchedule({ commit, state }, data.getters.newSchedule);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_NEW_SCHEDULE,
        data.getters.newSchedule,
      );
    });

    it('addNewSchedule - index is 0', () => {
      const state = {
        newSchedule: data.getters.newSchedule,
      };
      store.actions.addNewSchedule({ commit, state }, {
        date: '2020-12-12',
        schedule: [{
          time: '06.00 PM',
          destination: 'Pantai',
        }],
      });

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_NEW_SCHEDULE_DETAIL,
        {
          schedule: [{
            time: '06.00 PM',
            destination: 'Pantai',
          }],
          index: 0,
        },
      );
    });

    it('setSelectedDate', () => {
      store.actions.setSelectedDate({ commit }, data.date);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_SELECTED_DATE,
        data.date,
      );
    });
  });
});
