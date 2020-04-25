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

/**
 * Format Rupiah price function
 *
 * @param {String} price
 * @param {Bool} comma
 * @param {Bool} idr
 * @returns Price in Rupiah Format
 */
export const formatPrice = (price, comma = false, idr = false) => {
  const rupiahFormat = idr ? 'Rp' : '';
  const priceFormatted = new Intl.NumberFormat('id').format(price);
  const commaFormat = comma ? '.00' : '';

  return rupiahFormat + priceFormatted + commaFormat;
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

  return `${days[day]}, ${date} ${months[month].substr(0, 3)} ${year}`;
};

/**
 * Month in Number Format to Full Format
 *
 * @param {Number} month
 * @returns String of Month
 */
export const toFullMonth = (month) => months[month];

/**
 * Day in Number Format to Full Format
 *
 * @param {Number} day
 * @returns String of Day
 */
export const toFullDay = (day) => days[day];
