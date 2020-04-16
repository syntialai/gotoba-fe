/**
 * Get Average of Array of Ratings Function
 * 
 * @param {Array} rating
 * @returns Average of Ratings
 */
export const averageOfRatings = (rating) => {
  let sumOfRates = 0;
  let sumOfReviewers = 0;

  rating.forEach((value, index, array) => {
    sumOfRates += value * (index + 1);
    sumOfReviewers += value;
  })

  return sumOfRates / sumOfReviewers;
};
