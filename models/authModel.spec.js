const db = require('../utilities/dbConfig');

const Auth = require('./authModel');

describe('authModel', () => {
  describe('getUser()', () => {
    test('should return falsy if username does not exist', async () => {
      const unique = await Auth.getUser({
        username: 'hickorydickorydock'
      });
      console.log(unique);
      expect(unique).toBeFalsy();
    });

    test('should return user if username does exist', async () => {
      const unique = await Auth.getUser({ username: 'john' });
      console.log(unique);
      expect(unique).toBeTruthy();
    });
  });

  describe('registerUser()', () => {
    //   beforeEach(async () => {
    //     await db('users').truncate();
    //   });
  });
});
