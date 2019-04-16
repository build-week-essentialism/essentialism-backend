const db = require('../utilities/dbConfig');

// The user_id parameter is the user id (the user primary key)
const getProjects = async user_id => {
  return await db('projects').where({ user_id });
};

// The user_id needed to return the projects array is included in the project parameter
const addProject = async project => {
  await db('projects').insert(project);
  return getProjects(project.user_id);
};

// The user_id parameter is used to return the projects array after the update
// The id parameter is the project id (primary key)
const updateProject = async (user_id, id, updates) => {
  await db('projects')
    .where({ id })
    .update(updates);
  return getProjects(user_id);
};

// The user_id parameter is used to return the projects array after the delete
// The id parameter is the project id (primary key)
const deleteProject = async (user_id, id) => {
  await db('projects')
    .where({ id })
    .delete();
  return getProjects(user_id);
};

module.exports = {
  getProjects,
  addProject,
  updateProject,
  deleteProject
};
