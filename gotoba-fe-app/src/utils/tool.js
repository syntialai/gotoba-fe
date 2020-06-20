/**
 * Create Confirm Modal
 *
 * @param {String} object
 * @returns Value of Modal
 */
export const confirmModal = (object) => {
  this.$bvModal.msgBoxConfirm(`${object} will be removed permanently from this system.`, {
    title: 'Are you sure?',
    size: 'sm',
    okVariant: 'danger',
    okTitle: 'YES',
    cancelVariant: 'outline-secondary',
    cancelTitle: 'NO',
    footerClass: 'p-2',
    hideHeaderClose: false,
    centered: true,
  })
    .then((value) => value)
    .catch(
      (err) => console.log(err),
    );
};

/**
 * Request Web to Full Screen
 */
export function requestFullScreen() {
  const elem = this.$refs.wrapper;

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
