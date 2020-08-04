import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import BootstrapVue from 'bootstrap-vue';
import Pagination from '@/components/Partial/Pagination.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Pagination.vue', () => {
  const expectedData = 2;
  const item = {
    currentPage: 1,
    rows: 10,
    idControls: 'id-control',
  };
  const data = {
    currPage: 2,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Pagination, {
      propsData: { ...item },
      data() {
        return data;
      },
      localVue,
      stubs: [
        'update:currentPage',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check updateCurrentPage method emit to update:currentPage when called', async () => {
    wrapper.vm.updateCurrentPage();
    await flushPromises();

    expect(wrapper.emitted()['update:currentPage']).toBeTruthy();
    expect(wrapper.emitted()['update:currentPage'].length).toBe(1);
    expect(wrapper.emitted()['update:currentPage'][0][0]).toEqual(expectedData);
  });
});
