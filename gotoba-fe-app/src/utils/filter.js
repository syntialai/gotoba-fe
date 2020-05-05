import { months, days } from './date';

/**
 * Format Rupiah price function
 *
 * @param {String} price
 * @param {Bool} comma
 * @param {Bool} idr
 * @returns Price in Rupiah Format
 */
export const formatPrice = (price, comma = false, idr = false) => {
  const formattedPrice = (idr ? 'Rp' : '')
                  + new Intl.NumberFormat('id').format(parseInt(price, 10))
                  + (comma ? '.00' : '');
  return formattedPrice;
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

/**
 * Format String function
 *
 * @param {String} sentence
 * @returns String of Capitalized sentence
 */
export const toCapitalize = (sentence) => {
  const capitalized = sentence
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return capitalized;
};
