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

// Project object
// {
//   "id": 1,
//   "user_id": 1,  <-- REFERENCES ID IN USERS (FOREIGN KEY)
//   "project_name": "taking a class",
//   "project_active": 1  <-- IS A BOOLEAN. DEFAULT = 1 (TRUE)
// }

// GET ALL PROJECTS LINKED TO A USER. ID REFERS TO USER_ID, WHICH IS LINKED TO ID IN USERS
router.get('/:id', (req, res) => {
  const user_id = req.params
  if (!user_id) {
    res.status(404).json(error404)
  } else {
    projects.getProjects(user_id.id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(() => {
        res.status(500).json(error500)
      })
  }
})

router.post('/', (req, res) => {
  const project = req.body
  if (!project.user_id || !project.project_name) {
    res.status(404).json({ message: "Please make sure you pass both a 'user_id' and a 'project_name'"})
  } else {
    projects.addProject(project)
      .then(data => {
        // RETURNS NEWLY-MADE PROJECT OBJECT
        res.status(201).json(data)
      })
      .catch(() => {
        res.status(500).json(error500)
      })
  }
})

router.put('/', (req, res) => {
  
})

router.delete('/', (req, res) => {
  
})

module.exports = router;