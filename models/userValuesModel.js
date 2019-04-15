const db = require('../utilities/dbConfig');

const getUserValues = async id => {
  return await db('user-values')
    .leftJoin('default-values', 'default-values.id', 'default_values_id')
    .leftJoin('created-values', 'created-values.id', 'created_values_id')
    .select(
      'user-values.id as id',
      'created_value_name as value_name',
      'default_value_name as value_name',
      'value_rank',
      'value_importance'
    )
    .where({ user_id: id });
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
  // return array of values
};

// The id parameter is the user value id (primary key)
// !!! The only updates allowed are to value_rank and value_importance !!!
const updateUserValue = async (id, updates) => {
  await db('user-values')
    .where({ id })
    .update({ updates });
  // return array of values
};

// The id parameter is the user value id (primary key)
const deleteUserValue = async id => {
  await db('user-values')
    .where({ id })
    .del();
  // return array of values
};

module.exports = {
  getUserValues,
  addUserValue,
  updateUserValue,
  deleteUserValue
};
