const express = require('express');
const auth = require('../models/authModel')

const bcrypt = require('bcryptjs');
const tokenService = require('../utilities/generate-token');
const restricted = require('../utilities/restricted-middleware');

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
//   "username": "billie",
//   "password": "$2a$00$xxxxxxxxxxxx......",
//   "created_at": "2019-04-14 16:09:59",
//   (OPTIONAL) "email": "billieeilish@gmail.com",
//   (OPTIONAL) "firstName": "Billie",
//   (OPTIONAL) "lastName": "Eilish"
// }


// LOGIN
// TAKES IN USERNAME AND PASSWORD FROM REQ.BODY
// IF SUCCESSFUL, RETURNS AN OBJECT WITH A MESSAGE, TOKEN, AND USER OBJECT
router.post('/login', (req, res) => {
  const username = {"username": req.body.username};
  const { password } = req.body
  if(!username || !password) {
    res.status(404).json({ message: "Please pass me a 'username' and a 'password'!"})
  } else {
    auth.getUser(username)
      .then(user => {
        // SUCCESS CASE: CORRECT USERNAME & PASSWORD.
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = tokenService(user);
          // RETURNS A MESSAGE, A TOKEN, AND THE USER OBJECT
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
            user
          });
        } 
        // FAIL: INCORRECT PASSWORD
        if (user && !bcrypt.compareSync(password, user.password)) {
          res.status(404).json({ message: "Invalid password!"})
        } 
        // FAIL: INCORRECT USERNAME (DEFAULT)
        else {
          res.status(404).json({ message: `There's no user with a username of ${req.body.username}`})
        }
      })
      .catch(() => {
        res.status(500)
      })
    }
})


// REGISTERS A NEW USER. RETURNS NEWLY-MADE USER OBJECT
// -> IF PROPERTIES GET PASSED VIA BODY THAT DO NOT CORRESPOND TO THE USER TABLE IN THE DATABASE, RETURNS A 500 ERROR
router.post('/register', (req, res) => {
  const user = req.body;
  if (!user.username || !user.password) {
    res.status(404).json({ message: "Please give both a 'username' and a 'password' to register a new user!"})
  } else {
    // !!! Check for username first
    auth.registerUser(user)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(() => {
      res.status(500).json(error500)
      })
    }
})

// GET USER BY USERNAME. UTILITY FUNCTION. NOT FOR GENERAL USE!
// FOR THE SAKE OF NEAR CRUD-COMPLETE FUNCTIONALITY
// router.get('/', restricted, (req, res) => {
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

// UPDATE USER
// :id REFERS TO (user) ID
// router.put('/:id', restricted,(req, res) => {
router.put('/:id', (req, res) => {
  const {id} = req.params
  const updates = req.body;
  // CHECK IF THE INFO PROVIDED IN THE BODY CORRESPONDS TO VALUE IN THE USER-TALBE
  if (!updates.username && !updates.password && !updates.email && !updates.firstName && !updates.firstName) {
    res.status(404).json({
      message:`Hey, I don't know what to do with the data you provided! Make sure the data is already found in the user model!`})
  } else {
    auth.updateUser(id, updates)
      .then(user => {
        console.log(user)
        res.status(200).json(user)
      })
      .catch(() => {
        res.status(500).json(error500)
      })
  }
})

// DELETE USER VIA ID IN PARAMS
// router.delete('/:id', restricted, (req, res) => {
router.delete('/:id', (req, res) => {
  const { id } = req.params
  auth.deleteUser(id)
  .then(data => {
    if (!data) {
        res.status(404).json(error404)
      } else {
        res.status(200).json({ message: `User with ID of ${id} successfully deleted`})
      }
    })
    .catch(() => {
      res.status(500).json(error500)
    })
  })
  
  module.exports = router;