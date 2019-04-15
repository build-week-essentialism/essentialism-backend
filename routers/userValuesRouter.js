const express = require('express');
const userValues = require('../models/userValuesModel');

const router = express.Router();
router.use(express.json());

const error404 = {
  message: "The requested resource doesn't exist"
};

const error500 = {
  message:
    'Something went wrong when getting your request. Make sure the request is foolproof'
};

router.get('/', (req, res) => {});

module.exports = router;

// Scrubbing an improper request:
// id: 345
// updates = {
//   // user_id SHOULD NOT BE HERE
//   user_id: 1,
//   value_rank: 2,
//   value_importance: 'I love it.'
// };

// UserValue.updateUserValue(id, {
//   values_rank: updates.value_rank,
//   value_importance: updates.value_importance
// })
