const db = require('../utilities/dbConfig');

const Auth = require('./authModel');

describe('authModel', () => {
  afterEach(async () => {
    await db('users').truncate();
  });

  describe('getUser()', () => {
    test('should return falsy if username does not exist', async () => {
      const unique = await Auth.getUser({
        username: 'hickorydickorydock'
      });
      expect(unique).toBeFalsy();
    });

    test('should return user if username exists', async () => {
      await Auth.registerUser({
        username: 'billie',
        password: '123',
        email: 'billieeilish@gmail.com',
        firstName: 'Billie',
        lastName: 'Eilish'
      });
      const unique = await Auth.getUser({ username: 'billie' });
      expect(unique).toBeTruthy();
      expect(unique.username).toBe('billie');
    });
  });

  //   describe('registerUser()', () => {
  //     test('should return user if proper request', async () => {
  //         await Auth.registerUser({
  //             username: 'billie',
  //             password: '123',
  //             email: 'billieeilish@gmail.com',
  //             firstName: 'Billie',
  //             lastName: 'Eilish'
  //           });
  //       const unique = await Auth.getUser({
  //         username: 'hickorydickorydock'
  //       });
  //       expect(unique).toBeFalsy();
  //     });

  //     test('should return user if username exists', async () => {
  //       await Auth.registerUser({
  //         username: 'billie',
  //         password: '123',
  //         email: 'billieeilish@gmail.com',
  //         firstName: 'Billie',
  //         lastName: 'Eilish'
  //       });
  //       const unique = await Auth.getUser({ username: 'billie' });
  //       expect(unique).toBeTruthy();
  //       expect(unique.username).toBe('billie');
  //     });
  //   });
});
