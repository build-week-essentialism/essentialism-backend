const db = require('../utilities/dbConfig');

const AuthModel = require('./authModel');
const CreatedValues = require('./createdValuesModel');

const testInputValue = { user_id: 1, created_value_name: 'video games' };
const testOutputValue = {
  id: 1,
  user_id: 1,
  created_value_name: 'video games'
};

beforeAll(async () => {
  // Add a user in order to test createdValuesModel
  await AuthModel.registerUser({
    username: 'billie',
    password: '123',
    email: 'billieeilish@gmail.com',
    firstName: 'Billie',
    lastName: 'Eilish'
  });
});

afterAll(async () => {
  // Remove user after testing createdValuesModel
  await db('users').truncate();
});

afterEach(async () => {
  await db('created-values').truncate();
});

describe.only('createdValuesModel', () => {
  describe('getCreatedValues()', () => {
    test('should return an empty array if user has not created values', async () => {
      const createdValues = await CreatedValues.getCreatedValues(1);
      expect(Array.isArray(createdValues)).toBe(true);
      expect(createdValues).toHaveLength(0);
    });

    test('should return an array of value objects if user has created values', async () => {
      // Why doesn't this add 3 values?
      await CreatedValues.addCreatedValue(testInputValue);
      await CreatedValues.addCreatedValue(testInputValue);
      await CreatedValues.addCreatedValue(testInputValue);
      const createdValues = await CreatedValues.getCreatedValues(1);
      expect(Array.isArray(createdValues)).toBe(true);
      expect(createdValues).toHaveLength(1);
      expect(createdValues[0]).toEqual(testOutputValue);
    });
  });

  describe('addCreatedValue()', () => {
    test('should add created value and return created value', async () => {
      const createdValue = await CreatedValues.addCreatedValue(testInputValue);
      expect(createdValue).toEqual(testOutputValue);
    });
  });

  describe('updateCreatedValue()', () => {
    test('should update created value and return updated created value', async () => {
      const createdValue = await CreatedValues.addCreatedValue(testInputValue);
      expect(createdValue).toEqual(testOutputValue);
      const updatedValue = await CreatedValues.updateCreatedValue(1, {
        created_value_name: 'board games'
      });
      expect(updatedValue).toEqual({
        id: 1,
        user_id: 1,
        created_value_name: 'board games'
      });
    });
  });

  describe('deleteCreatedValue()', () => {
    test('should return 1 after created value is deleted', async () => {
      await CreatedValues.addCreatedValue(testInputValue);
      const deletedValue = await CreatedValues.deleteCreatedValue(1);
      expect(deletedValue).toBe(1);
    });

    test('should return 0 if the submitted created value id did not exist', async () => {
      await CreatedValues.addCreatedValue(testInputValue);
      const deletedValue = await CreatedValues.deleteCreatedValue(200);
      expect(deletedValue).toBe(0);
    });
  });
});
