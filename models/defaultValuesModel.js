const db = require('../utilities/dbConfig');

const getDefaultValues = async () => {
  return await db('default-values');
};

module.exports = { getDefaultValues };
