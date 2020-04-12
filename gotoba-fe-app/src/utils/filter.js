/**
 * Format Rupiah price function
 * 
 * @param {String} price
 * @param {Bool} comma
 * @param {Bool} idr
 * @returns 
 */
export const formatPrice = (price, comma = false, idr = false) => {
  return (idr? 'Rp' : '') +
    new Intl.NumberFormat('id').format(parseInt(price)) +
    (comma? '.00' : '');
};
