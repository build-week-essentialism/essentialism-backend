const db = require('../utilities/dbConfig');
const bcrypt = require('bcryptjs');

const getUser = async username => {
  return await db('users')
    .where(username)
    .first();
};

const registerUser = async user => {
  const password = bcrypt.hashSync(user.password, 8);
  await db('users').insert({
    ...user,
    password
  });
  return getUser({ username: user.username });
};

module.exports = {
  getUser,
  registerUser
};
