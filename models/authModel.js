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
  return await db('users')
    .where({ username: user.username })
    .first();
};

const updateUser = async (id, updates) => {
  if (updates.password) {
    const password = bcrypt.hashSync(updates.password, 8);
    await db('users')
      .where({ id })
      .update({ ...updates, password });
    return await db('users')
      .where({ id })
      .first();
  } else {
    await db('users')
      .where({ id })
      .update(updates);
    return await db('users')
      .where({ id })
      .first();
  }
};

const deleteUser = async id => {
  await db('users')
    .where({ id })
    .delete();
};

module.exports = {
  getUser,
  registerUser,
  updateUser,
  deleteUser
};
