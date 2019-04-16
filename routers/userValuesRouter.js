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


// GET USER-VALUES. ID REFERS TO USER_ID IN USER
// Returns an array of user-values objects with:
// {
//   "id": 1,
//   Either "created_value_name" ***OR*** "default_value_name" will be NULL.
//   "created_value_name": null || "Emotional Expression",
//   "default_value_name": null || "Athletic Ability",
//   "value_rank": 2,
//   "value_importance": "I love sports"
// }
router.get('/:user_id', (req, res) => {
  const {user_id} = req.params
  userValues.getUserValues(user_id)
    .then(values => {
      if (!values) {
        res.status(404).json({ message: `User with the id of ${user_id} either doesn't exist or has no values attached to his account`})
      } else {
        // RETURNS ARRAY OF USER-VALUE OBJECTS
        res.status(200).json(values)
      }
    })
    .catch(() => {
      res.status(500).json(error500)
    })
});

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
