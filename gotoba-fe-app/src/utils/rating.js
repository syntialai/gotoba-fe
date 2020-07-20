/**
 * Get Average of Array of Ratings Function
 *
 * @param {Array} rating
 * @returns Average of Ratings
 */
const averageOfRatings = (rating) => {
  let sumOfRates = 0;
  let sumOfReviewers = 0;

  rating.forEach((value, index) => {
    sumOfRates += value * (index + 1);
    sumOfReviewers += value;
  });

  return sumOfRates / sumOfReviewers;
};

export default averageOfRatings;
