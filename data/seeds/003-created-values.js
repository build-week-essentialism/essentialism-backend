exports.seed = function(knex) {
  return knex('created-values').insert([
    {
      user_id: 1,
      created_value_name: 'emotional expression'
    },
    {
      user_id: 1,
      created_value_name: 'staying in touch with nature'
    },
    {
      user_id: 2,
      created_value_name: 'perseverence'
    },
    {
      user_id: 2,
      created_value_name: 'exercise'
    },
    {
      user_id: 2,
      created_value_name: 'making obscure references'
    },
    {
      user_id: 3,
      created_value_name: 'poetry'
    },
    {
      user_id: 3,
      created_value_name: 'video games'
    },
    {
      user_id: 3,
      created_value_name: 'hosting parties'
    }
  ]);
};
