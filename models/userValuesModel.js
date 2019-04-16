const db = require('../utilities/dbConfig');

const getUserValues = async id => {
  return await db('user-values')
    .leftJoin('default-values', 'default-values.id', 'default_value_id')
    .leftJoin('created-values', 'created-values.id', 'created_value_id')
    .select(
      'user-values.id as id',
      'created_value_name',
      'default_value_name',
      'value_rank',
      'value_importance'
    )
    .where({ 'user-values.user_id': id });
};

// The value parameter is an object with two properties:
// user_id
// EITHER
// default_value_id
// OR
// created_value_id
// but NOT BOTH
const addUserValue = async value => {
  await db('user-values').insert(value);
  return getUserValues(value.user_id);
};

// The id parameter is the user value id (primary key)
// The user_id parameter is used to return the array of user values after the update
// !!! The only updates allowed are to value_rank and value_importance !!!
const updateUserValue = async (user_id, id, updates) => {
  await db('user-values')
    .where({ id })
    .update(updates);
  return getUserValues(user_id);
};

// The id parameter is the user value id (primary key)
// The user_id parameter is used to return the array of user values after the deletion
const deleteUserValue = async (user_id, id) => {
  await db('user-values')
    .where({ id })
    .del();
  return getUserValues(user_id);
};

module.exports = {
  getUserValues,
  addUserValue,
  updateUserValue,
  deleteUserValue
};
