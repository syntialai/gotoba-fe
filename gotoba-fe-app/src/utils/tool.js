import index from '../store/index';

/**
 * Show Alert
 *
 * @param {String} message
 * @param {Boolean} success
 */
export function setAlert(message, success) {
  index.dispatch('setShowAlert', true);
  index.dispatch('setAlertSuccess', success);
  index.dispatch('setAlertMessage', message);
}

/**
 * Show Toast
 *
 * @param {String} message
 */
export function toast(message) {
  index.dispatch('setShowToast', true);
  index.dispatch('setToastMessage', message);
}
