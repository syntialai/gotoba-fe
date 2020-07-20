import * as filter from '@/utils/filter';

let expectedData;
let actualData;

describe('filter.js : formatPrice', () => {
  it('Check function to return formatted price without comma and Rp', () => {
    expectedData = '10.000.000';
    actualData = filter.formatPrice('10000000');

    expect(actualData).toMatch(expectedData);
  });

  it('Check function to return formatted price with comma and without Rp', () => {
    expectedData = '10.000.000,00';
    actualData = filter.formatPrice('10000000', true);

    expect(actualData).toMatch(expectedData);
  });

  it('Check function to return formatted price with comma and Rp', () => {
    expectedData = 'Rp10.000.000,00';
    actualData = filter.formatPrice('10000000', true, true);

    expect(actualData).toMatch(expectedData);
  });
});

describe('filter.js : formatDate', () => {
  it('Check function to return date in custom format', () => {
    expectedData = 'Friday, 17 Jul 2020';
    actualData = filter.formatDate(new Date(2020, 6, 17));

    expect(actualData).toMatch(expectedData);
  });
});

describe('filter.js : isToday', () => {
  it('Check function to return true if param is today', () => {
    expectedData = true;
    actualData = filter.isToday(new Date());

    expect(actualData).toBe(expectedData);
  });

  it('Check function to return false if param isn\'t today', () => {
    expectedData = false;
    actualData = filter.isToday(new Date(2020, 5, 17));

    expect(actualData).toBe(expectedData);
  });
});

describe('filter.js : isPassed', () => {
  it('Check function to return true if param is passed', () => {
    expectedData = true;
    actualData = filter.isPassed(new Date(2020, 2, 28));

    expect(actualData).toBe(expectedData);
  });

  it('Check function to return false if param is today or future', () => {
    expectedData = false;
    actualData = filter.isPassed(new Date());

    expect(actualData).toBe(expectedData);
  });
});

describe('filter.js : toFullMonth', () => {
  it('Check function to return month name', () => {
    expectedData = 'March';
    actualData = filter.toFullMonth(2);

    expect(actualData).toMatch(expectedData);
  });
});

describe('filter.js : toFullDay', () => {
  it('Check function to return day name', () => {
    expectedData = 'Saturday';
    actualData = filter.toFullDay(6);

    expect(actualData).toMatch(expectedData);
  });
});

describe('filter.js : toCapitalize', () => {
  it('Check function to return capitalized param', () => {
    expectedData = 'Coverage This Function';
    actualData = filter.toCapitalize('cOverage thiS Function');

    expect(actualData).toMatch(expectedData);
  });
});
