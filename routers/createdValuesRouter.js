const express = require('express');
const createdValues = require('../models/createdValuesModel')

const router = express.Router();
router.use(express.json());


const error404 = {
  message: "The requested resource doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request. Make sure the request is foolproof"
}

// GET ALL CREATED VALUES LINKED TO A USER. ID REFERS TO USER ID!
router.get('/:id', (req, res) => {
  const user_id = req.params
  console.log(user_id)
  if (!user_id) {
    res.status(404).json(error404)
  } else {
    createdValues.getCreatedValues(user_id.id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(() => {
        res.status(500).json(error500)
      })
  }
})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;