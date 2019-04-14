const db = require('../utilities/dbConfig');

const Auth = require('./authModel');

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
      await Auth.registerUser({
        username: 'billie',
        password: '123',
        email: 'billieeilish@gmail.com',
        firstName: 'Billie',
        lastName: 'Eilish'
      });
      const user = await Auth.getUser({ username: 'billie' });
      expect(user.email).toBe('billieeilish@gmail.com');
    });
  });

  describe('registerUser()', () => {
    test('should return add user and return user if request is proper', async () => {
      const user = await Auth.registerUser({
        username: 'billie',
        password: '123',
        email: 'billieeilish@gmail.com',
        firstName: 'Billie',
        lastName: 'Eilish'
      });
      expect(user.username).toEqual('billie');
      expect(user.email).toEqual('billieeilish@gmail.com');
      expect(user.firstName).toEqual('Billie');
      expect(user.lastName).toEqual('Eilish');
    });
  });
});
