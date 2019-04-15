const db = require('../../utilities/dbConfig');

const Auth = require('../authModel');
const CreatedValues = require('../createdValuesModel');
const DefaultValues = require('../defaultValuesModel');
const Projects = require('../projectsModel');
const UserValues = require('../userValuesModel');

const testInputValue = { user_id: 1, created_value_name: 'video games' };

const testOutputValue = {
  id: 1,
  user_id: 1,
  created_value_name: 'video games'
};

const testUser = {
  username: 'billie',
  password: '123',
  email: 'billieeilish@gmail.com',
  firstName: 'Billie',
  lastName: 'Eilish'
};

// authModel tests

describe('authModel', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  afterEach(async () => {
    await db('users').truncate();
  });

  describe('getUser()', () => {
    test('should return falsy if username does not exist', async () => {
      const user = await Auth.getUser({
        username: 'hickorydickorydock'
      });
      expect(user).toBeFalsy();
    });

    test('should return user if username exists', async () => {
      await Auth.registerUser(testUser);
      const user = await Auth.getUser({ username: 'billie' });
      expect(user.email).toBe('billieeilish@gmail.com');
    });
  });

  describe('registerUser()', () => {
    test('should add user and return user', async () => {
      const user = await Auth.registerUser(testUser);
      // Since neither the hashed password nor the timestamp can be calculated, expect(user)toEqual(testUser); will not work.
      expect(user.id).toBe(1);
      expect(user.username).toBe('billie');
      expect(user.email).toBe('billieeilish@gmail.com');
      expect(user.firstName).toBe('Billie');
      expect(user.lastName).toBe('Eilish');
    });
  });

  describe('updateUser()', () => {
    test('should update user and return user (without new password)', async () => {
      const user = await Auth.registerUser(testUser);
      const updatedUser = await Auth.updateUser(1, {
        username: 'willie',
        firstName: 'Willie'
      });
      expect(updatedUser.id).toBe(1);
      expect(updatedUser.username).toBe('willie');
      expect(updatedUser.password).toBe(user.password);
      expect(updatedUser.email).toBe('billieeilish@gmail.com');
      expect(updatedUser.firstName).toBe('Willie');
      expect(updatedUser.lastName).toBe('Eilish');
    });

    test('should update user and return user (with new password)', async () => {
      const user = await Auth.registerUser(testUser);
      const updatedUser = await Auth.updateUser(1, {
        username: 'willie',
        password: '101112',
        firstName: 'Willie'
      });
      expect(updatedUser.id).toBe(1);
      expect(updatedUser.username).toBe('willie');
      expect(updatedUser.password).not.toBe(user.password);
      expect(updatedUser.email).toBe('billieeilish@gmail.com');
      expect(updatedUser.firstName).toBe('Willie');
      expect(updatedUser.lastName).toBe('Eilish');
    });
  });

  describe('deleteUser()', () => {
    test('should return 1 after user is deleted', async () => {
      const user = await Auth.registerUser(testUser);
      expect(user).toBeTruthy();
      const deletedUser = await Auth.deleteUser(user.id);
      expect(deletedUser).toBe(1);
    });

    test('should return 0 if the submitted user id did not exist', async () => {
      const user = await Auth.registerUser(testUser);
      expect(user).toBeTruthy();
      const deletedUser = await Auth.deleteUser(200);
      expect(deletedUser).toBe(0);
    });
  });
});

// createdValuesModel tests

describe('createdValuesModel', () => {
  beforeAll(async () => {
    // Add a user in order to test createdValuesModel
    await Auth.registerUser({
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
      expect(createdValues).toHaveLength(3);
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

// defaultValuesModel tests

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

// projectsModel tests
