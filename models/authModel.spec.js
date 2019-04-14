const db = require('../utilities/dbConfig');

const Auth = require('./authModel');

const testUser = {
  username: 'billie',
  password: '123',
  email: 'billieeilish@gmail.com',
  firstName: 'Billie',
  lastName: 'Eilish'
};

describe('authModel', () => {
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

    test('should return 0 if the submitted id did not exist', async () => {
      const user = await Auth.registerUser(testUser);
      expect(user).toBeTruthy();
      const deletedUser = await Auth.deleteUser(200);
      expect(deletedUser).toBe(0);
    });
  });
});
