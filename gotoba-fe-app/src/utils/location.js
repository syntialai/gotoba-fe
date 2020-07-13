/**
 * Get current location Procedure
 *
 * @param {Function} successCallback
 * @param {Function} errCallback
 */
const getLocation = (successCallback, errCallback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errCallback);
  }
};

export default getLocation;
