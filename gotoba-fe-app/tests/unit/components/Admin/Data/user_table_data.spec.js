import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import api from '@/api/api';
import { alert } from '@/utils/tool';
import UserTableData from '@/components/Admin/Data/UserTableData.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock('@/api/api', () => ({
  ActivateUser: jest.fn(),
  BlockUser: jest.fn(),
}));
jest.mock('@/utils/tool');

describe('UserTableData.vue', () => {
  const expectedData = {
    getStatus: {
      if: 'blocked',
      else: 'active',
    },
    sku: 'USER_0001',
    res: {
      ok: {
        code: 200,
        status: 'OK',
      },
      error: {
        status: 404,
        error: 'Not Found',
      },
    },
  };
  const data = {
    status: {
      active: 'active',
      blocked: 'blocked',
    },
    sku: 'USER_0001',
    res: {
      ok: {
        code: 200,
        status: 'OK',
      },
      error: {
        status: 400,
        error: 'Bad Request',
      },
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UserTableData, {
      localVue,
      stubs: ['b-table'],
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check getStatus method to return \'blocked\' when param is \'active\'', () => {
    const getStatus = wrapper.vm.getStatus('active');

    expect(getStatus).toMatch(expectedData.getStatus.if);
  });

  it('Check getStatus method to return \'active\' when param is \'blocked\'', () => {
    const getStatus = wrapper.vm.getStatus('blocked');

    expect(getStatus).toMatch(expectedData.getStatus.else);
  });

  it('Check callAlert to show success alert when no error in res', () => {
    wrapper.vm.callAlert(data.res.ok);

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('changed user status', true);
  });

  it('Check callAlert to show success alert when no error in res', () => {
    wrapper.vm.callAlert(data.res.error);

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('change user status', false);
  });

  it('Check confirmModal method to call changeStatus when value is true', async () => {
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm')
      .mockResolvedValue(true);
    const statusInv = jest.spyOn(wrapper.vm, 'getStatus').mockReturnValue('blocked');

    wrapper.vm.confirmModal(data.status.active, data.sku);
    await flushPromises();

    expect(statusInv).toHaveBeenCalledTimes(1);
    expect(statusInv).toHaveBeenCalledWith(expectedData.getStatus.else);

    expect(bvModal).toHaveBeenCalledTimes(1);

    expect(wrapper.vm.changeStatus).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.changeStatus).toHaveBeenCalledWith(
      expectedData.getStatus.if,
      expectedData.sku,
    );
  });

  it('Check confirmModal method to not call changeStatus when value is false', async () => {
    const bvModal = jest.spyOn(wrapper.vm.$bvModal, 'msgBoxConfirm')
      .mockResolvedValue(false);
    const statusInv = jest.spyOn(wrapper.vm, 'getStatus').mockReturnValue('blocked');

    wrapper.vm.confirmModal(data.status.active, data.sku);
    await flushPromises();

    expect(statusInv).toHaveBeenCalledTimes(1);
    expect(statusInv).toHaveBeenCalledWith(expectedData.getStatus.else);

    expect(bvModal).toHaveBeenCalledTimes(1);

    expect(wrapper.vm.changeStatus).not.toHaveBeenCalled();
  });
});

describe('UserTableData.vue - changeStatus - BlockUser', () => {
  const expectedData = {
    getStatus: {
      if: 'blocked',
      else: 'active',
    },
    sku: 'USER_0001',
    res: {
      ok: {
        code: 200,
        status: 'OK',
      },
      error: {
        status: 404,
        error: 'Not Found',
      },
    },
  };
  const data = {
    status: {
      active: 'active',
      blocked: 'blocked',
    },
    sku: 'USER_0001',
    res: {
      ok: {
        code: 200,
        status: 'OK',
      },
      error: {
        status: 400,
        error: 'Bad Request',
      },
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UserTableData, {
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check changeStatus method to call BlockUser api and callAlert when status params is \'blocked\'', async () => {
    api.BlockUser.mockResolvedValue({
      ...data.res.ok,
    });
    wrapper.vm.changeStatus(data.status.blocked, data.sku);
    await flushPromises();

    expect(api.BlockUser).toHaveBeenCalledTimes(1);
    expect(api.BlockUser).toHaveBeenCalledWith(expectedData.sku);

    expect(wrapper.vm.callAlert).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.callAlert).toHaveBeenCalledWith(expectedData.res.ok);
  });

  it('Check changeStatus method to call BlockUser api and alert when status params is \'blocked\'', async () => {
    api.BlockUser.mockRejectedValue(new Error());
    wrapper.vm.changeStatus(data.status.blocked, data.sku);
    await flushPromises();

    expect(api.BlockUser).toHaveBeenCalledTimes(1);
    expect(api.BlockUser).toHaveBeenCalledWith(expectedData.sku);

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('change user status', false);
  });
});

describe('UserTableData.vue - changeStatus - ActivateUser', () => {
  const expectedData = {
    getStatus: {
      if: 'blocked',
      else: 'active',
    },
    sku: 'USER_0001',
    res: {
      ok: {
        code: 200,
        status: 'OK',
      },
      error: {
        status: 404,
        error: 'Not Found',
      },
    },
  };
  const data = {
    status: {
      active: 'active',
      blocked: 'blocked',
    },
    sku: 'USER_0001',
    res: {
      ok: {
        code: 200,
        status: 'OK',
      },
      error: {
        status: 400,
        error: 'Bad Request',
      },
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UserTableData, {
      localVue,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check changeStatus method to call ActivateUser api and callAlert when status params is \'active\'', async () => {
    api.ActivateUser.mockResolvedValue({
      ...data.res.ok,
    });
    wrapper.vm.changeStatus(data.status.active, data.sku);
    await flushPromises();

    expect(api.ActivateUser).toHaveBeenCalledTimes(1);
    expect(api.ActivateUser).toHaveBeenCalledWith(expectedData.sku);

    expect(wrapper.vm.callAlert).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.callAlert).toHaveBeenCalledWith(expectedData.res.ok);
  });

  it('Check changeStatus method to call ActivateUser api and alert when status params is \'blocked\'', async () => {
    api.ActivateUser.mockRejectedValue(new Error());
    wrapper.vm.changeStatus(data.status.active, data.sku);
    await flushPromises();

    expect(api.ActivateUser).toHaveBeenCalledTimes(1);
    expect(api.ActivateUser).toHaveBeenCalledWith(expectedData.sku);

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('change user status', false);
  });
});
