import getValidationState from '@/utils/validation';

describe('validation.js', () => {
  it('Check getValidationState function to return valid value if error and validate are truthy', () => {
    const expectedData = false;
    const actualData = getValidationState({
      error: true,
      validated: true,
      valid: false,
    });

    expect(actualData).toBe(expectedData);
  });

  it('Check getValidationState function to return valid value if error is truthy and validate is falsy', () => {
    const expectedData = false;
    const actualData = getValidationState({
      error: true,
      valid: false,
    });

    expect(actualData).toBe(expectedData);
  });

  it('Check getValidationState function to return valid value if error is falsy and validated is truthy', () => {
    const expectedData = false;
    const actualData = getValidationState({
      validated: true,
      valid: false,
    });

    expect(actualData).toBe(expectedData);
  });

  it('Check getValidationState function to return null if error and validated are falsy', () => {
    const actualData = getValidationState({
      validated: false,
      valid: true,
    });

    expect(actualData).toBeNull();
  });
});