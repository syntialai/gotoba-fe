/**
 * Get Validation State Function for Validate Input Field in a Form
 *
 * @param {Object} Object
 * @returns state is input field valid
 */
function getValidationState({ error, validated, valid = null }) {
  return error || validated ? valid : null;
}

export default getValidationState;
