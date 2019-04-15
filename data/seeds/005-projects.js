exports.seed = function(knex) {
  return knex('projects').insert([
    {
      user_id: 1,
      project_name: 'taking a class',
      project_active: false
    },
    {
      user_id: 1,
      project_name: 'practicing oboe',
      project_active: true
    },
    {
      user_id: 1,
      project_name: 'working',
      project_active: true
    },
    {
      user_id: 1,
      project_name: 'tidying my house',
      project_active: true
    },
    {
      user_id: 2,
      project_name: 'playing basketball',
      project_active: true
    },
    {
      user_id: 2,
      project_name: 'reading Ulysses',
      project_active: true
    },
    {
      user_id: 2,
      project_name: 'hiking',
      project_active: false
    },
    {
      user_id: 3,
      project_name: 'raising my children',
      project_active: true
    },
    {
      user_id: 3,
      project_name: 'learning to bake',
      project_active: true
    },
    {
      user_id: 3,
      project_name: 'playing every Mario game',
      project_active: true
    }
  ]);
};
