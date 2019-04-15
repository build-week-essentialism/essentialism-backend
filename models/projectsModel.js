const db = require('../utilities/dbConfig');

// The id parameter is the user id (the user primary key)
const getProjects = async id => {
  return await db('projects').where({ user_id: id });
};

const addProject = async project => {
  await db('projects').insert(project);
  const projectsArray = await db('projects').where({
    user_id: project.user_id,
    project_name: project.project_name
  });
  return projectsArray[projectsArray.length - 1];
};

// The id parameter is the project id (primary key)
const updateProject = async (id, update) => {
  await db('projects')
    .where({ id })
    .update(update);
  return await db('projects')
    .where({ id })
    .first();
};

// The id parameter is the project id (primary key)
const deleteProject = async id => {
  return await db('projects')
    .where({ id })
    .delete();
};

module.exports = {
  getProjects,
  addProject,
  updateProject,
  deleteProject
};
