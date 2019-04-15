const db = require('../utilities/dbConfig');

// The id parameter is the user id:
const getCreatedValues = async id => {
  return await db('created-values').where({ user_id: id });
};

const addCreatedValue = async createdValue => {
  await db('created-values').insert(createdValue);
  const valuesArray = await db('created-values').where({
    user_id: createdValue.user_id,
    created_value_name: createdValue.created_value_name
  });
  return valuesArray[valuesArray.length - 1];
};

// The id parameter is the created value id (not the user id):
const updateCreatedValue = async (id, update) => {
  await db('created-values')
    .where({ id })
    .update(update);
  return await db('created-values')
    .where({ id })
    .first();
};

// The id parameter is the created value id (not the user id):
const deleteCreatedValue = async id => {
  return await db('created-values')
    .where({ id })
    .delete();
};

module.exports = {
  getCreatedValues,
  addCreatedValue,
  updateCreatedValue,
  deleteCreatedValue
};
