const express = require('express');
const projects = require('../models/projectsModel')

const router = express.Router();
router.use(express.json());


const error404 = {
  message: "The requested resource doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request. Make sure the request is foolproof"
}

router.get('/', (req, res) => {

})

module.exports = router;