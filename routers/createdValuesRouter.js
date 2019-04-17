const express = require('express');
const createdValues = require('../models/createdValuesModel');

const restricted = require('../utilities/restricted-middleware');


const router = express.Router();
router.use(express.json());

const error404 = {
  message: "The requested resource doesn't exist"
};

const error500 = {
  message:
    'Something went wrong when getting your request. Make sure the request is foolproof'
};

// created-values object
// {
//   "id": 1,
//   "user_id": 1,  <-- REFERENCES ID IN USERS (FOREIGN KEY)
//   "created_value_name": "emotional expression"
// }

// GET ALL CREATED VALUES LINKED TO A USER. ID REFERS TO USER ID!
// router.get('/:id', restricted, (req, res) => {
router.get('/:id', (req, res) => {
  const user_id = req.params;
  if (!user_id) {
    res.status(404).json(error404);
  } else {
    createdValues
      .getCreatedValues(user_id.id)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(500).json(error500);
      });
  }
});

// router.post('/', restricted,(req, res) => {
router.post('/', (req, res) => {
  const createdValue = req.body;
  if (
    !createdValue ||
    !createdValue.created_value_name ||
    !createdValue.user_id
  ) {
    res
      .status(404)
      .json({
        message:
          "Please provide a 'created_value_name' and the 'user_id' of the corresponding user"
      });
  } else {
    createdValues
      .addCreatedValue(createdValue)
      .then(data => {
        // RETURNS NEWLY-CREATED CREATED VALUE OBJECT
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(500).json(error500);
      });
  }
});

// router.put('/:id', restricted, (req, res) => {
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user_id = req.body.user_id
  const update = req.body;
  const updateHolder = {}
  if (!updated.created_value_name) {
    updateHolder = { user_id }
  }
  if (!update.created_value_name && !update.user_id) {
    res
      .status(404)
      .json({
        message:
          "Be sure to pass either 'created_value_name' or 'user_id' if you want to change 'em"
      });
  } else {
    updateHolder = {user_id, created_value_name: update.created_value_name}
    createdValues
      .updateCreatedValue(user_id, id, updateHolder)
      .then(data => {
        if (!data) {
          res
            .status(404)
            .json({ message: `No existing value with the id of ${id}` });
        } else {
          // Returns updated createdValue object
          res.status(200).json(data);
        }
      })
      .catch(() => {
        res.status(500).json(error500);
      });
  }
});

// router.delete('/:id', restricted, (req, res) => {
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user_id = req.body.user_id
  if (!user_id) {
    res.status(404).json({ message: "Pass me a 'user_id'!" })
  }
  createdValues
    .deleteCreatedValue(user_id, id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .json({ message: `There's no user with the id of ${id}` });
      } else {
        // Returns number of records deleted (1)
        res.status(200).json(data);
      }
    })
    .catch(() => {
      res.status(500).json(error500);
    });
});  

module.exports = router;
