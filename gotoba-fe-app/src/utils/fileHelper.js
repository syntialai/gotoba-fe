import index from '../store/index';

/**
 * Preview Image procedure from input file
 *
 * @param {File} file
 * @returns image in base64 format
 */
function previewImage(file) {
  const reader = new FileReader();

  reader.onload = (e) => {
    index.dispatch('setImagePreview', e.target.result);
  };

  reader.readAsDataURL(file);
}

export default previewImage;
