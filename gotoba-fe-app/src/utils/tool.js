/**
 * Create Confirm Modal
 *
 * @param {String} object
 * @returns Value of Modal
 */
const confirmModal = (object) => {
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

export default confirmModal;
