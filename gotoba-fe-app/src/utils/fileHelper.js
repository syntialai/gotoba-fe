/**
 * Preview Image procedure from input file
 *
 * @param {File} file
 */
function previewImage(file) {
  // const files = event.target.files || event.dataTransfer.files;
  if (!file.length) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    this.image = e.target.result;
  };

  reader.readAsDataURL(file);
}

export default previewImage;
