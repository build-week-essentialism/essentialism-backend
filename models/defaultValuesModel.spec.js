const DefaultValues = require('./defaultValuesModel');

describe('defaultValuesModel', () => {
  describe('getDefaultValues()', () => {
    test('should return an array of value objects with a length of at least 10', async () => {
      const defaultValues = await DefaultValues.getDefaultValues();
      expect(Array.isArray(defaultValues)).toBe(true);
      expect(defaultValues[0]).toEqual({
        id: 1,
        default_value_name: 'Athletic ability'
      });
      // I don't test for an exact number in case more default values are added:
      expect(defaultValues.length).toBeGreaterThan(9);
    });
  });
});
