/**
 * Preview Image function from input file
 *
 * @param {File} file
 * @returns Promise to get image in base64 format
 */
function previewImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
}

export default previewImage;
