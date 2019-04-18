const express = require('express');
const projects = require('../models/projectsModel');

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

// Project object
// {
//   "id": 1,
//   "user_id": 1,  <-- REFERENCES ID IN USERS (FOREIGN KEY)
//   "project_name": "taking a class",
//   "project_active": 1  <-- IS A BOOLEAN. DEFAULT = 1 (TRUE)
//   "proj_val_align": 0
// }

// GET ALL PROJECTS LINKED TO A USER. ID REFERS TO USER_ID, WHICH IS LINKED TO ID IN USERS
// router.get('/:id', restricted,(req, res) => {
router.get('/:id', (req, res) => {
  const user_id = req.params;
  if (!user_id) {
    res.status(404).json(error404);
  } else {
    projects
      .getProjects(user_id.id)
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
  const project = req.body;
  if (!project.user_id) {
    res.status(404).json({
      message: "Please make sure you pass a 'user_id'"
    });
  } 
  if (project.proj_val_align < 0 || project.proj_val_align > 10) {
    project.proj_val_align = 0;
  }
  else {
    projects
      .addProject(project)
      .then(data => {
        // RETURNS NEWLY-MADE PROJECT OBJECT
        res.status(201).json(data);
      })
      .catch(() => {
        res.status(500).json(error500);
      });
  }
});

// Update Project
// router.put('/:id', restricted,(req, res) => {
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const updateHolder = {}
  const user_id = req.body.user_id;
  
  if (!user_id) {
    res.status(404).json({ message: "Pass me a 'user_id'!" });
  }

  
  if (update.project_name && update.user_id) {
    updateHolder = {
      user_id,
      project_name: update.project_name
    }
  } else {
    updateHolder = {
      user_id,
    }
  }

  if (update.proj_val_align) {
    if (project.proj_val_align < 0 || project.proj_val_align > 10) {
      updateHolder.proj_val_align = 0;
    }
  }

  if (!update.project_name && !update.user_id) {
    res.status(404).json({
      message:
        "Be sure to pass either 'project_name' or 'proj_val_align' if you want to change 'em"
    });
  } else {
    projects
      .updateProject(user_id, id, updateHolder)
      .then(data => {
        if (!data) {
          res
            .status(404)
            .json({ message: `No existing project with the id of ${id}` });
        } else {
          // Returns updated createdValue object
          res.status(200).json(data);
        }
      })
      .catch(() => res.status(500).json(error500));
  }
});

// SET PROJECT TO INACTIVE
// router.put('/:id/inactive', restricted,(req, res) => {
router.put('/:id/inactive', (req, res) => {
  const { id } = req.params;
  const user_id = req.body.user_id;

  if (!user_id) {
    res.status(404).json({ message: "Pass me a 'user_id'!" });
  }

  projects
    .updateProject(user_id, id, { project_active: false })
    .then(data => {
      if (!data) {
        res
          .status(404)
          .json({ message: `No existing project with the id of ${id}` });
      } else {
        // Returns updated createdValue object
        res.status(200).json(data);
      }
    })
    .catch(() => {
      res.status(500).json(error500);
    });
});

// SET PROJECT TO ACTIVE
// router.put('/:id/active', restricted, (req, res) => {
router.put('/:id/active', (req, res) => {
  const { id } = req.params;
  const user_id = req.body.user_id;

  if (!user_id) {
    res.status(404).json({ message: "Pass me a 'user_id'!" });
  }

  projects
    .updateProject(user_id, id, { project_active: true })
    .then(data => {
      if (!data) {
        res
          .status(404)
          .json({ message: `No existing project with the id of ${id}` });
      } else {
        // Returns updated createdValue object
        res.status(200).json(data);
      }
    })
    .catch(() => res.status(500).json(error500));
});

// router.delete('/:id', restricted, (req, res) => {
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user_id = req.body.user_id;

  if (!user_id) {
    res.status(404).json({ message: "Pass me a 'user_id'!" });
  }

  projects
    .deleteProject(user_id, id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .json({ message: `There's no project with the id of ${id}` });
      } else {
        // Returns number of records deleted (1)
        res.status(200).json(data);
      }
    })
    .catch(() => res.status(500).json(error500));
});

module.exports = router;
