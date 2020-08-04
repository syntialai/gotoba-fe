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
                  + (new Intl.NumberFormat('id').format(price)).replace(/,/gi, '.')
                  + (comma ? ',00' : '');
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
 * Check a Date object is today function
 *
 * @param {Date} date
 * @returns true or false
 */
export const isToday = (date) => {
  const today = new Date();

  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
};

/**
 * Check a Date object is passed function
 *
 * @param {Date} date
 * @returns true or false
 */
export const isPassed = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date < today;
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

/**
 * Get time from string time
 */
export const getTime = (timeStr) => {
  const amPm = timeStr.split(' ').pop();
  const time = timeStr.split(':');
  let hour = parseInt(time[0], 10);
  if (amPm === 'PM') {
    hour += 12;
  }
  const minutes = parseInt(time[1].slice(0, 2), 10);
  return [hour, minutes];
};

/**
 * Sort by Time Function
 */
export const sortTime = (list) => list.sort((a, b) => {
  const bTime = getTime(b.time);
  const bDate = new Date(0, 0, 0, bTime[0], bTime[1], 0);

  const aTime = getTime(a.time);
  const aDate = new Date(0, 0, 0, aTime[0], aTime[1], 0);

  return aDate.getTime() - bDate.getTime();
});

/**
 * Sort by Date Function
 */
export const sortDate = (list, params = 'date') => list.sort((a, b) => {
  const aDate = new Date(a[params]);
  const bDate = new Date(b[params]);
  return aDate - bDate;
});
