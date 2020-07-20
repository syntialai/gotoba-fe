import averageOfRatings from '@/utils/rating';

describe('rating.js', () => {
  it('Check averageOfRatings function to return Average of Ratings', () => {
    const rating = [10, 0, 0, 0, 100];
    const expectedData = 510/110;
    const actualData = averageOfRatings(rating);

    expect(actualData).toBe(expectedData);
  });
});