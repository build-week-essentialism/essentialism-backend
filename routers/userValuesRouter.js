const express = require('express');
const userValues = require('../models/userValuesModel');

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
// router.get('/:user_id', restricted,(req, res) => {
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  userValues
    .getUserValues(user_id)
    .then(values => {
      if (!values) {
        res.status(404).json({
          message: `User with the id of ${user_id} either doesn't exist or has no values attached to his account`
        });
      } else {
        // RETURNS ARRAY OF USER-VALUE OBJECTS
        res.status(200).json(values);
      }
    })
    .catch(() => {
      res.status(500).json(error500);
    });
});

// ADD USER-VALUE ENTRY
// router.post('/', restricted,(req, res) => {
router.post('/', (req, res) => {
  const { user_id, default_value_id, created_value_id } = req.body;

  // ADD USER-VALUE WITH CREATED_VALUE_ID
  if (user_id && default_value_id && !created_value_id) {
    userValues
      .addUserValue({ user_id, default_value_id })
      .then(values => {
        if (values.length < 1) {
          res
            .status(404)
            .json({ message: `There's no user with user_id of ${user_id}` });
        } else {
          res.status(200).json(values);
        }
      })
      .catch(() => {
        res.status(500);
      });
  }

  // ADD USER-VALUE WITH CREATED_VALUE_ID
  else if (user_id && !default_value_id && created_value_id) {
    userValues
      .addUserValue({ user_id, created_value_id })
      .then(values => {
        if (values.length < 1) {
          res
            .status(404)
            .json({ message: `There's no user with user_id of ${user_id}` });
        } else {
          res.status(200).json(values);
        }
      })
      .catch(() => {
        res.status(500);
      });
  }

  // IF USER_ID IS MISSING, CREATED_ID *AND* DEFAULT_ID ARE PASSED *OR* BOTH ARE MISSING.
  // CATCH-ALL 404
  else {
    res.status(404).json({
      message:
        "Make sure you body has a 'user_id' as well as *either* a 'default_value_id' or 'created_value_id"
    });
  }
});

// EDIT PREVIOUSLY-MADE USER-VALUE ENTRY.
// USER_ID REFERS TO USER_ID IN THE USERS TABLE. IT'S USED TO RETURN ALL VALUES OF THAT USER
// BODY HAS TO CONTAIN USER VALUE ID (ID)
// FINALLY, ONLY VALUE_RANK ***OR*** VALUE_IMPORTANCE CAN BE USED AS 'UPDATE' PARAMETER IN UPDATEUSERVALUE
// IF OTHER VALUES GET PASSED IN BODY, THEY GET DISREGARDED AND NOT PASSED TO THE MODEL
// !!! HOWEVER, I HAVEN'T FIGURED OUT A WAY YET TO CHECK IF THE USER_ID IS CONNECTED TO THE VALUE ID. IN EDGE CASES, COULD LEAD TO ISSUES
// router.put('/:user_id', restricted,(req, res) => {
router.put('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { id, value_rank, value_importance } = req.body;
  // CHECK BODY FOR ID
  if (!id) {
    res.status(400).json({
      message:
        "Please make sure you pass an 'id' in the body, referring to the user-value id"
    });
  }
  userValues
    .getUserValues(user_id)
    .then(user => {
      // IF NO USER OR NO USER-VALUES ARE FOUND
      if (user.length < 1) {
        res.status(404).json({
          message: `There's either no user with user_id of ${user_id} or the user has no values to update`
        });
      } else {
        // IF NEITHER ARE PASSED, RETURN 404
        if (!value_importance && !value_rank) {
          res.status(400).json({
            message:
              "Make sure you pass a 'value_importance' or 'value_rank' value in the body. That's the only thing this endpoint accepts"
          });
        }

        // ONLY UPDATING VALUE_RANK
        else if (!value_importance && value_rank) {
          userValues
            .updateUserValue(user_id, id, { value_rank: value_rank })
            .then(values => {
              console.log('updating value_rank');
              if (values.length < 1) {
                res.status(404).json({
                  message: `There's no user with the user_id of ${user_id}, so we couldn't update any values connected to it.`
                });
              } else {
                res.status(200).json(values);
              }
            })
            .catch(() => {
              res.status(500).json(error500);
            });
        }

        // ONLY UPDATING VALUE_IMPORTANCE
        else if (value_importance && !value_rank) {
          userValues
            .updateUserValue(user_id, id, {
              value_importance: value_importance
            })
            .then(values => {
              console.log('updating value_imporatnce');
              if (values.length < 1) {
                res.status(404).json({
                  message: `There's no user with the user_id of ${user_id}, so we couldn't update any values connected to it.`
                });
              } else {
                res.status(200).json(values);
              }
            })
            .catch(() => {
              res.status(500).json(error500);
            });
        }

        // UPDATING BOTH VALUE_RANK AND VALUE_IMPORTANCE
        else if (value_rank && value_importance) {
          userValues
            .updateUserValue(user_id, id, {
              value_rank: value_rank,
              value_importance: value_importance
            })
            .then(values => {
              console.log('updating both');
              if (values.length < 1) {
                res.status(404).json({
                  message: `There's no user with the user_id of ${user_id}, so we couldn't update any values connected to it.`
                });
              } else {
                res.status(200).json(values);
              }
            })
            .catch(() => {
              res.status(500).json(error500);
            });
        }
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Something went wrong when trying to check for the user_id'
      });
    });
});

// user_id is passed in body and refers to the user
// :id refers to value_id
// !!! I HAVEN'T FIGURED OUT A WAY YET TO CHECK IF THE USER_ID IS CONNECTED TO THE VALUE ID. IN EDGE CASES, COULD LEAD TO ISSUES
// router.delete('/:user_id', restricted,(req, res) => {
router.delete('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { id } = req.body;
  // CHECK BODY FOR ID
  if (!id) {
    res.status(400).json({
      message:
        "Please make sure you pass an 'id' in the body, referring to the user-value id"
    });
  }
  userValues
    .deleteUserValue(user_id, id)
    .then(values => {
      res.status(200).json(values);
    })
    .catch(() => {
      res.status(500).json(error500);
    });
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
