const db = require('../utilities/dbConfig');

// The id parameter is the user id:
const getCreatedValues = async id => {
  return await db('created-values').where({ id });
};

const addCreatedValue = async createdValue => {
  await db('created-values').insert(createdValue);
  return await db('created-values')
    .where({ user_id: createdValue.user_id })
    .first();
  // ALERT - THIS DOES NOT ACTUALLY WORK CORRECTLY!! Since the user can enter multiple values with the same name, this will return the first one, not the latest one. It may not matter.
};

// The id parameter is the user id:
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
