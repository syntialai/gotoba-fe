import getLocation from '@/utils/location';

describe('location.js', () => {
  it('Check getLocation Procedure to call params if true', () => {
    const successCallback = jest.fn();
    const errCallback = jest.fn();

    const mockGeoLocation = {
      getCurrentPosition: jest.fn(),
    };
    global.navigator.geolocation = mockGeoLocation;

    getLocation(successCallback, errCallback);

    expect(mockGeoLocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    expect(mockGeoLocation.getCurrentPosition).toHaveBeenCalledWith(successCallback, errCallback);
  });
});