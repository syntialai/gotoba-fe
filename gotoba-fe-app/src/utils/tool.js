import index from '../store/index';

/**
 * Show Alert
 *
 * @param {String} message
 * @param {Boolean} success
 */
export function alert(message, success) {
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

/**
 * Request Web to Full Screen
 */
export function requestFullScreen(refs) {
  const elem = refs.wrapper;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/**
 * Request Web to Exit Full Screen
 */
export function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}
