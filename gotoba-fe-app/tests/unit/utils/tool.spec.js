import index from '@/store/index';
import * as tool from '@/utils/tool';

describe('tool.js: alert', () => {
  beforeEach(() => {
    jest.mock('@/store/index', () => ({
      dispatch: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check alert method to call store', () => {
    const spyOnDispatch = jest.spyOn(index, 'dispatch');
    tool.alert('Alert message', true);

    expect(spyOnDispatch).toHaveBeenCalledTimes(3);
  });
});

describe('tool.js: toast', () => {
  beforeEach(() => {
    jest.mock('@/store/index', () => ({
      dispatch: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Check toast method to call store', () => {
    const spyOnDispatch = jest.spyOn(index, 'dispatch');
    tool.toast('Toast message');

    expect(spyOnDispatch).toHaveBeenCalledTimes(2);
  });
});
