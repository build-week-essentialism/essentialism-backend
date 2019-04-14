const DefaultValues = require('./defaultValuesModel');

describe('authModel', () => {
  describe('get()', () => {
    test.only('should return array of value objects', async () => {
      const defaultValues = await DefaultValues.get();
      expect(Array.isArray(defaultValues)).toBeTrue();
      // I didn't test for an exact number in case we change it:
      expect(defaultValues.length).toBeGreaterThan(10);
    });
  });
});
