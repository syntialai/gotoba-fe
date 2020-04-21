/**
 * Format Rupiah price function
 * 
 * @param {String} price
 * @param {Bool} comma
 * @param {Bool} idr
 * @returns Price in Rupiah Format
 */
export const formatPrice = (price, comma = false, idr = false) => {
  return (idr? 'Rp' : '') +
    new Intl.NumberFormat('id').format(parseInt(price)) +
    (comma? '.00' : '');
};

/**
 * Format Date function
 * 
 * @param {Date} currentDate
 * @returns Date in custom format
 */

export const formatDate = (currentDate) => {
  const day = currentDate.getDay();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return `${days[day]}, ${date} ${months[month].substr(0,3)} ${year}`;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
