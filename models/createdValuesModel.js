const db = require('../utilities/dbConfig');

// The user_id parameter is the user id (the user primary key)
const getCreatedValues = async user_id => {
  return await db('created-values').where({ user_id });
};

// The user_id needed to return the created values array is included in the createdValue parameter
const addCreatedValue = async createdValue => {
  await db('created-values').insert(createdValue);
  return getCreatedValues(createdValue.user_id);
};

// The user_id parameter is used to return the created values array after the update
// The id parameter is the created value id (primary key)
const updateCreatedValue = async (user_id, id, updates) => {
  await db('created-values')
    .where({ id })
    .update(updates);
  return getCreatedValues(user_id);
};

// The user_id parameter is used to return the created values array after the delete
// The id parameter is the created value id (primary key)
const deleteCreatedValue = async (user_id, id) => {
  await db('created-values')
    .where({ id })
    .delete();
  return getCreatedValues(user_id);
};

module.exports = {
  getCreatedValues,
  addCreatedValue,
  updateCreatedValue,
  deleteCreatedValue
};
