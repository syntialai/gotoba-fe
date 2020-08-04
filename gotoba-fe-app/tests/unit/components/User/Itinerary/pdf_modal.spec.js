import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
// eslint-disable-next-line no-unused-vars
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// eslint-disable-next-line no-unused-vars
import { formatDate, sortTime, sortDate } from '@/utils/filter';
import PdfModal from '@/components/User/Itinerary/PdfModal.vue';
import flushPromises from 'flush-promises';

// jest.mock('jspdf');
// jest.mock('jspdf-autotable');
jest.mock('@/utils/filter', () => ({
  formatDate: jest.fn(),
  sortTime: jest.fn(),
  sortDate: jest.fn().mockImplementation(() => [{
    date: new Date(2020, 12, 10).toString(),
    schedule: [{
      time: '12:00 AM',
      destination: 'Danau Toba',
    }, {
      time: '09:00 AM',
      destination: 'Danau Toba',
    }],
  }, {
    date: new Date(2020, 12, 12).toString(),
    schedule: [{
      time: '12:00 AM',
      destination: 'Danau Toba',
    }, {
      time: '09:00 AM',
      destination: 'Danau Toba',
    }],
  }]),
}));

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe('PdfModal.vue', () => {
  const expectedData = {
    maxDate: {
      if: new Date(new Date(2020, 12, 12).toString()),
      else: new Date(),
    },
    schedule: [{
      date: new Date(2020, 12, 12).toString(),
      schedule: [{
        time: '12:00 AM',
        destination: 'Danau Toba',
      }, {
        time: '09:00 AM',
        destination: 'Danau Toba',
      }],
    }, {
      date: new Date(2020, 12, 10).toString(),
      schedule: [{
        time: '12:00 AM',
        destination: 'Danau Toba',
      }, {
        time: '09:00 AM',
        destination: 'Danau Toba',
      }],
    }],
    sortedSchedule: [{
      date: new Date(2020, 12, 10).toString(),
      schedule: [{
        time: '12:00 AM',
        destination: 'Danau Toba',
      }, {
        time: '09:00 AM',
        destination: 'Danau Toba',
      }],
    }, {
      date: new Date(2020, 12, 12).toString(),
      schedule: [{
        time: '12:00 AM',
        destination: 'Danau Toba',
      }, {
        time: '09:00 AM',
        destination: 'Danau Toba',
      }],
    }],
  };
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      schedule: () => [{
        date: new Date(2020, 12, 12).toString(),
        schedule: [{
          time: '12:00 AM',
          destination: 'Danau Toba',
        }, {
          time: '09:00 AM',
          destination: 'Danau Toba',
        }],
      }, {
        date: new Date(2020, 12, 10).toString(),
        schedule: [{
          time: '12:00 AM',
          destination: 'Danau Toba',
        }, {
          time: '09:00 AM',
          destination: 'Danau Toba',
        }],
      }],
    };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(PdfModal, {
      data() {
        return {
          begin: {
            date: '',
            min: new Date(),
          },
          end: {
            date: '',
            min: new Date(),
          },
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

  it('Check maxDate computed to return maxDate case #1', () => {
    expect(wrapper.vm.maxDate).toStrictEqual(expectedData.maxDate.if);
  });

  it('Check maxDate computed to return maxDate case #2', async () => {
    store.hotUpdate({
      getters: {
        schedule: () => [],
      },
    });
    await flushPromises();

    expect(wrapper.vm.maxDate.getDate())
      .toStrictEqual(expectedData.maxDate.else.getDate());
    expect(wrapper.vm.maxDate.getMonth())
      .toStrictEqual(expectedData.maxDate.else.getMonth());
    expect(wrapper.vm.maxDate.getFullYear())
      .toStrictEqual(expectedData.maxDate.else.getFullYear());
  });

  it('Check sortedSchedule to return sorted getters', () => {
    expect(wrapper.vm.sortedSchedule).toStrictEqual(expectedData.sortedSchedule);
  });

  it('Check sortedSchedule to return []', async () => {
    store.hotUpdate({
      getters: {
        schedule: () => [],
      },
    });
    await flushPromises();

    expect(wrapper.vm.sortedSchedule).toStrictEqual([]);
  });

  it('Check getItinerary method to not call exportPdf method case #1', () => {
    const exportPdf = jest.spyOn(wrapper.vm, 'exportPdf');
    wrapper.vm.getItinerary();

    expect(exportPdf).not.toHaveBeenCalled();
  });

  it('Check getItinerary method to not call exportPdf method case #1 - begin date is filled',
    async () => {
      wrapper.setData({
        begin: {
          date: '2020-12-10',
          min: new Date(),
        },
        end: {
          date: '',
          min: new Date(),
        },
      });
      await flushPromises();

      const exportPdf = jest.spyOn(wrapper.vm, 'exportPdf').mockReturnValue(null);
      wrapper.vm.getItinerary();

      expect(exportPdf).not.toHaveBeenCalled();
    });

  it('Check getItinerary method called exportPdf when begin.date is bigger than end.date',
    async () => {
      wrapper.setData({
        begin: {
          date: '2020-12-12',
          min: new Date(),
        },
        end: {
          date: '2020-12-10',
          min: new Date(),
        },
      });
      await flushPromises();

      const exportPdf = jest.spyOn(wrapper.vm, 'exportPdf').mockReturnValue(null);
      wrapper.vm.getItinerary();

      expect(exportPdf).toHaveBeenCalledTimes(1);
      expect(exportPdf).toHaveBeenCalledWith('2020-12-10', '2020-12-12');
    });

  it('Check getItinerary method called exportPdf',
    async () => {
      wrapper.setData({
        begin: {
          date: '2020-12-10',
          min: new Date(),
        },
        end: {
          date: '2020-12-12',
          min: new Date(),
        },
      });
      await flushPromises();

      const exportPdf = jest.spyOn(wrapper.vm, 'exportPdf').mockReturnValue(null);
      wrapper.vm.getItinerary();

      expect(exportPdf).toHaveBeenCalledTimes(1);
      expect(exportPdf).toHaveBeenCalledWith('2020-12-10', '2020-12-12');
    });

  it('Check exportPdf method to success generate pdf', () => {
    wrapper.vm.exportPdf('2020-12-10', '2020-12-12');
  });
});
