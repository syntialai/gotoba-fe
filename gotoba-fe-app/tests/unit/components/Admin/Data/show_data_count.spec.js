import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import ShowDataCount from '@/components/Admin/Data/ShowDataCount.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('ShowDataCount.vue', () => {
  const expectedData = 50;
  const props = {
    perPage: 10,
  };
  const data = {
    selected: 50,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ShowDataCount, {
      propsData: { ...props },
      data() {
        return data;
      },
      localVue,
      stubs: [
        'update:perPage',
      ],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check updateQuantity method emit to update:perPage when called', async () => {
    // wrapper.setData({ ...data });

    wrapper.vm.updateSelected();
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()['update:perPage']).toBeTruthy();
    expect(wrapper.emitted()['update:perPage'].length).toBe(1);
    expect(wrapper.emitted()['update:perPage'][0][0]).toEqual(expectedData);
  });
});
