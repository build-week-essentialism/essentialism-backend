const express = require('express');
const auth = require('../models/authModel')

const router = express.Router();
router.use(express.json());


const error404 = {
  message: "The requested resource doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request. Make sure the request is foolproof"
}

// USER OBJECT IS AS FOLLOWS:
// {
//   "id": 1,
//   "name": "billie",
//   "password": "$2a$00$xxxxxxxxxxxx......",
//   "created_at": "2019-04-14 16:09:59",
//   (OPTIONAL) "email": "billieeilish@gmail.com",
//   (OPTIONAL) "firstName": "Billie",
//   (OPTIONAL) "lastName": "Eilish"
// }

// GET USER BY USERNAME. TAKES USERNAME FROM REQUEST BODY
router.get('/', (req, res) => {
  auth.getUser(req.body)
    .then(data => {
      if (!data) {
        res.status(404).json(error404);
      } else {
        res.status(200).json(data);
      }
    })
    .catch(() => {
      res.status(500).json(error500)
    })
})

// REGISTERS A NEW USER. RETURNS NEWLY-MADE USER OBJECT
  // -> IF PROPERTIES GET PASSED VIA BODY THAT DO NOT CORRESPOND TO THE USER TABLE IN THE DATABASE, RETURNS A 500 ERROR
router.post('/register', (req, res) => {
  const user = req.body;
  // CHECK IF BODY CONTAINS USERNAME && PASSWORD
  if (!user.username || !user.password) {
    res.status(404).json({ message: "Please give both a 'username' and a 'password' to register a new user!"})
  } else {
    auth.registerUser(user)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(() => {
        res.status(500).json(error500)
      })
  }
})

module.exports = router;